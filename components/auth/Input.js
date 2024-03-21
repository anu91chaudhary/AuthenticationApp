import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../constant/styles'

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid
}) {

    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.inputInvalid]}>{label}</Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                autoCapitalize='none'
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    )
}

export default Input


const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: GlobalStyle.colors.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: GlobalStyle.colors.primary100,
        borderRadius: 4,
        fontSize: 16,
    },
    inputInvalid: {
        backgroundColor: GlobalStyle.colors.error100,
    },
});