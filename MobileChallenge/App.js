
import Login from './src/screens/login/index'
import TelaInicial from './src/screens/telaInicial';
import EsqueceuSenha from './src/screens/esqueceuSenha';
import RegisterScreen from './src/screens/registro/index';
import RedefinirSenha from './src/screens/redefinirSenha/index';
import CriarConta from './src/screens/criarConta/index';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="TelaInicial" component={TelaInicial}/>
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha}/>  
        <Stack.Screen name="Registro" component={RegisterScreen}/>
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenha}/>
        <Stack.Screen name="CriarConta" component={CriarConta}/>
      </Stack.Navigator>
    </NavigationContainer> 
  
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, 
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerImage: {
    width: 100, 
    height: 30, 
  },
});

export default App;
