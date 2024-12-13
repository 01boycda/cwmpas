import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { Activity, ActivityRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";
import { getActivity } from "../services/getActivity";

const ActivityPage: React.FC = (props: any) => {
    const route = useRoute<ActivityRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;
    const activityName = route.params.activityName;

    const[activity, setActivity] = useState<Activity | null>(null);

    useLayoutEffect(() => {
        getActivity(activityName, patient.level);
    }, [activity]);

    // Update contents

    // 

    return (
        <View style={globalStyles.pageContainer}>
            <TouchableOpacity style={globalStyles.button}>
                <Text style={FONTSTYLES.buttonText}>DROPDOWN PLACEHOLDER</Text>
            </TouchableOpacity>
            <ScrollView style={globalStyles.textBox}>
                <Text style={FONTSTYLES.darkText}>This is where the seciont description goes</Text>
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                    <FontAwesome name="arrow-left" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                    <FontAwesome name="pencil-square-o" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                    <FontAwesome name="arrow-right" size={60} color={COLORS.purpleLighter} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ActivityPage;