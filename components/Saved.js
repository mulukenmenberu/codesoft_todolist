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

import latest from '../data/latest.json'
const hheight = Dimensions.get('screen').height

export default function Saved({ navigation }) {
    const { width, height } = Dimensions.get('screen')
    const [active, setActive] = useState(0)
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

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/logo.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontWeight: 'bold' }}>Dashboard</Text>
                {/* <Text style={{ fontWeight: 'bold' }}>Search</Text> */}
                {/* <EvilIcons name="search" size={24} color="black" /> */}
                <AntDesign name="search1" size={24} color="black" />
            </View>
            <ScrollView
            >
                <Card style={{ marginTop: 10, alignSelf: 'center', height: 80, width: width - 20, backgroundColor: '#F0F3F7', justifyContent: 'center' }}>
                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <View>
                            <Image source={require('../assets/mule.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 19 }}>Muluken M </Text>
                                <AntDesign name="edit" size={24} color="black" />
                            </View>
                            <Text>Information Technology - 3rd year</Text>
                        </View>
                    </View>
                </Card>

                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 20 }}>
                    Saved Items</Text>


                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Text onPress={() => setActive(0)} style={{ margin: 20, fontWeight: active == 0 ? 'bold' : '', color: active == 0 ? '#2062F9' : '#CBD1DF' }}>Most Recent</Text>
                        <Text onPress={() => setActive(1)} style={{ margin: 20, fontWeight: active == 1 ? 'bold' : '', color: active == 1 ? '#2062F9' : '#CBD1DF' }}>Top Urgent</Text>
                        <Text onPress={() => setActive(2)} style={{ margin: 20, fontWeight: active == 2 ? 'bold' : '', color: active == 2 ? '#2062F9' : '#CBD1DF' }}>Registrar's</Text>
                        <Text onPress={() => setActive(3)} style={{ margin: 20, fontWeight: active == 3 ? 'bold' : '', color: active == 3 ? '#2062F9' : '#CBD1DF' }}>Administration</Text>
                        <Text onPress={() => setActive(4)} style={{ margin: 20, fontWeight: active == 4 ? 'bold' : '', color: active == 4 ? '#2062F9' : '#CBD1DF' }}>Acadamics</Text>
                    </ScrollView>
                </View>

                <View>
                    {
                        latest.map((item) => {
                            const isContentExpanded = measureTextHeight(item.content, 17, width - 40);

                            const [isExpanded, setIsExpanded] = useState(false);

                            const toggleReadMore = () => {
                                setIsExpanded(!isExpanded);
                            };
                            const containerHeight = isExpanded ? 'auto' : isContentExpanded ? 'auto' : 200;


                            return (
                                <View style={{ marginTop: 15, alignSelf: 'center', borderRadius: 20, backgroundColor: '#fff', height: containerHeight, width: width - 40 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ fontWeight: 'bold', padding: 20, color: '#222', fontSize: 20, alignSelf: 'flex-start' }}>{item.title}</Text>
                                        <AntDesign name="save" style={{ padding: 20 }} size={16} color="#1B54DB" />

                                    </View>
                                    {/* <Text style={{paddingLeft:10,paddingRight:10,color:'#222', fontSize:17, alignSelf:'flex-start'}}>{item.content}</Text> */}
                                    <Text style={{ paddingLeft: 10, paddingRight: 10, color: '#222', fontSize: 17, alignSelf: 'flex-start' }}>
                                        {isExpanded ? item.content : `${item.content.substring(0, 3.5 * (width - 40) / 17)}... `}
                                        {!isExpanded && (
                                            <Text onPress={toggleReadMore} style={{ color: '#1B54DB', alignSelf: 'flex-start' }}>Read More</Text>
                                        )}
                                    </Text>

                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column'
                                    }}>
                                        <View style={{ padding: 20, paddingBotom: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <AntDesign name="like1" size={16} color="#1B54DB" >
                                                <Text> {item.likes}</Text>
                                            </AntDesign>

                                            <AntDesign name="eye" size={16} color="black" >
                                                <Text> {item.seen}</Text>
                                            </AntDesign>
                                            {/* <AntDesign name="like1" size={16} color="#fff" > */}
                                            <FontAwesome name="commenting-o" size={16} color="black" >
                                                <Text> {item.comments}</Text>
                                            </FontAwesome>



                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }


                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? stbar.currentHeight : 0,
        // justifyContent:'center',
        // height: hheight
    },
});
