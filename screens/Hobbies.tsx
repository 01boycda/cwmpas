import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";
import ActivityButton from "../components/ActivityButton";

const Hobbies: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <View style={globalStyles.pageContainer}>
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: COLORS.purpleStrong }]}
                onPress={() => alert("Add Hobby Button Pressed")}
            >
                <Text style={FONTSTYLES.buttonText}>Add Hobby</Text>
            </TouchableOpacity>
            <ScrollView style={globalStyles.scrollContainer}>
                {patient.hobbies ? patient.hobbies.map((hobby, i) => {
                    return (
                        <ActivityButton key={i} navigation={navigation} patient={patient} activity={hobby} />
                    )
                }) : <Text>No Hobbies Found</Text>}
            </ScrollView>
        </View>
    )
}

export default Hobbies;

