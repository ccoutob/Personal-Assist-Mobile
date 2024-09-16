import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const TelaPrincipal = () => {
  const [searchText, setSearchText] = useState('');
  const [atividade1, setAtividade1] = useState('');
  const [atividade2, setAtividade2] = useState('');
  const [atividade3, setAtividade3] = useState('');
  const [notificacao, setNotificacao] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar a exibição do calendário

  const handleSearch = () => {
    console.log('Pesquisando por:', searchText);
  };

  const handleAdicionarCalendario = () => {
    setMostrarCalendario(true); // Atualiza o estado para mostrar o calendário
    console.log('Adicionar calendário');
    // Você pode integrar uma API de calendário aqui
  };

  return (
    <View style={styles.container}>
      <View style={styles.divisorias}>
        {/* Barra de pesquisa */}
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divisorias}>
        {/* Campos de atividade */}
        <TextInput
          style={styles.input}
          placeholder="Atividade 1"
          value={atividade1}
          onChangeText={setAtividade1}
        />
        <TextInput
          style={styles.input}
          placeholder="Atividade 2"
          value={atividade2}
          onChangeText={setAtividade2}
        />
        <TextInput
          style={styles.input}
          placeholder="Atividade 3"
          value={atividade3}
          onChangeText={setAtividade3}
        />
      </View>
      <View style={styles.divisorias}>
        {/* Campo de notificação */}
        <Text style={styles.label}>Notificação:</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Notificação"
          value={notificacao}
          onChangeText={setNotificacao}
        />
      </View>
      <View style={styles.divisorias}>
        {/* Botão para adicionar calendário */}
        <TouchableOpacity style={styles.button} onPress={handleAdicionarCalendario}>
          <Text>Adicionar Calendário</Text>
        </TouchableOpacity>
      </View>
      {/* Renderiza o calendário se mostrarCalendario for verdadeiro */}
      {mostrarCalendario && (
        <View style={styles.divisorias}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  divisorias: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
});

export default TelaPrincipal;
