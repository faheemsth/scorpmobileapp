import { LinearGradient } from 'expo-linear-gradient'
import { router, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ArrowRight from "../../assets/icons/ArrowRight.svg"
import Btn from '../components/btn'

const Hello = () => {
    const navigation = useNavigation()
    useEffect(()=>{navigation.setOptions({headerShown: false})},[])
    handleBtnClick = () => router.replace("../auth/login")
    return (
        <View style={styles.container}>
                <Text style={styles.hello}>Hello</Text>
                <Image source={require("../../assets/welcome_icon.png")} />
                <Text style={styles.message}>Streamline and Access Your Entire Business, Right from the Palm of Your Hand. Comprehensive Management from Operations to Analytics, All in One Place.</Text>
                <Btn title={"Login to your Account"} handleClick={handleBtnClick} style={{paddingHorizontal: 50}} trailing={<><ArrowRight style={{color: "#fff"}} /></>} />
            {/* <LinearGradient colors={["#DDDDDD", "#7647EB"]} style={styles.container}>
            </LinearGradient> */}
            <StatusBar style='dark'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%",
        height: "100%",
    },
    hello: {
        fontFamily:"poppins-700",
        fontSize: 32,
        color: "#7647EB",
        margin: 39,
    },
    message: {
        fontSize: 15,
        color: "#A0A0A0",
        textAlign: "justify",
        width: "auto",
        margin: 39,
    },
})

export default Hello