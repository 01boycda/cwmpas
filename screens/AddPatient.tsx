import React, { useState } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, Patient, ScreenNavigationProp } from "../setters/types";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import * as SQLite from "expo-sqlite";

const AddPatient = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    // Name Input Vars
    const [firstName, setFirstName] = useState<string>("");
    const [middleNames, setMiddleNames] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");


    // Date Picker Vars
    const [dob, setDob] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const toggleDatePicker = () => {
        Keyboard.dismiss();
        setShowPicker(!showPicker);
    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const { type } = event;
        if (type === "set" && selectedDate) {
            setDate(selectedDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setDob(selectedDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setDob(date.toDateString());
        toggleDatePicker();
    }


    // SQL
    const addPatient = async () => {
        console.log("Opening DB");
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        
        let joined = new Date().toDateString(); 
        let lastAssessment = new Date(0).toDateString(); 
        console.log("Joined:", joined, "Last Assessment:", lastAssessment);

        let updatedDB = await db.runAsync(`INSERT INTO patients (firstName, middleNames, lastName, dob, joined, fScore, fLevel, lastAssessment, cookingLevel, dressingLevel, eatingLevel, choresLevel, washingLevel, readingLevel, communicationLevel, socialisingLevel, leisureLevel, physicalLevel, cognitiveLevel) VALUES ('${firstName}', '${middleNames}', '${lastName}', '${dob}', '${joined}', 0, 'Finish Assessment', '${lastAssessment}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);`);
        console.log("Last Patient ID:", updatedDB.lastInsertRowId);

        let newPatient: Patient = {
            id: updatedDB.lastInsertRowId,
            firstName: firstName,
            middleNames: middleNames,
            lastName: lastName,
            dob: dob,

            joined: new Date().toDateString(),
            fScore: 0,
            fLevel: "Finish Assessment",
            lastAssessment: new Date(0).toDateString(),

            cookingLevel: 0,
            dressingLevel: 0,
            eatingLevel: 0,
            choresLevel: 0,
            washingLevel: 0,
            readingLevel: 0,
            communicationLevel: 0,
            socialisingLevel: 0,
            leisureLevel: 0,
            physicalLevel: 0,
            cognitiveLevel: 0
        }

        navigation.navigate("FunctionalityTest", { patient: newPatient });
    }


    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.inputHeaderText}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setFirstName}
                placeholder="Tap"
                placeholderTextColor={COLORS.purpleSoft}
                selectionColor={COLORS.purpleDark}
            />

            <Text style={FONTSTYLES.inputHeaderText}>Middle Names</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setMiddleNames}
                placeholder="Tap"
                placeholderTextColor={COLORS.purpleSoft}
                cursorColor={COLORS.purpleDark}
                selectionColor={COLORS.purpleDark}
            />

            <Text style={FONTSTYLES.inputHeaderText}>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setLastName}
                placeholder="Tap"
                placeholderTextColor={COLORS.purpleSoft}
                cursorColor={COLORS.purpleDark}
                selectionColor={COLORS.purpleDark}
            />

            <Text style={FONTSTYLES.inputHeaderText}>Date of Birth</Text>
            {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Tap"
                        value={dob}
                        placeholderTextColor={COLORS.purpleSoft}
                        editable={false}
                        onPressIn={toggleDatePicker}
                    />
                </Pressable>
            )}
            {showPicker && (
                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChange}
                        textColor={COLORS.purpleDark}
                        style={styles.datePicker}
                    />
                    {Platform.OS === "ios" && (
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
                                <Text style={[styles.datePickerButtonText, { color: COLORS.purpleSoft }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.datePickerButton} onPress={confirmIOSDate}>
                                <Text style={[styles.datePickerButtonText, { color: COLORS.purpleStrong }]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            )}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    disabled={firstName === "" || lastName === "" || dob === ""}
                    style={(firstName === "" || lastName === "" || dob === "") ? globalStyles.buttonDisabled : globalStyles.button}
                    onPress={addPatient}>
                    <Text style={FONTSTYLES.buttonText}>Start Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddPatient;

const styles = StyleSheet.create({
    datePicker: {
        height: 120,
    },
    datePickerContainer: {
        backgroundColor: COLORS.purpleLight,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        position: "absolute",
        alignSelf: "center",
        marginTop: 20,

    },
    datePickerButtonText: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    datePickerButton: {
        backgroundColor: COLORS.purpleLighter,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 14,
    }
})