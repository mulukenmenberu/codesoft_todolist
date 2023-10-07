// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StatusBar, TextInput, StyleSheet, Text, View, Platform, StatusBar as stbar, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';



import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings'; // Replace with your actual component path
import AddTodo from './AddTodo';
import latest from '../data/latest.json'
const hheight = Dimensions.get('screen').height

export default function Dashboard({ navigation }) {
    const { width, height } = Dimensions.get('screen')
    const [active, setActive] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTodo, setModalVisibleTodo] = useState(false);


    useEffect(() => {
        latest.map((item) => {
            console.log(item.content)

        })
    }, [])

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
    return (
        <View style={styles.container}>
      <Settings isVisible={isModalVisible} toggleModal={toggleModal} />
      <AddTodo isVisible={isModalVisibleTodo} toggleModal={toggleModalTodo} />

            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Entypo name="menu" size={24} color="black" onPress={toggleModal}/>
                <Text style={{ fontWeight: 'bold' }}>My Todos</Text>
                {/* <Text style={{ fontWeight: 'bold' }}>Search</Text> */}
                {/* <EvilIcons name="search" size={24} color="black" /> */}
                <Ionicons name="add-circle" size={24} color="black" onPress={toggleModalTodo}/>
            </View>
            <ScrollView
            >

                <Card style={{ marginTop: 10, alignSelf: 'center', height: 80, width: width - 20, backgroundColor: '#F0F3F7', justifyContent: 'center' }}>
                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <View>
                <FontAwesome name="tasks" size={24} color="black" />
                            
                        </View>
                        <View style={{ marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                                <Text style={{ color: 'tomato', fontWeight: '', fontSize: 16 }}>● Urgent: 3 items </Text>
                                <Text style={{ color: 'green', fontWeight: '', fontSize: 16 }}>● Today's: 1 Item </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
                                <Text style={{ color: 'tomato', fontWeight: '', fontSize: 16 }}>● Urgent: 3 items </Text>
                                <Text style={{ color: 'green', fontWeight: '', fontSize: 16 }}>● Today's: 1 Item </Text>
                            </View>

                        </View>
                    </View>
                </Card>

                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 20 }}>
                    Welcome, Muluken</Text>
                    <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Text onPress={() => setActive(0)} style={{ margin: 20, fontWeight: active == 0 ? 'bold' : '', color: active == 0 ? '#2062F9' : '#CBD1DF' }}>All Todos</Text>
                        <Text onPress={() => setActive(1)} style={{ margin: 20, fontWeight: active == 1 ? 'bold' : '', color: active == 1 ? '#2062F9' : '#CBD1DF' }}>Past Items</Text>
                        <Text onPress={() => setActive(2)} style={{ margin: 20, fontWeight: active == 2 ? 'bold' : '', color: active == 2 ? '#2062F9' : '#CBD1DF' }}>Top Urgent</Text>
                        <Text onPress={() => setActive(3)} style={{ margin: 20, fontWeight: active == 3 ? 'bold' : '', color: active == 3 ? '#2062F9' : '#CBD1DF' }}>Today`s</Text>
                    </ScrollView>
                </View>
                <View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#17A589', height: 130, width: 180 }}>
                            <Entypo name="newsletter" size={24} style={{ alignSelf: 'flex-end' }} color="#fff" />
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: 35 }}>3</Text>
                            <Text style={{ color: '#fff', fontSize: 13 }}>Recently Updated Items</Text>
                            {/* <Text style={{ color: '#fff', fontSize: 13 }}>Items</Text> */}
                        </View>
                        <View style={{ padding: 10, borderRadius: 20, backgroundColor: 'tomato', height: 130, width: 180 }}>
                            <Ionicons name="alarm" size={24} style={{ alignSelf: 'flex-end' }} color="#fff" />
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: 35 }}>120</Text>
                            <Text style={{ color: '#fff', fontSize: 13 }}>Outdated / expired Items</Text>
                            {/* <Text style={{ color: '#fff', fontSize: 18 }}>Items</Text> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#1B54DB', height: 130, width: 180 }}>
                            <MaterialIcons name="category" size={24} style={{ alignSelf: 'flex-end' }} color="#fff" />
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: 35 }}>7</Text>
                            <Text style={{ color: '#fff', fontSize: 13 }}>Item under my category</Text>
                            {/* <Text style={{ color: '#fff', fontSize: 18 }}>category</Text> */}
                        </View>
                        <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#8E44AD', height: 130, width: 180 }}>
                            <FontAwesome name="sticky-note" size={24} style={{ alignSelf: 'flex-end' }} color="#fff" />
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: 35 }}>13</Text>
                            <Text style={{ color: '#fff', fontSize: 13 }}>Active Items</Text>
                            {/* <Text style={{ color: '#fff', fontSize: 18 }}>Items</Text> */}
                        </View>
                    </View>

                </View>

                <View>
                    

                    <View style={{ height: 100, }} >

                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? stbar.currentHeight : 0,
        // justifyContent:'center',
        // height: hheight
        // backgroundColor:'black'
    },
});
