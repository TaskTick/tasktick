import React, { useState, useEffect } from "react"
import { Animated, Keyboard, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableHighlight, Dimensions, Easing } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "axios";
import { HOST } from "./network";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/auth'

const windowWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const SignIn = ({navigation}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false)
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [state, setState] = useState(AuthContext)

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 750,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
            Animated.timing(animation, {
                toValue: 0,
                duration: 750,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [animation]);

    const handleLogin = async () => {
        console.log('login pressed')
        //For server use
        const resp = axios.post(`${HOST}/login/signin`, { username, password }).then(async res => {
            setState(res.data)
            await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data)).catch(err => err)
            console.log(res.data)
            navigation.navigate('Footerroot')
        }).catch(err => console.log(err));
        //navigation.navigate('Home')
    }

    return (
        <LinearGradient
            colors={['#5669FF', '#0013A5']}
            style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyles} source={require("../assets/logo-login4.png")} />
            </View>
            <Animated.View
                style={[{
                    transform: [
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0],
                            }),
                        },
                    ],
                }, isKeyboardOpen ? styles.circleClosed : styles.circleOpen]}>
                <View>
                    <View style={styles.insideCircle}>
                        <Text style={styles.headerText}>Welcome</Text>
                        <Text style={styles.headerLoginText}>Login to your account</Text>
                    </View>

                    <View style={styles.inputHeaders}>
                        <Text style={styles.inputTitle}>Username</Text>
                        <TextInput style={styles.input} placeholder="example: UX2DS53" placeholderTextColor={'grey'} onChangeText={text => setUsername(text)}></TextInput>

                        <Text style={styles.inputTitle}>Password</Text>
                        <View>
                            <TextInput style={styles.input} placeholder='Enter your Password' placeholderTextColor={'grey'} secureTextEntry={!showPassword} textContentType='password' onChangeText={text => setPassword(text)} />
                            <TouchableHighlight style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                                <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.buttonForgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    imageContainer: {
        top: 0,
        marginTop: '15%',
        width: windowWidth * 0.79,
        height: windowsHeight * 0.31,
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageStyles: {
        // width: '100%',
        // height: '100%',
        // marginBottom: '5%'
        
    },
    circleOpen: {
        width: '100%',
        height: '62%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#FEFCFF',
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
    circleClosed: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FEFCFF',
        position: "absolute",

    },
    insideCircle: {
        margin: '8%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    headerLoginText: {
        fontSize: 25,
        color: 'black',
    },
    inputHeaders: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    inputTitle: {
        marginBottom: '1%',
        color: 'grey'
    },
    input: {
        borderWidth: 1,
        width:'100%',
        height:45,
        borderColor: "gray",
        marginBottom: '5%',
        borderRadius: 10,
        color: 'black',
        fontSize:20,
        padding: 10,
    },
    buttonLogin: {
        backgroundColor: "#5669FF",
        height: 50,
        marginTop: '5%',
        marginBottom: '5%',
        justifyContent: "center",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        
    },
    buttonForgotPassword: {
        textAlign: 'center',
        color: '#C82A33',
        //marginBottom:'5%'
    },
    icon: {
        textAlign: "right",
        position: "absolute",
        right: '5%',
        bottom: '50%',
        zIndex: 99999999,
    }
});
export default SignIn