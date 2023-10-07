// import { StatusBar } from 'expo-status-bar';
import {Image, StatusBar,TextInput, StyleSheet, Text, View, Platform, StatusBar as stbar, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
const hheight = Dimensions.get('screen').height

export default function Welcome({navigation}) {
  const {width,height} = Dimensions.get('screen')
  return (
    <ImageBackground source={require('../assets/image.png')} resizeMode='cover'>
    <SafeAreaView style={styles.container}>
 
    <Image source={require('../assets/logo.png')}
style={{width:150,height:150, alignSelf:'center', marginTop:-180}} />

      
<Text style={{justifyContent:'center', alignItems:'center', fontSize:20, alignSelf:'center'}}>
           Type your Registration number. please contact administartor if you don't have one.</Text>
           <TextInput 
           style={{borderRadius:15,marginTop:10,alignSelf:'center',height:60, width:250, borderWidth:3, paddingLeft:20,borderColor:'pink'}}
           />
<TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{borderRadius:20,alignSelf:'center',alignItems:'center',width:200, height:50, color:'#fff', backgroundColor:'#087AFC', marginTop:20, justifyContent:'center'}}>
<Text style={{justifyContent:'center', fontSize:20,color:'#fff'}}>Continue</Text>
</TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
marginTop:Platform.OS==='android'?stbar.currentHeight:0,
justifyContent:'center',
height:hheight
  },
});
