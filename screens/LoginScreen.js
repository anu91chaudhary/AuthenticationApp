import AuthContent from '../components/auth/AuthContent'
import { useContext, useState } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { login } from '../util/Auth'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'


function LoginScreen({navigation}) {
    const [isAuthentication, setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true)
        try {
            const token = await login(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            setIsAuthenticating(false)
            Alert.alert('Authentication failed', 'We can not log you in, Please check your credentials!!')
        }
    }

    if (isAuthentication) {
        return <LoadingOverlay message={'logging you in...'} />
    }

    return <AuthContent isLogin={true} onAuthenticate={loginHandler} />
}

export default LoginScreen

