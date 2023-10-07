// Settings.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AddTodo = ({ isVisible, toggleModal }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggleModal} // Close the modal when tapping outside of it
    >
      <View style={styles.modalContent}>
        <Text>This is a Gmail-like Modal</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text>Hide Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddTodo;
