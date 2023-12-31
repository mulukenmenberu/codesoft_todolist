// import { StatusBar } from 'expo-status-bar';
import { Image, StatusBar, StyleSheet, Text, View, Platform, StatusBar as stbar, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
const hheight = Dimensions.get('screen').height
import Entypo from 'react-native-vector-icons/Entypo';

export default function Splash({ navigation }) {
  const { width, height } = Dimensions.get('screen')
  return (
    <View style={styles.container}>

      <Entypo
        style={{ alignSelf: 'center', marginTop: -50 }} name="evernote" size={130} color="orange" />



<Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 28, alignSelf: 'center', color: '#fff', fontFamily: 'Arial' }}>
  My Todo List
</Text>

      <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, alignSelf: 'center', color: '#fff' }}>
        TaskMaster: Organize, Achieve, Succeed
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ borderRadius: 20, alignSelf: 'center', alignItems: 'center', width: 200, height: 50, color: '#fff', backgroundColor: '#087AFC', marginTop: 20, justifyContent: 'center' }}>
        <Text style={{ justifyContent: 'center', fontSize: 20, color: '#fff' }}>Get Started</Text>
      </TouchableOpacity>

      <StatusBar backgroundColor='#363537' />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:Platform.OS==='android'?stbar.currentHeight:0,
    justifyContent: 'center',
    height: hheight,
    backgroundColor: '#363537'
  },
});
