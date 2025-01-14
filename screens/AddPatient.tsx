import React, { useState } from "react";
import { Keyboard, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { DATABASE_NAME, INPUT_PLACEHOLDER } from "../setters/constantValues";
import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { Patient, ScreenNavigationProp } from "../setters/types";
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
                setDob(selectedDate.toLocaleDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setDob(date.toLocaleDateString());
        toggleDatePicker();
    }


    // SQL
    const addPatient = async () => {
        console.log("Opening DB");
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

        let joined = new Date().toLocaleDateString();
        let lastAssessment = new Date(0).toLocaleDateString();
        console.log("Joined:", joined, "Last Assessment:", lastAssessment);

        try {
            let updatedDB = await db.runAsync(`INSERT INTO patients (firstName, middleNames, lastName, dob, joined, fScore, fLevel, lastAssessment, cookingLevel, dressingLevel, eatingLevel, choresLevel, washingLevel, readingLevel, communicationLevel, socialisingLevel, leisureLevel, physicalLevel, cognitiveLevel, siblings, married) VALUES ('${firstName}', '${middleNames}', '${lastName}', '${dob}', '${joined}', 0, 'Finish Assessment', '${lastAssessment}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);`);

            console.log("Last Patient ID:", updatedDB.lastInsertRowId);

            let newPatient: Patient = {
                id: updatedDB.lastInsertRowId,
                firstName: firstName,
                middleNames: middleNames,
                lastName: lastName,
                dob: dob,

                joined: new Date().toLocaleDateString(),
                fScore: 0,
                fLevel: "Finish Assessment",
                lastAssessment: new Date(0).toLocaleDateString(),

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
                cognitiveLevel: 0,

                siblings: false,
                married: false,
            }

            navigation.navigate("FunctionalityTest", { patient: newPatient });
        } catch (e) {
            console.log("Error adding patient:\n", e);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.pageContainer}>
                <Text style={FONTSTYLES.inputHeaderText}>First Name</Text>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={setFirstName}
                    placeholder={INPUT_PLACEHOLDER}
                    returnKeyType="done"
                    placeholderTextColor={COLORS.purpleSoft}
                    selectionColor={COLORS.purpleDark}
                />

                <Text style={FONTSTYLES.inputHeaderText}>Middle Names</Text>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={setMiddleNames}
                    placeholder={INPUT_PLACEHOLDER}
                    returnKeyType="done"
                    placeholderTextColor={COLORS.purpleSoft}
                    selectionColor={COLORS.purpleDark}
                />

                <Text style={FONTSTYLES.inputHeaderText}>Last Name</Text>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={setLastName}
                    placeholder={INPUT_PLACEHOLDER}
                    returnKeyType="done"
                    placeholderTextColor={COLORS.purpleSoft}
                    selectionColor={COLORS.purpleDark}
                />

                <Text style={FONTSTYLES.inputHeaderText}>Date of Birth</Text>
                <Pressable onPress={toggleDatePicker}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder={INPUT_PLACEHOLDER}
                        value={dob}
                        placeholderTextColor={COLORS.purpleSoft}
                        editable={false}
                        onPressIn={toggleDatePicker}
                    />
                </Pressable>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showPicker}
                    onRequestClose={() => {
                        setShowPicker(!showPicker);
                    }}>
                    <View style={globalStyles.hoverContainer}>
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                            textColor={COLORS.purpleDark}
                            style={globalStyles.datePicker}
                        />
                        {Platform.OS === "ios" && (
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity style={globalStyles.datePickerButton} onPress={toggleDatePicker}>
                                    <Text style={[FONTSTYLES.datePickerButtonText, { color: COLORS.purpleSoft }]}>cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={globalStyles.datePickerButton} onPress={confirmIOSDate}>
                                    <Text style={[FONTSTYLES.datePickerButtonText, { color: COLORS.purpleStrong }]}>done</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                </Modal>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        disabled={firstName === "" || lastName === "" || dob === ""}
                        style={(firstName === "" || lastName === "" || dob === "") ? [globalStyles.button, globalStyles.buttonDisabled] : globalStyles.button}
                        onPress={addPatient}>
                        <Text style={FONTSTYLES.buttonText}>Create Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}

export default AddPatient;