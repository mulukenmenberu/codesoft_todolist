import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { addTodo } from './SQLiteServices';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker'; // Import DatePicker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { updateSetting } from './SQLiteServices';
const Settings = ({ isVisible, toggleModal, refreshSettings, settingData }) => {
  const [name, setName] = useState('User');

  const [priority, setPriority] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [settingdata, setSettingData] = useState('');

  const toggleCheck = () => {
    setIsChecked(!isChecked)
    if (isChecked) {
      setPriority('important')
    } else {
      setPriority('')

    }

  }

  const handleSave = () => {
    // Initialize an empty errors object to track validation errors
    const errors = {};

    // Validate the "Title" field
    if (name.trim() === '') {
      errors.name = 'Name is required';
    }


    // Validate the "Priority" field


    // If there are validation errors, set the error states and return
    if (Object.keys(errors).length > 0) {
      setTitleError(errors.name || '');
      return;
    }


    updateSetting({
      name,
      isChecked: isChecked ? 1 : 0,
    });
    refreshSettings()
    // Reset the form fields and error states
    setName('');
    setPriority('');
    setTitleError('');


    // Close the modal
    toggleModal();
  };


  useEffect(() => {
    console.log(settingData, "=======")
    setName(settingData.name)
    setPriority(settingData.priority == 1 ? 'important' : '')
  }, [])


  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}
    >
      <View style={styles.modalContent}>
        <TextInput
          style={[
            styles.input,
            titleError ? styles.inputError : null,
          ]}
          placeholder="User"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setTitleError('');
          }}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

        <View style={styles.row}>

          <CheckBox
            style={styles.checkbox}
            value={priority === 'important'}
            onValueChange={toggleCheck}
          />
          <Text style={styles.checkboxLabel}>Auto Delete Past Todos</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
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
    height: 'auto',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    height: 100,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Settings;
