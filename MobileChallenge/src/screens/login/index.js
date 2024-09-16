import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Button } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async () => {
    if (!usuario || !senha) {
      setModalMessage('Por favor, preencha todos os campos.');
      setModalVisible(true);
      return;
    }
    try {
      const response = await axios.post('http://192.168.15.133:5000/login', { usuario, senha });
      if (response.data.success) {
        navigation.navigate('TelaInicial');
      } else {
        setModalMessage(response.data.message || 'Erro ao fazer login. Tente novamente.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setModalMessage('Erro ao fazer login. Tente novamente.');
      setModalVisible(true);
    }
  };

  const handleEsqueceuSenha = () => {
    navigation.navigate('EsqueceuSenha');
  };

  const handleCriarConta = () => {
    navigation.navigate('criarConta');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        keyboardType="default"
      />
      <TextInput
        style={[styles.input, styles.inputSenha]}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEsqueceuSenha}>
        <Text style={styles.esqueceuSenha}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCriarConta}>
        <Text style={styles.criarConta}>Criar conta</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputSenha: {
    borderColor: 'red',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  esqueceuSenha: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  criarConta: {
    color: 'green',
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});

export default Login;
