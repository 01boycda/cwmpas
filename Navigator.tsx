import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTSTYLES, globalStyles } from './styles';
import { patient } from './types';

const patients: patient[] = [
    { id: 0, firstName: 'John', lastName: 'Doe', level: 1, },
    { id: 1, firstName: 'Jane', lastName: 'Doe', level: 2, },
    { id: 2, firstName: 'David', lastName: 'Jackson', level: 3, },
]

const PatientDirectory = (props: any) => {
    const nav = props.navigation;

    return (<LinearGradient
        colors={[COLORS.purpleLight, COLORS.purpleLighter]}
        style={globalStyles.pageContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}>
        <ScrollView style={styles.patientsContainer}>
            {patients.map(patient => {
                return (
                    <TouchableOpacity
                        key={patient.id}
                        style={styles.patientButton}
                        onPress={() => nav.navigate("Patient Profile", { name: `${patient.firstName} ${patient.lastName}`, patient: patient })}>
                        <Text style={FONTSTYLES.buttonText}>{patient.firstName} {patient.lastName}</Text>
                        <Text style={[FONTSTYLES.lightText, { textAlign: 'center' }]}>Patient Level: {patient.level}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
        <View>
            <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("Add Patient")}>
                <Text style={FONTSTYLES.buttonText}>Add Patient</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
    )
}

const AddPatient = (props: any) => {
    const nav = props.navigation;

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.inpuerHeaderText}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setFirstName}
                placeholder="Tap here"
                placeholderTextColor={COLORS.purpleDark}
                caretHidden
            />
            <Text style={FONTSTYLES.inpuerHeaderText}>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setLastName}
                placeholder="Tap here"
                placeholderTextColor={COLORS.purpleDark}
                caretHidden
                editable={false}
            />
        </View>
    )
}

const PatientProfile = (props: any) => {
    const nav = props.navigation;
    const patient = props.route.params.patient;

    return (
        <>
            <View style={globalStyles.pageContainer}>
                <Text style={FONTSTYLES.darkText}>Patient level: {patient.level}</Text>

                <ScrollView style={styles.functionalityDescriptionContainer}>
                    <Text style={FONTSTYLES.darkText}>This is where the functionality description would go</Text>
                </ScrollView>

                <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("Daily Activities")}>
                    <Text style={FONTSTYLES.buttonText}>Daily Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("Hobbies & Interests")}>
                    <Text style={FONTSTYLES.buttonText}>Hobbies & Interests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("Your Story")}>
                    <Text style={FONTSTYLES.buttonText}>Your Story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("About CwmpasOT")}>
                    <Text style={FONTSTYLES.buttonText}>About CwmpasOT</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const DailyActivities = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.pageHeaderText}>Daily Activities</Text>
        </View>
    )
}

const HobbiesInterests = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.pageHeaderText}>Hobbies & Interests</Text>
        </View>
    )
}

const YourStory = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.pageHeaderText}>Your Story</Text>
        </View>
    )
}

const About = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.pageHeaderText}>About CwmpasOT</Text>
        </View>
    )
}

const Stack = createStackNavigator();
const Navigator = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen
                    name={'Patient Directory'}
                    component={PatientDirectory}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'Add Patient'}
                    component={AddPatient}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'Patient Profile'}
                    component={PatientProfile}
                    options={({ route }: { route: any }) => ({
                        title: route.params.name,
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    })}
                />
                <Stack.Screen
                    name={'Daily Activities'}
                    component={DailyActivities}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'Hobbies & Interests'}
                    component={HobbiesInterests}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'Your Story'}
                    component={YourStory}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'About CwmpasOT'}
                    component={About}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;

const styles = StyleSheet.create({
    patientsContainer: {
        backgroundColor: COLORS.textContainer,
        borderRadius: 10,
    },
    patientButton: {
        backgroundColor: COLORS.purpleSoft,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },

    functionalityDescriptionContainer: {
        borderRadius: 10,
        backgroundColor: COLORS.textContainer,
        padding: 10,
        marginTop: 10,
    },
})