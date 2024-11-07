import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {download, useUser} from '../../../datalayer/datalayer';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import {validateConfig} from 'expo-build-properties/build/pluginConfig';
import TabBar from '../../components/tab-bar';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useUser();
  return (
    <ScrollView>
      <ScrollView contentContainerStyle={{flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center'}}>
        <TabBar
          tabs={[
            {title: 'Personal'},
            {title: 'Professional'},
            {title: 'documents'},
          ]}
          onTabChange={setActiveTab}
        />
      </ScrollView>
      {activeTab == 0 ? (
        <PersonalInfoTab user={user} />
      ) : activeTab == 1 ? (
        <ProfessionalInfoTab user={user} />
      ) : activeTab == 2 ? (
        <DocumentsInfoTab user={user} />
      ) : (
        <PersonalInfoTab user={user} />
      )}
    </ScrollView>
  );
};

function PersonalInfoTab({user}) {
  const [data, setData] = useState();
  useEffect(() => {
    const d = [
      {title: 'Name', desc: user?.name},
      {title: 'Email', desc: user?.email},
      {title: 'Phone', desc: user?.phone},
      {title: 'Address', desc: user?.address},
    ];
    setData(d);
  }, [user]);
  return (
    <View style={{paddingVertical: 20, gap: 10}}>
      {data?.map(d => (
        <InfoItem title={d.title} desc={d.desc} />
      ))}
    </View>
  );
}

function ProfessionalInfoTab({user}) {
  const [data, setData] = useState();
  useEffect(() => {
    const d = [
      {title: 'Employee ID', desc: user?.id},
      {title: 'Designation', desc: user?.type},
      {title: 'Company Email Address', desc: user?.email},
    ];
    setData(d);
  }, [user]);
  return (
    <View style={{paddingVertical: 20, gap: 10}}>
      {data?.map(d => (
        <InfoItem title={d.title} desc={d.desc} />
      ))}
    </View>
  );
}

function DocumentsInfoTab({user}) {
  const [data, setData] = useState();
  useEffect(() => {
    const d = user?.employee_docs?.data?.map(d => {
      let vd = [];
      for (const k in d) {
        vd = [
          ...vd,
          {
            name: k.split('_').join().replace(',', ' ').toUpperCase(),
            value: `${user?.employee_docs?.base_url}${d[k]}`,
          },
        ];
      }
      return vd;
    });
    console.log('setting data vd ', d);
    setData(...d);
  }, [user]);
  return (
    <View style={{paddingVertical: 20, gap: 10}}>
      {data?.map((d, i) => {
        console.log('document is', d);
        return (
          <Pressable
            onPress={() => {
              download(d.name, d.value);
            }}
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <Text>{d.name}</Text>
            <DownloadIcon />
          </Pressable>
        );
      })}
    </View>
  );
}

function InfoItem({title, desc}) {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
      <Text style={{fontFamily: 'poppins-400', fontSize: 12, color: '#A0A0A0'}}>
        {title}
      </Text>
      <Text style={{fontFamily: 'poppins-500', fontSize: 13, color: '#414141'}}>
        {desc}
      </Text>
    </View>
  );
}

export default MyProfile;
