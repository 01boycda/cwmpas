import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles, COLORS, FONTSTYLES } from '../styles';
import { Patient, ScreenNavigationProp } from '../types';


const PatientDirectory: React.FC = () => {
    const nav = useNavigation<ScreenNavigationProp>();

    const [patients, setPatients] = useState<Patient[]>([
        { id: '0', firstName: 'John', lastName: 'Doe', level: 1, },
        { id: '1', firstName: 'Jane', lastName: 'Doe', level: 2, },
        { id: '2', firstName: 'David', lastName: 'Jackson', level: 3, },
    ])

    useFocusEffect(() => {
        console.log('Getting patients list');
    });

    return (
        <LinearGradient
            colors={[COLORS.purpleLight, COLORS.purpleLighter]}
            style={globalStyles.pageContainer}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <ScrollView style={styles.patientsContainer}>
                {patients ? patients.map(patient => {
                    return (
                        <TouchableOpacity
                            key={patient.id}
                            style={styles.patientButton}
                            onPress={() => nav.navigate("PatientProfile", { patient: patient })}>
                            <Text style={FONTSTYLES.buttonText}>{patient.firstName} {patient.lastName}</Text>
                            <Text style={[FONTSTYLES.lightText, { textAlign: 'center' }]}>Patient Level: {patient.level}</Text>
                        </TouchableOpacity>
                    )
                }) : <Text>No Patients Found</Text>}
            </ScrollView>
            <View>
                <TouchableOpacity style={globalStyles.button} onPress={() => nav.navigate("AddPatient")}>
                    <Text style={FONTSTYLES.buttonText}>Add Patient</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default PatientDirectory;

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
})