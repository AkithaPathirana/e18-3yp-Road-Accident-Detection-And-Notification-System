import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { 
    ImageBackground, 
    Image, 
    StyleSheet, 
    View, 
    StatusBar, 
    TouchableOpacity, 
    ScrollView,
    useWindowDimensions,
    Text,
    FlatList, 
} from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons, Entypo } from '@expo/vector-icons';

import ContactListCard from '../components/ContactListCard';
import AddListCard from '../components/AddListCard';
import ProfilePic from '../assets/profPic/ProfilePic';

// const updateList = (list) => {
//     return list.push(
//         {
//             name: 'AKITHA PATHIRANA',
//             telephoneNo: '077 5555 554',
//             image: require('../assets/profPic/picture2.jpg'),
//         }
//     )
// }
const renderItem = ({ item }) => (
    <ContactListCard name={item.name} telephoneNo={item.telephoneNo} image={item.image} />
);

const DriverHomeScreen = ({navigation}) => {


    const [list, setList] = useState(ProfilePic);

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <View style={[styles.container, {height: height}]}>
                <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                    <View style={styles.welcomeLogo}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Welcome')}
                            style={styles.back}>

                            <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                        </TouchableOpacity>
                        <Image source={require('../assets/img/LogoDriver.png')} style={{width: 110, height: 50}}/>
                    </View>

                    <View style={styles.label}>
                        <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff'}]}>My emergency contacts</Text>
                        <TouchableOpacity onPress={() => {
                                const e = {
                                    name: 'NEW',
                                    telephoneNo: Math.random(),
                                    image: require('../assets/profPic/picture1.jpg'),
                                };
                                setList([...list, e]);
                            }}>
                            <Ionicons name="ios-add" size={30} color="rgba(219, 219, 219, 0.7)" />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                        <FlatList style={{flex: 1}}
                            data={list}
                            renderItem={renderItem}
                            keyExtractor={item => item.telephoneNo}
                        />
                        
                        {/* <AddListCard onPress={() => { 
                            const e = {
                                name: 'NEW',
                                telephoneNo: Math.random(),
                                image: require('../assets/profPic/picture1.jpg'),
                            };
                            setList([...list, e]);
                        }} /> */}
                        {/* <View style={{flex: 1, justifyContent: 'flex-end'}}></View> */}
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    welcomeLogo: {
        // flex: 1,
        height: '17%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingLeft: '4%',
        // backgroundColor: '#5037A9'
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
    label: {
        height: '4%',
        flexDirection: 'row',
        // backgroundColor: '#5037A9',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '4%',
        marginBottom: '3.5%',
    },
    txtlabel: {
        color: '#D8D5DF',
        fontSize: 17,
        letterSpacing: 1
    },
})

export default DriverHomeScreen;