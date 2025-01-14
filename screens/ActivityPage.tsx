import React, { act, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as SQLite from "expo-sqlite";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";


import { DATABASE_NAME } from "../setters/constantValues";
import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { ActivityRouteProp, ScreenNavigationProp } from "../setters/types";
import { ActivityBackButton } from "../components/HeaderButtons";
import { SafeAreaView } from "react-native-safe-area-context";

const ActivityPage: React.FC = (props: any) => {
    // Navigation settings
    const route = useRoute<ActivityRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Load activity data from Json
    const customData = require('../data/activities.json');
    const activity = customData[route.params.activityName];

    // Load activity notes
    const sectionScrollView = useRef<ScrollView>(null);
    const [currentNotes, setCurrentNotes] = useState<string>("");
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const loadNotes = async () => {
        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

            // Create table if not existing
            await db.execAsync(`
                        CREATE TABLE IF NOT EXISTS notes (
                            id INTEGER PRIMARY KEY NOT NULL,
                            patient_id INTEGER REFERENCES patients(id),
                            activity TEXT NOT NULL,
                            section NUMBER NOT NULL,
                            note TEXT NOT NULL);`
            );
            
            let noteData: { "note": string } | null = await db.getFirstAsync(`SELECT note FROM notes WHERE patient_id = ? AND activity = ? AND section = ?`, patient.id, activity.activityName, sectionNum);
            
            console.log(noteData);
            setCurrentNotes(noteData === null ? "" : noteData.note);
            console.log("Current notes:", currentNotes);
        } catch (e) {
            console.log("Failed to get note data:\n", e)
        }
    }

    // Save activity notes
    const saveNoteData = async (text: string) => {
        // Update database
        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
            await db.runAsync('DELETE FROM notes WHERE patient_id = $id AND activity = $act AND section = $section', { $id: patient.id, $act: activity.activityName, $section: sectionNum });
            await db.runAsync(`INSERT INTO notes (note, patient_id, activity, section) VALUES ('${text}', '${patient.id}', '${activity.activityName}', '${sectionNum}');`);
        } catch (e) {
            console.log("Unable to save answer:\n", e)
        }
    }

    const backFromNotes = () => {
        activity.activityCategory === "Daily" ?
            navigation.goBack() :
            navigation.popTo("Hobbies", { patient: patient, category: favourite ? "Favourites" : activity["activityCategory"] })
    }

    // Check if favourited
    const [favourite, setFavourite] = useState<boolean>(false);
    const checkIfFavourite = async () => {
        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
            const firstRow: { "activity": string }[] | null = await db.getFirstAsync('SELECT activity FROM hobbies WHERE patient_id = ? AND activity = ?', patient.id, activity.activityName);

            firstRow === null ? setFavourite(false) : setFavourite(true);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    // Dropdown variables
    const [sectionNum, setSectionNum] = useState<number>(route.params.section);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [items, setItems] = useState<{ label: string, value: number }[]>([
        { label: "What I Can Do", value: 0 },
        { label: "What I Need Help With", value: 1 },
        { label: "How to Prepare the Space", value: 2 },
        { label: "How to Support Me", value: 3 },
        { label: "Step-by-Step Instructions", value: 4 },
        { label: "Sensory Preferences", value: 5 },
        { label: "Managing Sensory Overload", value: 6 },
        { label: "How to Communicate with Me", value: 7 },
        { label: "Encouraging Me", value: 8 },
        { label: "Ending the Activity", value: 9 },
        { label: "What Comes Next", value: 10 }
    ]);

    // Info Menu
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [infoBox, setInfoBox] = useState<number>(0);
    const ActivityInfoButton = () => {
        return (
            <TouchableOpacity style={{ margin: 20 }} onPress={() => setShowInfo(!showInfo)}>
                {showInfo ?
                    <FontAwesome name="close" size={40} color={COLORS.purpleLighter} /> :
                    <MaterialCommunityIcons name="chat-question-outline" size={40} color={COLORS.purpleLighter} />
                }
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        loadNotes();
    }, [sectionNum])

    // Setup header buttons
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<ActivityBackButton patient={patient} activity={activity} favourite={favourite} />),
            headerRight: () => (<ActivityInfoButton />)
        });
        setInfoBox(0);
    }, [navigation, showInfo]);


    useFocusEffect(
        React.useCallback(() => {
            const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true));
            const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false));

            // Call functions directly

            // Cleanup on unmount
            return () => {
                keyboardDidHideListener.remove();
                keyboardDidShowListener.remove();
            };
        }, [checkIfFavourite]) // Include dependencies
    );


    return (
        <LinearGradient
            style={globalStyles.pageContainer}
            colors={[COLORS.backgroundGradTop, COLORS.backgroundGradBottom]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            {!keyboardVisible && (
                <DropDownPicker
                    open={openDropdown}
                    value={sectionNum}
                    items={items}
                    setOpen={setOpenDropdown}
                    setValue={setSectionNum}
                    setItems={setItems}
                    placeholder={"What I Can Do"}

                    style={globalStyles.dropdown}
                    dropDownContainerStyle={globalStyles.dropdownList}
                    selectedItemContainerStyle={globalStyles.dropdownSelected}
                    textStyle={FONTSTYLES.dropdownText}
                    selectedItemLabelStyle={{ color: COLORS.purpleLighter }}

                    ArrowDownIconComponent={() => <AntDesign name="down" size={30} />}
                    ArrowUpIconComponent={() => <AntDesign name="up" size={30} />}
                    showTickIcon={false}
                />
            )}

            <View style={{ flex: 1 }}>
                <ScrollView ref={sectionScrollView} style={globalStyles.scrollContainer}>
                    <Text style={FONTSTYLES.textBox}>{activity[patient.fLevel][sectionNum]}</Text>
                    <TextInput
                        multiline
                        placeholder="Add additional notes to section..."
                        defaultValue={currentNotes}

                        // Styles
                        style={styles.notesInput}
                        placeholderTextColor={COLORS.textContainerDark}
                        cursorColor={COLORS.purpleDark}
                        selectionColor={COLORS.purpleDark}

                        // Functions
                        onFocus={() => sectionScrollView.current?.scrollToEnd({animated: true})}
                        onChangeText={text => saveNoteData(text)}
                    />
                </ScrollView>

                {keyboardVisible && (
                    <View style={{ height: 290 }}>
                        <TouchableOpacity style={globalStyles.button} onPress={Keyboard.dismiss}>
                            <MaterialCommunityIcons name="keyboard-close" size={40} color={COLORS.purpleLight} />
                        </TouchableOpacity>
                    </View>
                )}

                <Slider
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    value={sectionNum}

                    onValueChange={value => setSectionNum(value)}

                    style={{ marginHorizontal: 10, height: 40 }}
                    minimumTrackTintColor={COLORS.purpleDark}
                    maximumTrackTintColor={COLORS.purpleLight}
                    thumbTintColor={COLORS.purpleLighter}
                />
            </View>

            <Modal animationType="fade" transparent={true} visible={showInfo} onRequestClose={() => { setShowInfo(!showInfo) }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ height: 80, flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={{ height: 80, width: 80, marginTop: 20 }}
                            onPress={backFromNotes}>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ height: 80, width: 80, marginTop: 20 }}
                            onPress={() => setShowInfo(false)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "#B8A2C770" }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                            <TouchableOpacity style={{ position: "absolute", left: Dimensions.get("screen").width / 2 - 20, top: 18 }} onPress={() => setInfoBox(infoBox === 1 ? 0 : 1)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "absolute", right: 60, top: 150 }} onPress={() => setInfoBox(infoBox === 2 ? 0 : 2)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "absolute", right: 60, bottom: 100 }} onPress={() => setInfoBox(infoBox === 3 ? 0 : 3)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "absolute", left: Dimensions.get("screen").width / 2 - 20, bottom: 6 }} onPress={() => setInfoBox(infoBox === 4 ? 0 : 4)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            {infoBox > 0 &&
                                (
                                    <View style={globalStyles.infoBox}>
                                        <Text style={FONTSTYLES.textBox}>
                                            {infoBox == 1 && "Use the dropdown box to select the desired Activity Section."}
                                            {infoBox == 2 && "Each Activity Section acts as a guide tailored to the user's Functionality Level."}
                                            {infoBox == 3 && "Add additional notes for each section as reminders."}
                                            {infoBox == 4 && "Quickly navigate between Activity Sections with the Slider."}
                                        </Text>
                                    </View>
                                )
                            }

                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

        </LinearGradient >
    );
}

export default ActivityPage;

export const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    arrowButton: {
        aspectRatio: 1,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,

        padding: 5,

        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        borderColor: COLORS.purpleSoft,
        backgroundColor: COLORS.purpleLight,
    },
    notesInput: {
        minHeight: 200,
        borderColor: COLORS.textContainerDark,
        borderRadius: 8,
        borderWidth: 2,
        padding: 10,

        backgroundColor: COLORS.textContainer,

        color: COLORS.black,
        fontSize: 24,
        fontFamily: 'Roboto',
        textAlign: 'left',
        textAlignVertical: "top",
    },
});