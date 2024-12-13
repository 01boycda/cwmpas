import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PatientDirectory from "./screens/PatientDirectory";
import PatientProfile from "./screens/PatientProfile";
import AddPatient from "./screens/AddPatient";
import DailyActivities from "./screens/DailyActivities";
import ActivityPage from "./screens/ActivityPage";

import { ProfileButton } from "./components/HeaderButtons";

import { COLORS, FONTSTYLES, globalStyles } from "./setters/styles";
import { Patient, RootStackParamList } from "./setters/types";

const Stack = createStackNavigator<RootStackParamList>();
const Navigator: React.FC = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen
                    name={"PatientDirectory"}
                    component={PatientDirectory}
                    options={({ }) => {
                        return {
                            headerTitle: "Patient Directory",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                <Stack.Screen
                    name={"AddPatient"}
                    component={AddPatient}
                    options={({ }) => {
                        return {
                            headerTitle: "Add Patient",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                <Stack.Screen
                    name={"PatientProfile"}
                    component={PatientProfile}
                    options={({ route }: { route: any }) => {
                        return {
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerTitle: `${route.params.patient.firstName} ${route.params.patient.lastName}`,
                        };
                    }}
                />
                <Stack.Screen
                    name={"DailyActivities"}
                    component={DailyActivities}
                    options={({ }) => {
                        return {
                            headerTitle: "Daily Activities",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                <Stack.Screen
                    name={"ActivityPage"}
                    component={ActivityPage}
                    options={({ route }: { route: any }) => {
                        return {
                            headerTitle: "ACTIVITY",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerRight: () => (<ProfileButton patient={route.params.patient} />),
                        };
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: COLORS.black,
        flex: 1,
    }
})