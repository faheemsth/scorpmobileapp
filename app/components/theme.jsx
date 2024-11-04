import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bg: (color="#fffff")=>{return{backgroundColor: color}},
  ph: (px=4)=>{return{paddingHorizontal: px}},
  pv: (px=4)=>{return{paddingVertical: px}},
  screenBg: {
    backgroundColor: '#ffffff',
  },
  transparentBg: {
    backgroundColor: '#fff0',
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  font: (size = 400) => {
    return {
      fontFamily: `poppins-${size}`,
    };
  },
  size: px => {
    return {
      fontSize: px,
    };
  },
  textCenter: {
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexWrap: {
    flexWrap: "wrap"
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  gap: px => {
    return {
      gap: px,
    };
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyArround: {
    justifyContent: 'space-around',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
});

export default styles