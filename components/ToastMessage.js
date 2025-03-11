// ToastMessage.js
import React from 'react';
import { View, Text, StyleSheet, Platform, Alert, ToastAndroid } from 'react-native';

const ToastMessage = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
};

export { ToastMessage, showToast };

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 14,
  },
});
