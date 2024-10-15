import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import UserIcon from '../../assets/icons/profile.svg';

export function TaskListItem({
  imageUrl,
  name,
  date,
  status,
  description,
  descriptionText,
  onDetailClick,
}) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderStyle: 'dashed',
        flexDirection: 'row',
        gap: 10,
      }}>
      {imageUrl ? (
        <Image
          style={{
            height: 32,
            width: 32,
            marginLeft: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          source={{uri: imageUrl}}
        />
      ) : (
        <UserIcon width={32} height={32} style={{color: '#D9D9D9'}} />
      )}
      <View style={{flexDirection: 'column', flex: 1, gap: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.texts}>
              {description}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dates}>
              {date}
            </Text>
          </View>
          <Text
            style={[
              styles.btnStatus,
              {
                backgroundColor:
                  status?.toLowerCase() == 'on going'
                    ? '#FDC933'
                    : status?.toLowerCase() == 'overdue'
                    ? '#D5213C'
                    : '#11A120',
                color: status?.toLowerCase() == 'on going' ? '#000' : '#FFFFFF',
              },
            ]}>
            {status}
          </Text>
        </View>
        <Text style={styles.description}>{name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.subdescription}>
            {descriptionText ?? "No Description"}
          </Text>
          <Pressable onPress={onDetailClick}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
              Show Details
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    fontFamily: 'outfit-600',
    color: '#6c6c6c88',
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
    fontFamily: 'outfit-600',
  },
});
