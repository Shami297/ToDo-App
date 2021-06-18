import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import * as SecureStore from 'expo-secure-store';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(155, 199, 120, 0.356)',
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    inputContainer: {
        width: '100%',
        borderColor: 'rgb(169,169,169)',
        borderWidth: 3,
        padding: 10,
        marginTop: 10,
        borderRadius: 18,
    },
    covid: {
        marginBottom: 80,
        justifyContent: 'center',
        marginRight: 190,
    },
    button: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '	rgb(136, 8, 8)',
        width: '100%',
        borderRadius: 4,
    },
    covidbtn:{

        padding: 6,
        backgroundColor: '	rgb(0, 0, 0)',
        width: '100%',
        borderRadius: 4,
        color :   '#ffffff' ,
        fontSize: 11,
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize:28,
    },

    heading: {
        fontWeight: 'bold',
        marginBottom: 22,
        fontSize: 36,
    },
});

const Login = function() {
    SecureStore.getItemAsync('accessToken').then((value) => {
      if (value) {
        history.push('/Dashboard');
      }
    });

    const history = useHistory();

    const [username, setUsername] = useState('ali12');
    const [password, setPassword] = useState('ali12');
    const [loading, setLoading] = useState(false);

    const loginUser = () => {
       if (username === 'ali12' && password == 'ali12') {
          history.push('/Dashboard');
        }
        else{
        alert('Invalid Username or Password!')
      }
    };
    const Update = () => {
        history.push('/Main');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contentContainerStyle}>
                    <View style = {styles.covid}>
                        <TouchableOpacity onPress = {Update}>
                          <Text style = {styles.covidbtn}>Weather</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.heading}>Sign In</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={loginUser} disabled={loading}>
                        {
                            loading
                            ? <ActivityIndicator/>
                            : <Text style={styles.buttonText}>LogIn   &#8594;</Text>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

export default Login;