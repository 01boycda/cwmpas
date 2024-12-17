import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

import * as SQLite from "expo-sqlite";

import { COLORS, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, Patient, ScreenNavigationProp } from "../setters/types";

const PatientDirectoryButton = ({ patient, nav }: { patient: Patient, nav: ScreenNavigationProp }) => {
    const deletePatient = async () => {
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        await db.runAsync('DELETE FROM patients WHERE id = $value', { $value: patient.id });
        console.log(patient.firstName, "deleted");
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                style={[styles.patientButton, { flex: 9 }]}
                onPress={() => patient.fLevel === "Finish Assessment" ? nav.navigate("FunctionalityTest", { patient: patient }) : nav.navigate("PatientProfile", { patient: patient })}>
                <Text style={FONTSTYLES.buttonText}>{patient.firstName} {patient.lastName}</Text>
                <Text style={[FONTSTYLES.lightText, { textAlign: "center" }]}>{patient.fLevel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.patientButton, { flex: 1, backgroundColor: 'red' }]}
                onPress={deletePatient}>
                <Entypo name="circle-with-cross" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default PatientDirectoryButton;

const styles = StyleSheet.create({
    patientButton: {
        backgroundColor: COLORS.purpleSoft,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
})