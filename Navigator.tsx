import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { COLORS, FONTSTYLES, globalStyles } from "./setters/styles";
import { Patient, RootStackParamList } from "./setters/types";

// Screens
import PatientDirectory from "./screens/PatientDirectory";
import AddPatient from "./screens/AddPatient";
import FunctionalityTest from "./screens/FunctionalityTest";
import PatientProfile from "./screens/PatientProfile";
import DailyActivities from "./screens/DailyActivities";
import Hobbies from "./screens/Hobbies";
import ActivityPage from "./screens/ActivityPage";
import PatientInfo from "./screens/PatientInfo";
import About from "./screens/About";

// Custom Components
import { BackButton, HomeButton, HomeButtonArrow, ProfileButton } from "./components/HeaderButtons";



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
                            headerLeft: () => (<BackButton />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"FunctionalityTest"}
                    component={FunctionalityTest}
                    options={({ }) => {
                        return {
                            headerTitle: "Questionnaire",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<HomeButtonArrow />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"PatientProfile"}
                    component={PatientProfile}
                    options={({ route }: { route: any }) => {
                        return {
                            headerTitle: `${route.params.patient.firstName} ${route.params.patient.lastName[0]}`,
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<HomeButton />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"DailyActivities"}
                    component={DailyActivities}
                    options={({ }) => {
                        return {
                            headerTitle: "Daily",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<BackButton />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"Hobbies"}
                    component={Hobbies}
                    options={({ }) => {
                        return {
                            headerTitle: "Hobbies",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<BackButton />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"ActivityPage"}
                    component={ActivityPage}
                    options={({ route }: { route: any }) => {
                        return {
                            headerTitle: `${route.params.activityName}`,
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerRight: () => (<ProfileButton patient={route.params.patient} />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"PatientInfo"}
                    component={PatientInfo}
                    options={({ }) => {
                        return {
                            headerTitle: "Patient Info",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<BackButton />),
                        };
                    }}
                />
                <Stack.Screen
                    name={"About"}
                    component={About}
                    options={({ }) => {
                        return {
                            headerTitle: "About Us",
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                            headerLeft: () => (<BackButton />),
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