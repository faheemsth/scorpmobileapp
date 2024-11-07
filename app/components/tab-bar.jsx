import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

const TabBar = ({
  tabs = [{title: '', color: '#FFFFFF', bgColor: '#7647EB'}],
  onTabChange = index => {},
}) => {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    console.log(
      'activeTabChanged',
      activeTab,
      'bg color is',
      tabs.map(e => e.bgColor),
    );
    onTabChange?.(activeTab);
  }, [activeTab]);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#A0A0A0',
        overflow: 'hidden',
      }}>
      {tabs.map((t, i) => (
        <Pressable
          key={i}
          onPress={() => setActiveTab(i)}
          style={{
            backgroundColor:
              activeTab == i ? t?.bgColor ?? '#7647EB' : '#ffffff',
            borderColor: '#A0A0A0',
            paddingHorizontal: 10,
            borderRightWidth: i !== (tabs.length-1) ? 1 : 0
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 10,
              color: activeTab == i ? t?.color ?? '#FFFFFF' : '#414141',
            }}>
            {t.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TabBar;
