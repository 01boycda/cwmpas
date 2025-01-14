import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import { DATABASE_NAME } from "../setters/constantValues";
import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { Patient, ScreenNavigationProp } from "../setters/types";

// Custom components
import PatientDirectoryButton from "../components/PatientDirectoryButton";

const PatientDirectory: React.FC = () => {
    // Navigation
    const navigation = useNavigation<ScreenNavigationProp>();
    const [patients, setPatients] = useState<Patient[]>([]);

    const loadPatientData = async () => {
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        try {
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
                    cognitiveLevel INTEGER NOT NULL,
                    preferredLanguage TEXT,
                    birthplace TEXT,
                    familyBackground TEXT,
                    nicknames TEXT,
                    nicknameOrigin TEXT,
                    father TEXT,
                    mother TEXT,
                    parentsMeet TEXT,
                    siblings INTEGER NOT NULL,
                    siblingsLike TEXT,
                    siblingsRoom TEXT,
                    siblingsMemory TEXT,
                    childhoodLived TEXT,
                    childhoodFriends TEXT,
                    childhoodMemory TEXT,
                    friendsPlay TEXT,
                    school TEXT,
                    favSubject TEXT,
                    favTeacher TEXT,
                    schoolUniform TEXT,
                    schoolMemory TEXT,
                    pets TEXT,
                    petName TEXT,
                    petMemory TEXT,
                    personalValues TEXT,
                    religion TEXT,
                    likeSmell TEXT,
                    likeFood TEXT,
                    likeSeason TEXT,
                    likeSaying TEXT,
                    likeJoke TEXT,
                    likeShow TEXT,
                    likeRadio TEXT,
                    likeMusic TEXT,
                    likeHobby TEXT,
                    likeSport TEXT,
                    likeTime TEXT,
                    dislikeSmell TEXT,
                    dislikeFood TEXT,
                    dislikeSeason TEXT,
                    dislikeShow TEXT,
                    dislikeRadio TEXT,
                    dislikeMusic TEXT,
                    dislikeSport TEXT,
                    dislikeTime TEXT,
                    routineMorning TEXT,
                    routineLunch TEXT,
                    routineAfternoon TEXT,
                    routineEvening TEXT,
                    routineNight TEXT,
                    married INTEGER NOT NULL,
                    marriedWho TEXT,
                    marriedWhen TEXT,
                    marriedAt TEXT,
                    marriedMemory TEXT,
                    partnerWho TEXT,
                    partnerMet TEXT,
                    childrenNames TEXT,
                    childrenNameReasons TEXT,
                    childrenLikeYou TEXT,
                    childrenStories TEXT,
                    childrenActivities TEXT,
                    grandchildrenNames TEXT,
                    grandchildrenLikeYou TEXT,
                    grandchildrenStories TEXT,
                    grandchildrenActivities TEXT,
                    jobFirst TEXT,
                    jobStartAge NUMBER,
                    jobPay TEXT,
                    jobFav TEXT,
                    jobYears NUMBER,
                    jobOthers TEXT,
                    jobMemory TEXT,
                    retiredJob TEXT,
                    retiredYears NUMBER,
                    retiredParty TEXT,
                    retiredFeelings TEXT,
                    retiredDid TEXT,
                    friends TEXT,
                    friendsThen TEXT,
                    friendsMeet TEXT,
                    friendsMemory TEXT,
                    favHobbies TEXT,
                    clubs TEXT,
                    tripFav TEXT,
                    tripWhen TEXT,
                    tripBestPart TEXT,
                    tripWith TEXT,
                    otherTrips TEXT,
                    firstDrink TEXT,
                    firstDate TEXT,
                    firstDance TEXT,
                    firstKiss TEXT,
                    firstLove TEXT,
                    homeFav TEXT,
                    homeBecause TEXT,
                    homeWhat TEXT,
                    homeGarden TEXT,
                    homeDecorate TEXT,
                    traditions TEXT,
                    familyTrip TEXT,
                    pocketMoney NUMBER,
                    newYear TEXT,
                    mealTime TEXT,
                    weekends TEXT,
                    carsPassed NUMBER,
                    carsFirst TEXT,
                    carsFav TEXT,
                    carsPlace TEXT,
                    eventBig TEXT,
                    eventCovid TEXT,
                    eventTowers TEXT,
                    eventBrexit TEXT,
                    eventKennedy TEXT,
                    eventMoon TEXT,
                    eventPhone TEXT,
                    eventBerlin TEXT,
                    eventChernobyl TEXT,
                    eventGulf TEXT);`);
        } catch (e) {
            console.log("Failed to create new table:\n", e)
        }

        try {
            const patientList = await db.getAllAsync('SELECT * FROM patients') as Patient[];
            setPatients(patientList);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            loadPatientData();
        }, [])
    );

    return (
        <LinearGradient
            style={globalStyles.pageContainer}
            colors={[COLORS.backgroundGradTop, COLORS.backgroundGradBottom]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>

            {patients.length > 0 ?

                <ScrollView style={globalStyles.scrollContainer}>
                    <View style={{ marginBottom: 6 }}>
                        {patients.sort((a, b) => a.firstName.localeCompare(b.firstName)).map(patient => {
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
                    <Text style={FONTSTYLES.buttonText}>Add User</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default PatientDirectory;

