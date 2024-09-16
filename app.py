import cx_Oracle
from flask import Flask, request, jsonify
import random

oracle_connection = cx_Oracle.connect("RM550815/270903@oracle.fiap.com.br:1521/ORCL")

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = data.usuario('usuario')
    senha = data.get('senha')

    cursor = oracle_connection.cursor()
    query = "SELECT * FROM usuarios WHERE usuario = :usuario AND senha = :senha"
    cursor.execute(query, {'jusuari': usuario, 'senha': senha})
    user_data = cursor.fetchone()

    if user_data:
        return jsonify({"success": True, "user": user_data}), 200
    else:
        return jsonify({"success": False, "message": "usuario ou senha inválidos."}), 401

@app.route('/criar_conta', methods=['POST'])
def criar_conta():
    data = request.get_json()
    senha = data.get('senha')
    email = data.get('email')
    usuario = data.get('usuario')  

    cursor = oracle_connection.cursor()
    # Verificando se o email ou o usuário já estão cadastrados
    query = "SELECT * FROM usuarios WHERE email = :email OR usuario = :usuario"
    cursor.execute(query, {'email': email, 'usuario': usuario})
    user_data = cursor.fetchone()
    if user_data:
        return jsonify({"success": False, "message": "E-mail ou usuário já cadastrado."}), 400

    id = random.randint(100000, 999999)

    # Inserir novo usuário no Oracle
    query = "INSERT INTO usuarios (id, senha, email, usuario) VALUES (:id, :senha, :email, :usuario)"
    cursor.execute(query, {'id': id, 'senha': senha, 'email': email, 'usuario': usuario})
    oracle_connection.commit()

    return jsonify({"success": True, "message": "Conta criada com sucesso."}), 200



@app.route('/recuperar_senha', methods=['POST'])
def recuperar_senha():
    data = request.get_json()
    email = data.get('email')

    cursor = oracle_connection.cursor()
    query = "SELECT senha FROM usuarios WHERE email = :email"
    cursor.execute(query, {'email': email})
    user_data = cursor.fetchone()

    if not user_data:
        return jsonify({"success": False, "message": "Email não encontrado."}), 404

    senha = user_data[0]

    return jsonify({"success": True, "senha": senha}), 200


@app.route('/redefinir_senha', methods=['POST'])
def redefinir_senha():
    usuario = request.json.get('usuario')
    email = request.json.get('email')
    nova_senha = request.json.get('nova_senha')

    cursor = oracle_connection.cursor()
    query = "SELECT * FROM usuarios WHERE usuario = :usuario AND email = :email"
    cursor.execute(query, {'usuario': usuario, 'email': email})
    user_data = cursor.fetchone()

    if not user_data:
        return jsonify({"success": False, "message": "Usuário ou email não encontrados."}), 404

    # Atualizar senha do usuário
    query = "UPDATE usuarios SET senha = :nova_senha WHERE usuario = :usuario AND email = :email"
    cursor.execute(query, {'nova_senha': nova_senha, 'usuario': usuario, 'email': email})
    oracle_connection.commit()

    print('Senha redefinida com sucesso para o usuário:', usuario)
    return jsonify({"success": True, "message": "Senha redefinida com sucesso."}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
