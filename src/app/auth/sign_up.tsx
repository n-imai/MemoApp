import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Alert
} from "react-native"
import Button from "../../components/Button"
import { Link, router } from "expo-router"
import { useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"

import {auth} from "../../config"

const handlePress = (email:string, password:string) => {
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })
        .catch((error) => {
            const {code,message} = error
            console.log(code, message)
            Alert.alert(message)
        })
}

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    autoCapitalize='none'
                    secureTextEntry
                    placeholder='Password'
                    textContentType='password'
                />
                <Button label='Submit' onPress={()=>{handlePress(email, password)}} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href={'/auth/log_in'} asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log in.</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default SignUp