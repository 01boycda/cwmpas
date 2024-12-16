import React, { useState } from "react";
import { Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const AddPatient = (props: any) => {
    const nav = props.navigation;

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const [dob, setDob] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const toggleDatePicker = () => {
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

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.inputHeaderText}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setFirstName}
                placeholder="Tap"
                placeholderTextColor={COLORS.purpleSoft}
                cursorColor={COLORS.purpleDark}
            />

            <Text style={FONTSTYLES.inputHeaderText}>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setLastName}
                placeholder="Tap"
                placeholderTextColor={COLORS.purpleSoft}
                cursorColor={COLORS.purpleDark}
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
        </View >
    )
}

export default AddPatient;

const styles = StyleSheet.create({
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    datePickerContainer: {
        backgroundColor: COLORS.purpleLight,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
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