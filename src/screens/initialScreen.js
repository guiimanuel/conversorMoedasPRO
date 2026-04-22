import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, Image, onChangeText } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from '@expo/vector-icons';
//#

function initialScreen({ navigation }) {
    return (
        <View style={{ height: '100%', backgroundColor: '#fffff' }}>
            <StatusBar barStyle='light-content' />

            {/* Header*/}
            <View style={{ backgroundColor: '#5B6EFF', width: '100%', height: 250, borderRadius: 28, alignItems: 'flex-start', padding: 20 }}>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>

                </View>
                <View style={{ height: 50, width: '100%', borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 10 }}>
                    
                </View>
            </View>

            {/*Main*/}
            <View style={{ justifyContent: 'flex-end', marginTop: 30 }}>
                <View style={{
                    alignItems: 'flex-start', flexDirection: 'row', width: '100%', paddingBottom: 5,
                    paddingLeft: 25
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Categorias</Text>

                    <View style={{ width: 300, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Mostrar Tudo</Text>
                    </View>

                </View>

                {/*cards 01*/}
                <View style={{ width: '100%', height: 120, flexDirection: 'row' }}>

                    {/*01*/}
                    <View style={{
                        backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, marginRight: 20,
                        marginLeft: 25, borderRadius: 10, gap: 11
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <FontAwesome5 name="hospital-user" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: '#5e5e5e' }}>Consultas</Text>
                        </View>
                    </View>

                    {/*02*/}
                    <View style={{ backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, borderRadius: 10, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <FontAwesome5 name="tooth" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: '#5e5e5e' }}>Dentista</Text>
                        </View>
                    </View>

                    {/*03*/}
                    <View style={{
                        backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, marginLeft: 20,
                        borderRadius: 10, gap: 11
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <FontAwesome name="heartbeat" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#5e5e5e' }}>Cardiologista</Text>
                        </View>
                    </View>
                </View>

                {/*cards 02*/}
                <View style={{ width: '100%', height: 120, flexDirection: 'row' }}>

                    {/*01*/}
                    <View style={{
                        backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, marginRight: 20,
                        marginLeft: 25, borderRadius: 10, gap: 11
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <FontAwesome5 name="hospital" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: '#5e5e5e' }}>Hospital</Text>
                        </View>
                    </View>

                    {/*02*/}
                    <View style={{ backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, borderRadius: 10, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <MaterialCommunityIcons name="car-emergency" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: '#5e5e5e' }}>Emergência</Text>
                        </View>
                    </View>

                    {/*03*/}
                    <View style={{
                        backgroundColor: 'white', margin: 10, marginTop: 5, width: 110, height: 100, marginLeft: 20,
                        borderRadius: 10, gap: 11
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            <Fontisto name="laboratory" size={40} color='#5B6EFF' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#5e5e5e' }}>Laboratório</Text>
                        </View>
                    </View>
                </View>

                {/* continuacao Main */}
                <View style={{
                    alignItems: 'flex-start', paddingLeft: 25, flexDirection: 'row', width: '100%'
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Melhores doutores</Text>
                </View>


                <View style={{ width: '100%', height: 260, paddingLeft: 25, alignItems: 'flex-start' }}>

                    <View style={{
                        width: 392, height: 100, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',
                        marginTop: 5, borderRadius: 8
                    }}>
                        <Image
                            source={require('../../assets/images/fotodeEmanuel.jpeg')}
                            style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 15 }} />

                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontWeight: '600' }}>Dr. Emanuel Roberto</Text>
                            <Text style={{ fontWeight: '100' }}>Médico - Psicoterapia</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="star" size={19} color="#ffdd00" />
                                <Text style={{ color: '#5e5e5e', fontWeight: '600' }}> 4.9 (37 Visualizações)</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{
                        width: 392, height: 100, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',
                        marginTop: 15, borderRadius: 8
                    }}>
                        <Image
                            source={require('../../assets/images/fotodefilipe.jpeg')}
                            style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 15 }} />

                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontWeight: '600' }}>Dr. Filipe Moura</Text>
                            <Text>Médico - Medicina Interna</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="star" size={19} color="#ffdd00" />
                                <Text style={{ color: '#5e5e5e', fontWeight: '500' }}> 4.9 (37 Visualizações)</Text>
                            </View>
                        </View>
                    </View>

                </View>

                {/* footer */}
                <View style={{ backgroundColor: '#5B6EFF', width: '100%', height: 300, flexDirection: 'row' }}>

                    <View style={{ width: 100, height: 90, marginTop: 13, marginLeft: 15, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                            <AntDesign name="home" size={40} color="white" />

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Home</Text>
                        </View>
                    </View>

                    <View style={{ width: 100, height: 90, marginTop: 13, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                            <FontAwesome6 name="user-doctor" size={40} color="white" />

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Doutores</Text>
                        </View>
                    </View>

                    <View style={{ width: 100, height: 90, marginTop: 13, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 11 }}>
                            <FontAwesome name="calendar" size={40} color="white" />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Agendamento</Text>
                        </View>
                    </View>

                    <View style={{ width: 100, height: 90, marginTop: 13, gap: 11 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                            <AntDesign name="profile" size={40} color="white" />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Perfil</Text>
                        </View>
                    </View>

                </View>

            </View>

        </View>
    )
};
export default initialScreen;