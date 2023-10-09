// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StatusBar, FlatList, TextInput, StyleSheet, Text, View, Platform, StatusBar as stbar, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';



import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings'; // Replace with your actual component path
import AddTodo from './AddTodo';
import { getAllTodos } from './RealmServices';
const hheight = Dimensions.get('screen').height

export default function Dashboard({ navigation }) {
    const { width, height } = Dimensions.get('screen')
    const [active, setActive] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTodo, setModalVisibleTodo] = useState(false);
    const [todos, setTodos] = useState([]);




    const measureTextHeight = (text, fontSize, width) => {
        const numberOfLines = 3.5; // Define the maximum number of lines
        const lineHeight = fontSize * 1.2; // Adjust this value as needed
        const maxHeight = lineHeight * numberOfLines;

        const TextHeight = Math.ceil(text.length / (width / fontSize)) * lineHeight;

        return TextHeight <= maxHeight;
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalTodo = () => {
        setModalVisibleTodo(!isModalVisibleTodo);
    };
    const backGroundColor = {"important":"#FFBF00","todays":"#707B7C","past":"#ACA7B2","upcomming":"#6495ED"}

    const getBackground = (type, actionDate)=>{
        if(actionDate<1){
            return backGroundColor['past']
        } else if(type=='important'){
            return backGroundColor['important']
        }else if(actionDate==1){
            return backGroundColor['todays']
        }else if(actionDate>1){
            return backGroundColor['upcomming']
        }
        return backGroundColor['upcomming']
       
    }

    
    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: getBackground(item.priority) }]}>
            {item.count > 0 ? <Ionicons name={'checkmark-done-circle'} size={24} style={styles.icon} color="#1ABC9C" /> :
                <Entypo name={'circular-graph'} size={24} style={styles.icon} color="#fff" />}
            <Text style={styles.date}>{item.actionDate}</Text>
            <Text style={styles.text}>{item.title}</Text>
        </View>
    );
    useEffect(() => {
        // Fetch data from SQLite when the component mounts
        getAllTodos((data) => {
          setTodos(data);
        });
      }, []);
    return (
        <View style={styles.container}>
            <Settings isVisible={isModalVisible} toggleModal={toggleModal} />
            <AddTodo isVisible={isModalVisibleTodo} toggleModal={toggleModalTodo} />

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
                                ● Important: 3
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#707B7C', fontSize: 16, marginLeft: 10 }}>
                                ● Today's: 1
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#ACA7B2', fontSize: 16, marginLeft: 10 }}>
                                ● Past: 3
                            </Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#6495ED', fontSize: 16, marginLeft: 10 }}>
                                ● Upcoming: 1
                            </Text>
                        </View>
                    </View>

                </View>
            </Card>
            <ScrollView
            >
                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 20, color: '#fff' }}>
                    Welcome, Muluken</Text>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Text onPress={() => setActive(0)} style={{ margin: 20, fontWeight: active == 0 ? 'bold' : '', color: active == 0 ? '#2062F9' : '#CBD1DF' }}>All Todos</Text>
                        <Text onPress={() => setActive(1)} style={{ margin: 20, fontWeight: active == 1 ? 'bold' : '', color: active == 1 ? '#2062F9' : '#CBD1DF' }}>Past Items</Text>
                        <Text onPress={() => setActive(2)} style={{ margin: 20, fontWeight: active == 2 ? 'bold' : '', color: active == 2 ? '#2062F9' : '#CBD1DF' }}>Important</Text>
                        <Text onPress={() => setActive(3)} style={{ margin: 20, fontWeight: active == 3 ? 'bold' : '', color: active == 3 ? '#2062F9' : '#CBD1DF' }}>Today`s</Text>
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
