import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import UserIcon from '../../assets/icons/profile.svg';

export function TaskListItem({
  imageUrl,
  name,
  date,
  status,
  title,
  descriptionText,
  onDetailClick,
}) {
  return (
    <Pressable
      onPress={onDetailClick}
      style={{
        overflow: 'hidden',
        borderRadius: 10,
        borderColor: '#A0A0A0',
        borderWidth: 1,
        elevation: 4,
        backgroundColor: "#ffffff"
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            {imageUrl ? (
              <Image
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                }}
                source={{uri: imageUrl}}
              />
            ) : (
              <UserIcon width={36} height={36} style={{color: '#D9D9D9'}} />
            )}
            <Text style={styles.description}>
              {name} {'\n'}{' '}
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'poppins-400',
                  color: '#A0A0A0',
                }}>
                Assigned by
              </Text>
            </Text>
          </View>
          <Text style={{fontSize: 11, fontFamily: 'poppins-400'}}>{date}</Text>
        </View>
        <Text
          style={{fontFamily: 'poppins-500', fontSize: 12}}
          numberOfLines={1}>
          {title}
        </Text>
        <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', overflow: 'hidden', gap: 10}}>
          <Text
            style={{fontFamily: 'poppins-400', fontSize: 10, color: '#7647EB',}}
            numberOfLines={1}>
            See more
          </Text>
          <Text
            style={{fontFamily: 'poppins-400', fontSize: 10, color: '#6C6C6C'}}
            numberOfLines={1}>
            {descriptionText}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 8,
            backgroundColor: '#e4dafb',
            color: '#7647EB',
          }}>
          Status
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 8,
            backgroundColor: status?.toLowerCase() == 'on going'
            ? '#FDC93333'
            : status?.toLowerCase() == 'overdue'
            ? '#D5213C33'
            : '#11A12033',
            color:
              status?.toLowerCase() == 'on going'
                ? '#FDC933'
                : status?.toLowerCase() == 'overdue'
                ? '#D5213C'
                : '#11A120',
          }}>
          {status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    gap: 17,
  },

  dates: {
    backgroundColor: '#4884FB',
    width: 'auto',
    borderRadius: 20,
    paddingHorizontal: 8,
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 3,
    paddingVertical: 2,
    justifyContent: 'center',
    textAlign: 'center',
  },
  btnStatus: {
    alignSelf: 'flex-end',
    backgroundColor: '#FDC933',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 11,
  },

  description: {
    paddingHorizontal: 12,
    fontFamily: 'poppins-600',
    color: '#6c6c6c',
    fontSize: 14,
    lineHeight: 16,
  },

  subdescription: {
    fontSize: 11,
    color: '#6C6C6C',
  },

  details: {
    color: '#3FA3FF',
    fontSize: 10,
  },
  btnB: {
    backgroundColor: '#11A120',
    borderRadius: 20,
    marginRight: 13,
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  texts: {
    fontFamily: 'poppins-600',
  },
});
