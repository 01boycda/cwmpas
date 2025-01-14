import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyles, COLORS } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";
import ActivityButton from "../components/ActivityButton";

const DailyActivities: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <LinearGradient
            style={globalStyles.pageContainer}
            colors={[COLORS.backgroundGradTop, COLORS.backgroundGradBottom]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <ActivityButton navigation={navigation} patient={patient} activity={"Cooking"} favourited={false} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Dressing"} favourited={false} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Eating"} favourited={false} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Household Chores"} favourited={false} />
            <ActivityButton navigation={navigation} patient={patient} activity={"Washing"} favourited={false} />
        </LinearGradient>
    )
}

export default DailyActivities;