import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
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
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          width: '100%',
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View>
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
          </View>
          <View style={{marginLeft: 8}}>
            <Text style={styles.texts}>{description}</Text>
            <Text style={styles.dates}>{date}</Text>
          </View>
        </View>
        <View>
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
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',

          marginLeft: 50,
          marginRight: 15,
          justifyContent: 'space-between',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          {!!description && (
            <Text style={styles.description}>{name}</Text>
          )}
          {!!descriptionText && (
            <Text style={styles.subdescription}>{descriptionText}</Text>
          )}
        </View>
        {!!onDetailClick && (
          <TouchableOpacity
            onPress={onDetailClick}
            activeOpacity={0.7}
            style={{alignSelf: 'flex-end'}}>
            <Text style={styles.details}>Show Details</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.25)',
          borderStyle: 'dashed',
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
    </>
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
    marginRight: 13,
    backgroundColor: '#FDC933',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 11,
  },

  description: {
    fontFamily: "outfit-600",
    color: "#6c6c6c88"
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
    fontFamily: "outfit-600"
  },
});
