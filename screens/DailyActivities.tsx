import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";

const DailyActivities: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <View style={globalStyles.pageContainer}>
            <TouchableOpacity
                style={[globalStyles.button, { flex: 1, marginTop: 0 }]}
                onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: "Cooking" })}
            >
                <Text style={FONTSTYLES.buttonText}>Cooking</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { flex: 1 }]}
                onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: "Dressing" })}>
                <Text style={FONTSTYLES.buttonText}>Dressing</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { flex: 1 }]}
                onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: "Eating" })}>
                <Text style={FONTSTYLES.buttonText}>Eating</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { flex: 1 }]}
                onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: "Household Chores" })}>
                <Text style={FONTSTYLES.buttonText}>Household Chores</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { flex: 1 }]}
                onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: "Washing" })}>
                <Text style={FONTSTYLES.buttonText}>Washing</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DailyActivities;