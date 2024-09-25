import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => { 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.attendanceCard}>
        <Text style={styles.attendanceText}>78 %</Text>
        <Text>You have completed 78% attendance for this month.</Text>
      </View>
      <TouchableOpacity
        style={styles.clockInOutCard}
        onPress={() => navigation.navigate('clockInOut')} // This matches the screen name in App.js
      >
        <Text style={styles.clockInOutText}>Clock In / Clock Out</Text>
        <Text>Mark your clock in and clock out timings.</Text>
      </TouchableOpacity>
      <Text style={styles.categoryTitle}>Categories</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('Task')}>
          <Text style={styles.categoryCardTitle}>Today's Task</Text>
          <Text>You have no task for today.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('Events')}>
          <Text style={styles.categoryCardTitle}>Upcoming Events</Text>
          <Text>Lorem Ipsum is placeholder text.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('Overview')}>
          <Text style={styles.categoryCardTitle}>Overview</Text>
          <Text>Lorem Ipsum is placeholder text.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('NoticeBoard')}>
          <Text style={styles.categoryCardTitle}>Notice Board</Text>
          <Text>Lorem Ipsum is placeholder text.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  attendanceCard: {
    backgroundColor: '#cfe3ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  attendanceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3d5afe',
  },
  clockInOutCard: {
    backgroundColor: '#283593',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  clockInOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
    elevation: 2,
  },
  categoryCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
