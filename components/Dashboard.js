// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StatusBar, FlatList, TextInput, StyleSheet, Text, View, Platform, StatusBar as stbar, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Card } from 'react-native-paper';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings'; // Replace with your actual component path
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import { getAllTodos, getSettings } from './SQLiteServices';

const hheight = Dimensions.get('screen').height

export default function Dashboard({ navigation }) {
    const { width, height } = Dimensions.get('screen')
    const [active, setActive] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTodo, setModalVisibleTodo] = useState(false);
    const [isModalVisibleTodoUpdate, setModalVisibleTodoUPDATE] = useState(false);
    const [todos, setTodos] = useState([]);
    const [updateData, setUpdateDate] = useState({});

    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [settingData, setSettingData] = useState('');

    

    function isDateInPast(dateString) {
        const today = new Date();
        const selectedDate = new Date(dateString);
        today.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
        selectedDate.setHours(0, 0, 0, 0);
      
        return selectedDate < today;
      }

      function isDateInFuture(dateString) {
        const today = new Date();
        const selectedDate = new Date(dateString);
        today.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
        selectedDate.setHours(0, 0, 0, 0);
      
        return selectedDate > today;
      }
      function isDateInToday(dateString) {
        const today = new Date();
        const selectedDate = new Date(dateString);
        today.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate.getTime() === today.getTime();
      }
    const refreshData = () => {
        // Fetch data from SQLite when the component mounts
        getAllTodos((data) => {
          setTodos(data);
        });
      };
      
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalTodo = () => {
        setModalVisibleTodo(!isModalVisibleTodo);
    };

    const toggleModalTodoUpdate = () => {
        setModalVisibleTodoUPDATE(!isModalVisibleTodoUpdate);
    };
    const backGroundColor = { "important": "#FFBF00", "todays": "#707B7C", "past": "#ACA7B2", "upcomming": "#6495ED" }

    const getBackground = (priority, actionDate) => {
      

     if (isDateInToday(actionDate)) {
        return backGroundColor['todays']
         }else if (isDateInPast(actionDate)) {
            return backGroundColor['past']
        }  
        else if (priority == 'important' && !isDateInToday(actionDate)) {
            return backGroundColor['important']
        } 
        else if (isDateInFuture(actionDate)) {
            return backGroundColor['upcomming']
        }
        return backGroundColor['upcomming']

    }

  const openFirUpdate = (title, description, actionDate, priority, id)=>{
    setUpdateDate({title, description, actionDate, priority, id})
        toggleModalTodoUpdate()
  }

    const renderItem = ({ item }) => (
        <Pressable style={[styles.card, { backgroundColor: getBackground(item.priority, item.actionDate) }]}   onPress={()=>openFirUpdate(item.title, item.description, item.actionDate, item.priority, item.id)} >
            {item.count > 0 ? <Ionicons name={'checkmark-done-circle'} size={24} style={styles.icon} color="#1ABC9C" /> :
                <Entypo name={'circular-graph'} size={24} style={styles.icon} color="#fff" />}
            <Text style={styles.date}>{item.actionDate }</Text>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
        </Pressable>
    );

      const refreshSettings = () => {
        getSettings((data) => {
            setSettingData(data[0]);
            setName(data[0].name)
            //setIsChecked
            setPriority(data[0].deleteolditems)
    
    
        });
      };

      const todays = todos.filter(item => {
        if (!item.actionDate) return false; // Skip items with null actionDate
        return isDateInToday(item.actionDate)
      }).length;
      
      const important = todos.filter(item => {
        if (!item.actionDate) return false; // Skip items with null actionDate
        return item.priority === 'important' && !isDateInPast(item.actionDate)
      }).length;
      
      const past = todos.filter(item => {
        if (!item.actionDate) return false; // Skip items with null actionDate
        // return selectedDate.toDateString() < today.toDateString();
        return isDateInPast(item.actionDate)

      }).length;
      
      const upcoming = todos.filter(item => {
        if (!item.actionDate) return false; // Skip items with null actionDate
        // return selectedDate.toDateString() > today.toDateString();
        return isDateInFuture(item.actionDate)

      }).length;
      

      useEffect(() => {
        getAllTodos((data) => {
            if(active==0){
                setTodos(data);
            }else if(active==1){
                const past = data.filter(item => {
                    if (!item.actionDate) return false; // Skip items with null actionDate
                                // return selectedDate.toDateString() < today.toDateString();
                    return isDateInPast(item.actionDate);

                  });
                setTodos(past);
            }
            else if(active==2){
                const important = data.filter(item => {
                    if (!item.actionDate) return false; // Skip items with null actionDate
                                return item.priority === 'important' && !isDateInPast(item.actionDate);
                  });
                  
                setTodos(important);
            }
            else if(active==3){
                const upcoming = data.filter(item => {
                    if (!item.actionDate) return false; // Skip items with null actionDate
                                return isDateInFuture(item.actionDate);
                  });
                  
                setTodos(upcoming);
            }
         
        });

        getSettings((data) => {
            setSettingData(data[0]);
            setName(data[0].name)
            setPriority(data[0].deleteolditems)
    
    
        });

    }, [active]);


    return (
        <View style={styles.container}>
            <Settings isVisible={isModalVisible} toggleModal={toggleModal}  refreshSettings={refreshSettings} settingData={ settingData}/>
            <AddTodo isVisible={isModalVisibleTodo} toggleModal={toggleModalTodo} refreshData={refreshData}/>
            <UpdateTodo isVisible={isModalVisibleTodoUpdate} toggleModal={toggleModalTodoUpdate} refreshData={refreshData} updateData={updateData}/>
            
            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Entypo name="menu" size={24} color="#fff" onPress={toggleModal} />
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>My Todos</Text>
                {/* <Text style={{ fontWeight: 'bold' }}>Search</Text> */}
                {/* <EvilIcons name="search" size={24} color="black" /> */}
                <Ionicons name="add-circle" size={24} color="#fff" onPress={toggleModalTodo} />
            </View>


            <Card style={{ marginTop: 10, alignSelf: 'center', height: 80, width: width - 20, backgroundColor: '#566573', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                    <View style={{ width: "20%", padding: 10 }}>
                        <FontAwesome name="tasks" size={24} color="black" />

                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '70%' }}>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#FFBF00', fontSize: 16, marginLeft: 10 }}>
                                ● Important: {important || 0}
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#707B7C', fontSize: 16, marginLeft: 10 }}>
                                ● Today's: {todays || 0}
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#ACA7B2', fontSize: 16, marginLeft: 10 }}>
                                ● Past: {past || 0}
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{ color: '#FFBF00', fontSize: 16, marginLeft: 10 }}>
                            ● 
                            </Text> 
                            <Text style={{ color: '#FFBF00', fontSize: 16, marginLeft: 10 }}>
                            +
                            </Text> 

                            <Text style={{ color: '#6495ED', fontSize: 16, marginLeft: 10 }}>
                            ●  Upcoming: {upcoming || 0}
                            </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Card>
            <ScrollView
            >
                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 20, color: '#fff' }}>
                    Welcome, {name}</Text>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Text onPress={() => setActive(0)} style={{ margin: 20, fontWeight: active == 0 ? 'bold' : '', color: active == 0 ? '#2062F9' : '#CBD1DF' }}>All Todos</Text>
                        <Text onPress={() => setActive(1)} style={{ margin: 20, fontWeight: active == 1 ? 'bold' : '', color: active == 1 ? '#2062F9' : '#CBD1DF' }}>Past</Text>
                        <Text onPress={() => setActive(2)} style={{ margin: 20, fontWeight: active == 2 ? 'bold' : '', color: active == 2 ? '#2062F9' : '#CBD1DF' }}>Important</Text>
                        <Text onPress={() => setActive(3)} style={{ margin: 20, fontWeight: active == 3 ? 'bold' : '', color: active == 3 ? '#2062F9' : '#CBD1DF' }}>Upcommings</Text>
                    </ScrollView>
                </View>
                <View>

                    <FlatList
                        data={todos}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2} // This specifies 2 columns
                        contentContainerStyle={styles.grid}
                    />
                    {todos.length<=0?<Text style={{ color: '#ACA7B2', fontSize: 23, alignSelf: 'center', marginTop: 70 }}>No Todo Items Added</Text>:''}
                </View>
                <View>
                    <View style={{ height: 100, }} >

                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#363537' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Platform.OS === 'android' ? stbar.currentHeight : 0,
        // justifyContent:'center',
        height: hheight,
        backgroundColor: '#363537'
    },
    grid: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        margin: 5,
        alignItems: 'center',
    },
    icon: {
        alignSelf: 'flex-end',
    },
    count: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
    },
    date: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 23,
    },
    text: {
        color: '#fff',
        fontSize: 13,
    },
});
