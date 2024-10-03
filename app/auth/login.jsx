import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Email from "../../assets/icons/email.svg";
import Lock from "../../assets/icons/lock.svg";
import Eye from "../../assets/icons/eye.svg";
import ScreenOrientation, { Orientation } from 'expo-screen-orientation'
import Btn from '../components/btn';
import datalayer from '../datalayer';
import { router, useNavigation } from 'expo-router';
import InputField from '../components/input-field';

const Login = () => {
    const [hidePass, setHidePass] = useState(true)
    const [email, setEmail] = useState("")
    const [pswd, setPswd] = useState("")

    const navigation = useNavigation()
    useEffect(()=>{navigation.setOptions({headerShown: false})},[])

    handlePassEyeClick = () => {
        setHidePass((prev) => !prev)
    }

    handleLoginClick = async () => {
        try {
            const res = (await datalayer.authLayer.login(email, pswd))
            router.replace("../clock-in-out")
        } catch (e) {
            console.error("error in login: ".e)
        }
    }

    return (
        <LinearGradient colors={["#D4E5F2", "#167BC4"]} style={styles.root}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollable}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.headingText}>Convosoft People Portal</Text>
                    <Image source={require("../../assets/welcome_icon.png")} />
                    <LinearGradient colors={["#D4E5F2", "#167BC4"]} style={styles.loginView}>
                        <Text>Email</Text>
                        <InputField
                            leading={<Email width={20} height={20} />}
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={setEmail}
                        />
                        <InputField
                            leading={<Lock width={20} height={20} />}
                            secureTextEntry={hidePass}
                            placeholder='Enter Your Password'
                            value={pswd}
                            onChange={setPswd}
                            trailing={
                                <>
                                    <Pressable onPress={handlePassEyeClick}>
                                        <Eye width={20} height={20} />
                                    </Pressable>
                                </>
                            } />

                        <Btn title={"Login"} style={{ marginHorizontal: 10 }} handleClick={handleLoginClick} />
                    </LinearGradient>
                </SafeAreaView>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
    },
    headingText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#4e4e51",
    },
    scrollable: { flexGrow: 1, display: "flex" },
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
    },
    loginView: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 35,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        gap: 20,
    },
    iconedTextField: {
        inputField: {
            paddingHorizontal: 8,
            flexGrow: 1,
        },
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#167BC4",
        marginHorizontal: 10,
    }
})

export default Login