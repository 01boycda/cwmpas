import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';

import { globalStyles, COLORS, FONTSTYLES } from "../styles";
import { EditScreenRouteProp, ScreenNavigationProp } from "../types";

const PatientProfile = (props: any) => {
    const route = useRoute<EditScreenRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <>
            <View style={globalStyles.pageContainer}>
                <Text style={FONTSTYLES.darkText}>Patient level: {patient?.level.toString()}</Text>

                <ScrollView style={styles.functionalityDescriptionContainer}>
                    <Text style={FONTSTYLES.darkText}>This is where the functionality description would go</Text>
                </ScrollView>

                <TouchableOpacity style={globalStyles.button}>
                    <Text style={FONTSTYLES.buttonText}>Daily Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button}>
                    <Text style={FONTSTYLES.buttonText}>Hobbies & Interests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button}>
                    <Text style={FONTSTYLES.buttonText}>Your Story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button}>
                    <Text style={FONTSTYLES.buttonText}>About CwmpasOT</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default PatientProfile;

const styles = StyleSheet.create({
    functionalityDescriptionContainer: {
        borderRadius: 10,
        backgroundColor: COLORS.textContainer,
        padding: 10,
        marginTop: 10,
    },
})