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

const DropDown2 = ({ navigation, btnTitle, options, selectedOption = 0, setSelectedOption }) => {
    // const navigation = useNavigation();

    const refRBSheet = useRef();
    const [openDrop, setOpenDrop] = useState(false)
    return (
        <View style={{ zIndex: 2000 }}>

            <TouchableOpacity onPress={() => setOpenDrop(!openDrop)} style={[styles.btn]}>

                <Text style={{ fontWeight: "300", marginRight: 8, fontSize: 16, color: "#000" }}>{btnTitle}: {selectedOption}</Text>
                {openDrop ?
                    <Svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                    </Svg>
                    :
                    <Svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 13L7 7L0.999999 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                    </Svg>

                }


            </TouchableOpacity>
            {openDrop &&
                <View style={styles.openBox}>
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>Select a Farm</Text>
                    <ScrollView nestedScrollEnabled={true}>
                        {options?.map((item, i) => (
                            <TouchableOpacity onPress={() => {
                                setOpenDrop(!openDrop);
                                setSelectedOption(i)
                            }} style={{ width: "100%", marginVertical: 10, flexDirection: "row", borderBottomWidth: 1, borderColor: "gray", height: 22, justifyContent: "space-between", paddingHorizontal: 10 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    {/* <View style={{ height: 5, alignSelf: "center", width: 5, borderRadius: 20, backgroundColor: "#000" }}></View> */}
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "600" }}>{item}</Text>
                                </View>
                                <View style={{ height: 12, width: 12, borderRadius: 20, justifyContent: "center", backgroundColor: "#fff" }}>
                                    {selectedOption == item &&
                                        <View style={{ height: 7, width: 7, alignSelf: "center", borderRadius: 20, backgroundColor: "#000" }}></View>}
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({

    btn: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: "center",
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        height: 50,
        marginBottom: 20,
        padding: 10,
        // width: "50%",
        borderColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    openBox: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 2,
        height: 250,
        position: "absolute",
        top: 40,
        zIndex: 100,
        // paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%",
        borderColor: "#FFFFFF",
    }

});

export default DropDown2;
