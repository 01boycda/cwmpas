import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";
import ActivityButton from "../components/ActivityButton";

const DailyActivities: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <View style={globalStyles.pageContainer}>
            <ActivityButton navigation={navigation} patient={patient} activity={"Cooking"} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Dressing"} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Eating"} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Household Chores"} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Washing"} />
        </View>
    )
}

export default DailyActivities;