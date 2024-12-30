import React, { act, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SQLite from "expo-sqlite";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { Activity, ActivityRouteProp, DATABASE_NAME, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";

const ActivityPage: React.FC = (props: any) => {
    // Navigation settings
    const route = useRoute<ActivityRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Load activity data from Json
    const customData = require('../data/activities.json');
    const activity = customData[route.params.activityName];

    // Is favourite
    const [favourite, setFavourite] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{ margin: 20 }}
                    onPress={activity.activityCategory === "Daily" ?
                        () => navigation.goBack() :
                        () => navigation.popTo("Hobbies", { patient: patient, category: favourite ? "Favourites" : activity["activityCategory"]})}>
                    <AntDesign name="left" size={40} color={COLORS.purpleLighter} />
                </TouchableOpacity>),
        });
    }, [navigation]);

    const checkIfFavourite = async () => {
        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
            const firstRow: { "activity": string }[] | null = await db.getFirstAsync('SELECT activity FROM hobbies WHERE patient_id = ? AND activity = ?', patient.id, activity.activityName);

            firstRow === null ? setFavourite(false) : setFavourite(true);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    const handleFavourite = async () => {
        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

            if (!favourite) {
                await db.runAsync(`INSERT INTO hobbies (patient_id, activity) VALUES ('${patient.id}', '${activity.activityName}');`);
            } else {
                await db.runAsync('DELETE FROM hobbies WHERE patient_id = $id AND activity = $act', { $id: patient.id, $act: activity.activityName });
            }

            setFavourite(!favourite);
            console.log(`${patient.firstName} ${favourite ? "unfavourited" : "favourited"} ${activity.activityName}`);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    // Dropdown variables
    const [instructionNum, setInstructionNum] = useState<number>(0);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [items, setItems] = useState([
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

    // Instruction handlers
    const nextInstruction = (dir: "up" | "down") => {
        let num = instructionNum;
        dir === "up" ? num = num + 1 : num = num - 1;
        handleInstructionNum(num);
    }

    const handleInstructionNum = (num: number) => {
        if (num > 10 || num < 0) num = (num + 11) % 11;
        setInstructionNum(num);
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            checkIfFavourite();
            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <View style={globalStyles.pageContainer}>
            <DropDownPicker
                style={globalStyles.dropdown}
                textStyle={FONTSTYLES.dropdownText}
                open={openDropdown}
                value={instructionNum}
                items={items}
                setOpen={setOpenDropdown}
                setValue={setInstructionNum}
                setItems={setItems}
                placeholder={"What I Can Do"}
            />

            <ScrollView style={globalStyles.scrollContainer}>
                <Text style={FONTSTYLES.textBox}>{activity[patient.fLevel][instructionNum]}</Text>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => nextInstruction("down")} >
                    <FontAwesome name="arrow-left" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.arrowButton}>
                    <FontAwesome name="pencil-square-o" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                {activity.activityCategory !== "Daily" && (
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={handleFavourite} >
                        <FontAwesome name={favourite ? "star" : "star-o"} size={60} color={COLORS.purpleLighter} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => nextInstruction("up")} >
                    <FontAwesome name="arrow-right" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
            </View>
        </View>
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
    }
})