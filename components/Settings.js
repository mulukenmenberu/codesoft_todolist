import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { addTodo } from './SQLiteServices';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker'; // Import DatePicker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

const Settings = ({ isVisible, toggleModal, refreshData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actionDate, setActionDate] = useState(new Date());
  const [priority, setPriority] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [actionDateError, setActionDateError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility


  const toggleCheck = ()=>{
    setIsChecked(!isChecked)
    if(isChecked){
      setPriority('important')
    }else{
      setPriority('')

    }
   
}

  const handleSave = () => {
    // Initialize an empty errors object to track validation errors
    const errors = {};

    // Validate the "Title" field
    if (title.trim() === '') {
      errors.title = 'Title is required';
    }

    // Validate the "Description" field
    if (description.trim() === '') {
      errors.description = 'Description is required';
    }

    // Validate the "Action Date" field
    if (actionDate === '') {
      errors.actionDate = 'Action Date is required';
    }

    // Validate the "Priority" field
  

    // If there are validation errors, set the error states and return
    if (Object.keys(errors).length > 0) {
      setTitleError(errors.title || '');
      setDescriptionError(errors.description || '');
      setActionDateError(errors.actionDate || '');
      return;
    }

    // Save data to SQLite
    // actionDate = actionDate.toLocaleDateString()
    // actionDate = actionDate.replace(/\//g, '-');
    let d = actionDate.toISOString();
     let newDate = d.split('T')[0];

    addTodo({
      title,
      description,
      actionDate:newDate,
      priority,
      count: 0
    });
    setActionDate(new Date())
    refreshData()
    // Reset the form fields and error states
    setTitle('');
    setDescription('');
    setActionDate('');
    setPriority('');
    setTitleError('');
    setDescriptionError('');
    setActionDateError('');

    // Close the modal
    toggleModal();
  };


  const formattedDate = actionDate
  ? `${actionDate.getFullYear()}-${(actionDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${actionDate.getDate().toString().padStart(2, '0')}`
  : new Date().toLocaleDateString();


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
          placeholder="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
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
        {actionDateError ? <Text style={styles.errorText}>{actionDateError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      {actionDateError ? <Text style={styles.errorText}>{actionDateError}</Text> : null}

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
    alignItems:'center',
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
