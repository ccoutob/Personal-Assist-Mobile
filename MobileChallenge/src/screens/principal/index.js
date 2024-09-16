import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Video from 'react-native-video';

const HomeScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao PersonalAssist</Text>

      {/* <View style={styles.videoContainer}>
        <Video
          source={{ uri: 'https://www.example.com/video.mp4' }} // Substitua pela URL do seu vídeo
          style={styles.video}
          resizeMode="cover"
          repeat
        />
      </View> */}

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  startButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
