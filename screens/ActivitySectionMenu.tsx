import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { ActivitySectionsRouteProp, ScreenNavigationProp } from "../setters/types";

type SectionProps = {
    label: string;
    value: number;
}

const items: SectionProps[] = [
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
];

const ActivitySectionMenu: React.FC = () => {
    const route = useRoute<ActivitySectionsRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();

    const SectionButton = ({ activity, section }: { activity: string, section: SectionProps }) => {
        return (
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate("ActivityPage", { patient: route.params.patient, activityName: activity, section: section.value })}>
                <Text style={FONTSTYLES.buttonText}>{section.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <LinearGradient
            style={globalStyles.pageContainer}
            colors={[COLORS.backgroundGradTop, COLORS.backgroundGradBottom]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <ScrollView style={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                {items.map(item => {
                    return <SectionButton key={item.label} activity={route.params.activityName} section={item} />
                })}
            </ScrollView>
        </LinearGradient>
    );
}

export default ActivitySectionMenu;