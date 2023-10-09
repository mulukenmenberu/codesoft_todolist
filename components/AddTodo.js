import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { addTodo } from './RealmServices';
const AddTodo = ({ isVisible, toggleModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actionDate, setActionDate] = useState('');
  const [priority, setPriority] = useState('');
  
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [actionDateError, setActionDateError] = useState('');
  const [priorityError, setPriorityError] = useState('');
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
    if (actionDate.trim() === '') {
      errors.actionDate = 'Action Date is required';
    }
  
    // Validate the "Priority" field
    if (priority.trim() === '') {
      errors.priority = 'Priority is required';
    }
  
    // If there are validation errors, set the error states and return
    if (Object.keys(errors).length > 0) {
      setTitleError(errors.title || '');
      setDescriptionError(errors.description || '');
      setActionDateError(errors.actionDate || '');
      setPriorityError(errors.priority || '');
      return;
    }
  
    // Save data to SQLite
    addTodo({
      title,
      description,
      actionDate,
      priority,
      count:0
    });
  
    // Reset the form fields and error states
    setTitle('');
    setDescription('');
    setActionDate('');
    setPriority('');
    setTitleError('');
    setDescriptionError('');
    setActionDateError('');
    setPriorityError('');
  
    // Close the modal
    toggleModal();
  };
  
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
        
        <TextInput
          style={[
            styles.input,
            descriptionError ? styles.inputError : null,
          ]}
          multiline
          placeholder="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setDescriptionError('');
          }}
        />
        {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}

        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              styles.halfWidth,
              actionDateError ? styles.inputError : null,
            ]}
            placeholder="Action Date"
            value={actionDate}
            onChangeText={(text) => {
              setActionDate(text);
              setActionDateError('');
            }}
          />
          <Picker
            style={[
              styles.input,
              styles.halfWidth,
              priorityError ? styles.inputError : null,
            ]}
            selectedValue={priority}
            onValueChange={(itemValue) => {
              setPriority(itemValue);
              setPriorityError('');
            }}
          >
            <Picker.Item label="Select Priority" value="" />
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
        {actionDateError ? <Text style={styles.errorText}>{actionDateError}</Text> : null}
        {priorityError ? <Text style={styles.errorText}>{priorityError}</Text> : null}

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
    justifyContent: 'space-between',
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

export default AddTodo;
