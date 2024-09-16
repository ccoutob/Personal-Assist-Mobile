import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

const RedefinirSenha = ({ navigation }) => {
  const [senha, setSenha] = useState('');

  const handleRedefinirSenha = async () => {
    try {
      const response = await axios.post('http://192.168.15.133:5000/recuperar_senha', {});
      const { senha } = response.data;
      Alert.alert('Sua senha é:', senha);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error.response.data.error);
      Alert.alert('Erro', error.response.data.error);
    }
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RedefinirSenha;
