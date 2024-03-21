import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect } from 'react'
import IconButton from './components/ui/IconButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { GlobalStyle } from './constant/styles'
import AuthContextProvider, { AuthContext } from './store/auth-context'

export default function App() {

  const Stack = createNativeStackNavigator()

  function AuthStack() {
    return (<Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: GlobalStyle.colors.primary100 }
    }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
    )
  }

  function AuthenticatedStack() {
    const authCtx = useContext(AuthContext)
    return (<Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: GlobalStyle.colors.primary100 },
    }}>
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />)
        }} />
    </Stack.Navigator>
    )
  }

  function Navigation() {
    const authCtx = useContext(AuthContext)
    return (<NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>)
  }

  function Root() {
    const authCtx = useContext(AuthContext)

    useEffect(() => {
      async function fetchToken() {
        const storedToken = await AsyncStorage.getItem('token')
        if (storedToken) authCtx.authenticate(storedToken)
      }
      fetchToken()
    }, [])
    return <Navigation />
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
