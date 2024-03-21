import { useContext, useState } from 'react'
import AuthContent from '../components/auth/AuthContent'
import { createUser } from '../util/Auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context'

function SignupScreen({ navigation }) {

    const [isAuthentication, setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function signupHandler({ email, password }) {
        setIsAuthenticating(true)
        try {
            const token = await createUser(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            setIsAuthenticating(false)
            Alert.alert('Authentication failed', 'We can not log you in, Please check your credentials and try after some time!!')
        }
    }

    if (isAuthentication) {
        return <LoadingOverlay message={'create user...'} />
    }

    return <AuthContent isLogin={false} onAuthenticate={signupHandler} />
}

export default SignupScreen
