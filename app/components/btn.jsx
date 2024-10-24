import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, StyleSheet, Modal} from 'react-native';

const Btn = ({
  style,
  handleClick = () => {},
  leading,
  title,
  trailing,
  gradientColors,
  disabled = false,
}) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    handleAsync = async () => {
      if (pressed) {
        await handleClick()?.catch(()=>setPressed(false));
      }
      setPressed(false);
    };
    handleAsync().catch(console.error);
  }, [pressed]);

  click = () => {
    setPressed(true);
  };

  return (
    <>
      <Pressable onPress={click} disabled={disabled}>
        <LinearGradient
          style={[styles.btn, style]}
          colors={gradientColors ?? ['#fff0', '#fff0']}>
          {leading}
          <Text style={[styles.btn.txt, {color: style?.color ?? '#fff'}]}>
            {title}
          </Text>
          {trailing}
        </LinearGradient>
      </Pressable>
      <Modal
        visible={pressed}
        transparent={true}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Text style={{padding: 8, backgroundColor: '#fff', borderRadius: 4}}>
          Loading...
        </Text>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#7647EB',
    borderRadius: 5,
    padding: 8,
    elevation: 4,
    color: '#fff',
    gap: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    txt: {
      color: '#fff',
      textAlign: 'center',
      margin: 4,
      fontFamily: 'outfit-500',
    },
  },
});

export default Btn;
