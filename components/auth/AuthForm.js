import { View, StyleSheet } from "react-native";
import { useState } from "react";

import Input from '../auth/Input'
import Button from '../ui/Button'

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {

    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')

    const {
        email: emailIsInValid,
        confirmEmail: emailDontMatch,
        password: passwordInvalid,
        confirmPassword: passwordDontMatch
    } = credentialsInvalid

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue)
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue)
                break
            case 'password':
                setEnteredPassword(enteredValue)
                break
            case 'comfirmPassword':
                setEnteredConfirmPassword(enteredValue)
                break
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword
        })
    }

    return (
        <View>
            <Input
                label="Email Address"
                keyboardType="email-address"
                secure={false}
                onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                value={enteredEmail}
                isInvalid={emailIsInValid} />

            {!isLogin && <Input
                label='Confirm Email Address'
                keyboardType='email-address'
                secure={false}
                onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
                value={enteredConfirmEmail}
                isInvalid={emailDontMatch} />}

            <Input
                label='Password'
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                value={enteredPassword}
                isInvalid={passwordInvalid} />

            {!isLogin && <Input
                label='Confirm Password'
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(this, 'comfirmPassword')}
                value={enteredConfirmPassword}
                isInvalid={passwordDontMatch} />}

            <View style={styles.buttons}>
                <Button onPress={submitHandler}>
                    {!isLogin ? 'Sign Up' : 'Log In'}
                </Button>
            </View>
        </View>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});