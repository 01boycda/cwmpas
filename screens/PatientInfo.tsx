import React, { useState } from "react";
import { ColorValue, Keyboard, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, Patient, PatientRouteProp, ScreenNavigationProp } from "../setters/types";

const PatientInfo = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const [patient, setPatient] = useState<Patient>(route.params.patient);


    // Name Input Vars
    const [firstName, setFirstName] = useState<string>(patient.firstName);
    const [middleNames, setMiddleNames] = useState<string>(patient.middleNames ? patient.middleNames : "");
    const [lastName, setLastName] = useState<string>(patient.lastName);

    // Date Picker Vars
    const [dob, setDob] = useState<string>(patient.dob);
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const toggleDatePicker = () => {
        if (editEnabled) {
            Keyboard.dismiss();
            setShowPicker(!showPicker);
        }
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

    // Functionality
    const retakeTest = () => {
        navigation.navigate("FunctionalityTest", { patient: patient });
    }

    const ActivitySection = ({ category, colour }: { category: string, colour: ColorValue }) => {
        const key = `${category}Level` as keyof Patient;
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: colour }}>
                <Text style={styles.functionalitySection}>{category.charAt(0).toUpperCase() + category.slice(1)}:</Text>
                <Text style={styles.functionalitySection}>{patient[key]}</Text>
            </View>
        );
    }

    // Edit profile
    const [editEnabled, setEditEnabled] = useState<boolean>(false);

    const saveProfile = async () => {
        const db: SQLite.SQLiteDatabase = await SQLite.openDatabaseAsync(DATABASE_NAME);
        await db.runAsync(`UPDATE patients SET firstName = ? WHERE id = ?`, firstName, patient.id);
        await db.runAsync(`UPDATE patients SET middleNames = ? WHERE id = ?`, middleNames, patient.id);
        await db.runAsync(`UPDATE patients SET lastName = ? WHERE id = ?`, lastName, patient.id);
        await db.runAsync(`UPDATE patients SET dob = ? WHERE id = ?`, dob, patient.id);

        let updatedPatient = {
            ...patient,
            firstName: firstName,
            middleNames: middleNames,
            lastName: lastName,
            dob: dob,
        };

        setPatient(updatedPatient);
        setEditEnabled(false);
    }

    // Delete patient
    const [deleting, setDeleting] = useState<boolean>(false);

    const deletePatient = async () => {
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        await db.runAsync('DELETE FROM patients WHERE id = $value', { $value: patient.id });

        navigation.popToTop();
    }

    return (
        <ScrollView style={{ backgroundColor: COLORS.purpleLight, }}>
            <View style={globalStyles.pageContainer}>
                <Text style={FONTSTYLES.inputHeaderText}>First Name</Text>
                <TextInput
                    editable={editEnabled}
                    style={globalStyles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    cursorColor={COLORS.purpleDark}
                    selectionColor={COLORS.purpleDark}
                />

                {middleNames !== "" && (
                    <>
                        <Text style={FONTSTYLES.inputHeaderText}>Middle Names</Text>
                        <TextInput
                            editable={editEnabled}
                            style={globalStyles.input}
                            value={middleNames}
                            onChangeText={setMiddleNames}
                            cursorColor={COLORS.purpleDark}
                            selectionColor={COLORS.purpleDark}
                        />
                    </>
                )}

                <Text style={FONTSTYLES.inputHeaderText}>Last Name</Text>
                <TextInput
                    editable={editEnabled}
                    style={globalStyles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    cursorColor={COLORS.purpleDark}
                    selectionColor={COLORS.purpleDark}
                />

                <Text style={FONTSTYLES.inputHeaderText}>Date of Birth</Text>
                <Pressable onPress={toggleDatePicker}>
                    <TextInput
                        editable={false}
                        style={globalStyles.input}
                        value={dob}
                        placeholderTextColor={COLORS.purpleSoft}
                        onPressIn={toggleDatePicker}
                    />
                </Pressable>

                <View style={styles.divider} />

                {patient.fLevel === "Finish Assessment" ?

                    <TouchableOpacity
                        onPress={retakeTest}
                        style={globalStyles.button}>
                        <Text style={[FONTSTYLES.buttonText, { color: COLORS.warning }]}>Finish Test</Text>
                    </TouchableOpacity>

                    :

                    <>
                        <Text style={FONTSTYLES.inputHeaderText}>Functionality Level</Text>
                        <View style={[globalStyles.input, styles.fBarContainer]}>
                            <View style={[styles.fBar, { width: `${100 - patient.fScore * 3.333}%` }]} />
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", height: 20 }}>
                                <View style={styles.fDivider} />
                                <View style={styles.fDivider} />
                                <View style={styles.fDivider} />
                            </View>
                        </View>
                        <View style={styles.fDescContainer}>
                            <Text style={styles.fSectionDesc}>Full Assistance</Text>
                            <Text style={styles.fSectionDesc}>Step-by-Step Guidance</Text>
                            <Text style={styles.fSectionDesc}>Some Support</Text>
                            <Text style={styles.fSectionDesc}>Prompting</Text>
                        </View>

                        <Text style={FONTSTYLES.inputHeaderText}>Last Assessment</Text>
                        <TextInput
                            editable={false}
                            style={globalStyles.input}
                            value={patient.lastAssessment}
                            cursorColor={COLORS.purpleDark}
                            selectionColor={COLORS.purpleDark}
                        />

                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <ActivitySection category="cooking" colour={COLORS.purpleLighter} />
                                <ActivitySection category="dressing" colour={COLORS.purpleLight} />
                                <ActivitySection category="eating" colour={COLORS.purpleLighter} />
                                <ActivitySection category="chores" colour={COLORS.purpleLight} />
                                <ActivitySection category="washing" colour={COLORS.purpleLighter} />
                                <ActivitySection category="cognitive" colour={COLORS.purpleLight} />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <ActivitySection category="reading" colour={COLORS.purpleLighter} />
                                <ActivitySection category="communication" colour={COLORS.purpleLight} />
                                <ActivitySection category="socialising" colour={COLORS.purpleLighter} />
                                <ActivitySection category="leisure" colour={COLORS.purpleLight} />
                                <ActivitySection category="physical" colour={COLORS.purpleLighter} />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={retakeTest}
                            style={globalStyles.button}>
                            <Text style={FONTSTYLES.buttonText}>Retake Test</Text>
                        </TouchableOpacity>
                    </>
                }

                <View style={styles.divider} />

                <Text style={FONTSTYLES.inputHeaderText}>Profile Created</Text>
                <TextInput
                    editable={false}
                    style={globalStyles.input}
                    value={patient.joined}
                    cursorColor={COLORS.purpleDark}
                    selectionColor={COLORS.purpleDark}
                />

                {editEnabled && (
                    <TouchableOpacity
                        onPress={saveProfile}
                        style={[globalStyles.button, { backgroundColor: COLORS.purpleStrong }]}>
                        <Text style={FONTSTYLES.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                )}
                {!editEnabled && (
                    <TouchableOpacity
                        onPress={() => setEditEnabled(true)}
                        style={globalStyles.button}>
                        <Text style={FONTSTYLES.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => setDeleting(true)}
                    style={[globalStyles.button, globalStyles.buttonDanger]}>
                    <Text style={FONTSTYLES.buttonText}>Delete Profile</Text>
                </TouchableOpacity>

                {showPicker && (
                    <View style={globalStyles.datePickerContainer}>
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
                                    <Text style={[FONTSTYLES.datePickerButtonText, { color: COLORS.purpleSoft }]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={globalStyles.datePickerButton} onPress={confirmIOSDate}>
                                    <Text style={[FONTSTYLES.datePickerButtonText, { color: COLORS.purpleStrong }]}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleting}
                    onRequestClose={() => {
                        setDeleting(!deleting);
                    }}>
                    <View style={{ flex: 1 }}>
                        <View style={globalStyles.alertMessageContainer}>
                            <Text style={FONTSTYLES.subheaderText}>Deleting Profile</Text>
                            <Text style={[FONTSTYLES.textBox, { textAlign: "center" }]}>Once completed all patient data will be permanently deleted</Text>
                            <TouchableOpacity
                                onPress={deletePatient}
                                style={[globalStyles.button, globalStyles.buttonDanger]}>
                                <Text style={FONTSTYLES.buttonText}>Delete Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setDeleting(false)}
                                style={[globalStyles.button]}>
                                <Text style={FONTSTYLES.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </View>
        </ScrollView>
    )
}

export default PatientInfo;

const styles = StyleSheet.create({
    divider: {
        borderColor: COLORS.purpleSoft,
        borderRadius: 4,
        borderWidth: 4,

        marginVertical: 10,
    },
    fBarContainer: {
        height: 28,
        padding: 0,
        marginTop: 5,
    },
    fBar: {
        backgroundColor: COLORS.purpleStrong,
        borderRadius: 5,
        height: 20,
        position: "absolute",
    },
    fDivider: {
        backgroundColor: COLORS.purpleDark,
        width: 4,
        position: "relative",
    },
    fDescContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    fSectionDesc: {
        flex: 1,
        fontSize: 11,
        textAlign: "center",
    },
    functionalitySection: {
        textAlign: "left",
        fontSize: 18,

        color: COLORS.purpleDark,
        fontFamily: 'Roboto-Bold',
    }
})