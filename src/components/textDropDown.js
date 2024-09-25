import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Button,
    TextInput,
    ImageBackground,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import { Defs, G, Filter, Path, Rect, Svg } from 'react-native-svg';

const TextDropDown = ({ navigation, btnTitle, value, setValue }) => {
    // const navigation = useNavigation();
    const refRBSheet = useRef();
    const [openDrop, setOpenDrop] = useState(false)
    return (
        <View style={{ zIndex: 2000 }}>

            <TouchableOpacity onPress={() => setOpenDrop(!openDrop)} style={[styles.btn]}>

                <Text style={{ fontWeight: "300", marginLeft: 10, fontSize: 16, color: "#000" }}>{btnTitle}</Text>
                {openDrop ?
                    <Svg style={{ marginTop: 8 }} width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.42871 1.4978L11.3889 8.25357L20.3491 1.49224" stroke="#363B3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                    : <Svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.00025 19.8298L8.76833 10.8789L2.01934 1.90944" stroke="#363B3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>}


            </TouchableOpacity>
            {openDrop &&
                <TextInput placeholder='Type....' style={styles.openBox} value={value} onChangeText={(text) => setValue(text)} />
            }
        </View>
    );
};

const styles = StyleSheet.create({

    btn: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: "center",
        marginTop: 12,
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "85%",
        borderColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    openBox: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 9,
        borderWidth: 2,
        height: 200,
        zIndex: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "84%",
        borderColor: "#FFFFFF",
    }

});

export default TextDropDown;
