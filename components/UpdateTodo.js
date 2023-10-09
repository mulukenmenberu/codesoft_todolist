import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { addTodo, deleteTodo } from './RealmServices';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker'; // Import DatePicker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

const UpdateTodo = ({ isVisible, toggleModal, refreshData, updateData }) => {
  const [title, setTitle] = useState(updateData.title);
  const [description, setDescription] = useState(updateData.description);
  const [actionDate, setActionDate] = useState(new Date());
  const [priority, setPriority] = useState(updateData.priority);
  const [id, setId] = useState(updateData.id);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [actionDateError, setActionDateError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility

  const handleDelete = ()=>{
    deleteTodo(id)
    refreshData()
    toggleModal();


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

console.log(newDate, "sjfdisuhfiuhiu")
    UpdateTodo({
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

  // useEffect(()=>{
    
  //  if( Object.keys(updateData).length>0){
  //   setPriority(updateData.priority)
  //   setTitle(updateData.title)
  //   setDescription(updateData.description)
  //   // setActionDate()
  //   }
  // },[])

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
          <TouchableOpacity
            style={[
              styles.input,
              styles.halfWidth,
              actionDateError ? styles.inputError : null,
            ]}
            onPress={() => setShowDatePicker(true)} // Show the date picker on press
          >
            <Text>{formattedDate}</Text>
          </TouchableOpacity>
          <CheckBox
            style={styles.checkbox}
            value={priority === 'important'}
            onValueChange={() => {
              setPriority('important');
            }}
          />
          <Text style={styles.checkboxLabel}>Important</Text>
        </View>
        {actionDateError ? <Text style={styles.errorText}>{actionDateError}</Text> : null}

        <View style={styles.row2}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDoner} onPress={handleSave}>
          <Text style={styles.buttonText}>Mark as Done</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
       
      </View>
      {actionDateError ? <Text style={styles.errorText}>{actionDateError}</Text> : null}

      {showDatePicker && (
        <DateTimePicker
          value={actionDate}
          mode="date"
          display="spinner" // Use 'spinner' to display as a spinner
          onChange={(event, date) => {
            setShowDatePicker(false); // Hide the date picker
            if (event.type === 'set') {
              setActionDate(date);
              setActionDateError('');
            }
          }}
        />
      )}
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
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  buttonDoner: {
    backgroundColor: '#12C09E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateTodo;
