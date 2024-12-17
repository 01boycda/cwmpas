import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { Activity, ActivityRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";

const ActivityPage: React.FC = (props: any) => {
    // Navigation settings
    const route = useRoute<ActivityRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Load activity data from Json
    const customData = require('../data/activities.json');
    const activity = customData[route.params.activityName];

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
                <Text style={FONTSTYLES.textBox}>{activity.Prompting[instructionNum]}</Text>
            </ScrollView>

            <View style={ styles.buttonsContainer }>
                <TouchableOpacity style={styles.arrowButton}
                    onPress={() => nextInstruction("down")} >
                    <FontAwesome name="arrow-left" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.arrowButton }>
                    <FontAwesome name="pencil-square-o" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
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
        height: '17%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    arrowButton: {
        aspectRatio: 1,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,

        alignItems: 'center',
        justifyContent: 'center',
    }
})