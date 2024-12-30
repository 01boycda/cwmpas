import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";

import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, Patient, ScreenNavigationProp } from "../setters/types";

// Custom components
import PatientDirectoryButton from "../components/PatientDirectoryButton";


const PatientDirectory: React.FC = () => {
    // Navigation
    const navigation = useNavigation<ScreenNavigationProp>();
    const [patients, setPatients] = useState<Patient[]>([]);

    // Patient Data
    const loadPatientData = async () => {
        try {
            console.log("Loading...");
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

            // Create table if not existing
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS patients (
                    id INTEGER PRIMARY KEY NOT NULL,
                    firstName TEXT NOT NULL,
                    middleNames TEXT,
                    lastName TEXT NOT NULL,
                    dob TEXT NOT NULL,
                    joined TEXT NOT NULL,
                    fScore INTEGER NOT NULL,
                    fLevel TEXT NOT NULL,
                    lastAssessment TEXT NOT NULL,
                    cookingLevel INTEGER NOT NULL,
                    dressingLevel INTEGER NOT NULL,
                    eatingLevel INTEGER NOT NULL,
                    choresLevel INTEGER NOT NULL,
                    washingLevel INTEGER NOT NULL,
                    readingLevel INTEGER NOT NULL,
                    communicationLevel INTEGER NOT NULL,
                    socialisingLevel INTEGER NOT NULL,
                    leisureLevel INTEGER NOT NULL,
                    physicalLevel INTEGER NOT NULL,
                    cognitiveLevel INTEGER NOT NULL);
                `);


            const allRows = await db.getAllAsync('SELECT * FROM patients') as Patient[];
            const newPatientList: Patient[] = allRows.map((row) => ({
                id: row.id,
                firstName: row.firstName,
                middleNames: row.middleNames,
                lastName: row.lastName,
                dob: row.dob,

                joined: row.joined,
                fScore: row.fScore,
                fLevel: row.fLevel,
                lastAssessment: row.lastAssessment,

                cookingLevel: row.cookingLevel,
                dressingLevel: row.dressingLevel,
                eatingLevel: row.eatingLevel,
                choresLevel: row.choresLevel,
                washingLevel: row.washingLevel,
                readingLevel: row.readingLevel,
                communicationLevel: row.communicationLevel,
                socialisingLevel: row.socialisingLevel,
                leisureLevel: row.leisureLevel,
                physicalLevel: row.physicalLevel,
                cognitiveLevel: row.cognitiveLevel
            }));

            setPatients(newPatientList);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            loadPatientData();
            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <LinearGradient
            colors={[COLORS.purpleLight, COLORS.purpleLighter]}
            style={globalStyles.pageContainer}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            
            {patients.length > 0 ?

                <ScrollView style={globalStyles.scrollContainer}>
                    <View style={{ marginBottom: 6 }}>
                        {patients.sort((a, b) => a.firstName.localeCompare(b.firstName))
                            .map(patient => {
                                return <PatientDirectoryButton key={patient.id} patient={patient} nav={navigation} />
                            })}
                    </View>
                </ScrollView>

                :

                <View style={[globalStyles.scrollContainer, { alignContent: "center", justifyContent: 'center' }]}>
                    <Text style={FONTSTYLES.subheaderText}>Please Add Patient</Text>
                </View>

            }

            <View>
                <TouchableOpacity style={[globalStyles.button, { marginBottom: 0 }]} onPress={() => navigation.navigate("AddPatient")}>
                    <Text style={FONTSTYLES.buttonText}>Add Patient</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default PatientDirectory;

