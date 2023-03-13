import React, { useState, useEffect } from "react"
import { Animated, Keyboard, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableHighlight, Dimensions, Easing } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "axios";
import { HOST } from "./network";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/auth'
import translation from '../translations/SignInTranslation.js'
import { I18n } from "i18n-js";
import Flag from 'react-native-round-flags'
import AppLoader from "../components/AppLoader";
const windowWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const i18n = new I18n(translation)
i18n.locale = "he";

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [state, setState] = useState(AuthContext)
    const [locale, setLocale] = useState(i18n.locale)
    const [loading, isLoading] = useState(null)
    const [showRequiredFields, SetShowRequiredFields] = useState(false)
   
    const changeLanguage = () => {
        if (locale === "he")
            setLocale("en")
        else
            setLocale("he")
        i18n.locale = locale;
    }

    useEffect(() => {
        changeLanguage()
    }, [])

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

    if (loading === true) {
        return(<AppLoader />)
    }

    const handleLogin = async () => {
        isLoading(true)
        if (username === '' || password === '') {
            SetShowRequiredFields(true)
            isLoading(false)
            return;
        }
        //For server use
        const resp = await axios.post(`${HOST}/login/signin`, { username, password }).then(async res => {
            setState(res.data)
            if (res.data.error === "No user found") {
                alert(i18n.t("wrongPass"))
                isLoading(false)
                return;
            }
            await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data)).catch(err => err)
            //console.log(res.data)
            isLoading(false)
            SetShowRequiredFields(false)
            navigation.navigate('Footerroot')
        }).catch(err => console.log(err));
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
                        <Text style={styles.headerText}>{i18n.t("welcome")}</Text>
                        <Text style={styles.headerLoginText}>{i18n.t("login")}</Text>
                    </View>

                    <View style={styles.inputHeaders}>
                        <Text style={styles.inputTitle}>
                            {i18n.t("username")}{showRequiredFields ? <Text style={{ color: "darkred", fontWeight: "bold", fontSize: 12 }}> *</Text> : undefined}</Text>
                        <TextInput style={styles.input} placeholder="example: UX2DS53" placeholderTextColor={'grey'} onChangeText={text => setUsername(text)}></TextInput>

                        <Text style={styles.inputTitle}>{i18n.t("password")}
                        {showRequiredFields ? <Text style={{ color: "darkred", fontWeight: "bold", fontSize: 12 }}> *</Text> : ''}</Text>
                        <View>
                            <TextInput style={styles.input} placeholder='Enter your Password' placeholderTextColor={'grey'} secureTextEntry={!showPassword} textContentType='password' onChangeText={text => setPassword(text)} />
                            <TouchableHighlight style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                                <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                            <Text style={styles.buttonText}>{i18n.t("loginSubmit")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.buttonForgotPassword}>{i18n.t("forgotPass")}</Text>
                        </TouchableOpacity>
                        {showRequiredFields ? <Text style={{ color: "darkred", fontWeight: "bold", fontSize: 12, textAlign: 'center', marginTop: 10 }}>{i18n.t("empty")}*</Text> : ''}

                        <TouchableOpacity onPress={changeLanguage}>

                            {i18n.locale === "en" ? <Flag style={styles.langBtn} code="GB" /> :
                                <Flag style={[styles.langBtn, { alignSelf: 'flex-end' }]} code="IL" />}
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
        width: '100%',
        height: 45,
        borderColor: "gray",
        marginBottom: '5%',
        borderRadius: 10,
        color: 'black',
        fontSize: 20,
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
    langBtn: {
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#5669FF',
    },
});
export default SignIn