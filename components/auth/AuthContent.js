import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalStyle } from "../../constant/styles";

import FlatButton from '../ui/FlatButton'
import AuthForm from "./AuthForm";
import { useNavigation } from "@react-navigation/native";


function AuthContent({ isLogin, onAuthenticate }) {

    const navigation = useNavigation()

    const [credentialsInvalid, setCredentialIsInvalid] = useState({
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false
    })

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Signup')
        } else {
            navigation.replace('Login')
        }
    }

    function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials
        email = email.trim()
        password = password.trim()

        const emailIsInValid = email.includes('@')
        const passwordIsInvalid = password.length > 3
        const emailDontMatch = email === confirmEmail
        const passwordDontMatch = password === confirmPassword

        if (!emailIsInValid
            || !passwordIsInvalid
            || (!isLogin && (!passwordDontMatch || !emailDontMatch))) {
            Alert.alert('Invalid input', 'Please check your entered credentials.')
            setCredentialIsInvalid({
                email: !emailIsInValid,
                confirmEmail: !emailIsInValid || !emailDontMatch,
                password: !passwordIsInvalid,
                confirmPassword: !passwordIsInvalid || !passwordDontMatch
            })
            return
        }
        onAuthenticate({ email, password })
    }

    return <View style={styles.authContent}>
        <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
                {isLogin ? 'Create a new user' : 'Log in instead'}
            </FlatButton>
        </View>
    </View>
}

export default AuthContent

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: GlobalStyle.colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});