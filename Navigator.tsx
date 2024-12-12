import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PatientDirectory from './screens/PatientDirectory';
import PatientProfile from './screens/PatientProfile';
import AddPatient from './screens/AddPatient';
import DailyActivities from './screens/DailyActivities';

import { COLORS, FONTSTYLES, globalStyles } from './setters/styles';
import { Patient, RootStackParamList } from './setters/types';

const Stack = createStackNavigator<RootStackParamList>();
const Navigator = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen
                    name={'PatientDirectory'}
                    component={PatientDirectory}
                    options={({ }) => {
                        return {
                            headerTitle: 'Patient Directory',
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                <Stack.Screen
                    name={'AddPatient'}
                    component={AddPatient}
                    options={({ }) => {
                        return {
                            headerTitle: 'Add Patient',
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                <Stack.Screen
                    name={'PatientProfile'}
                    component={PatientProfile}
                    options={({ route }: { route: any }) => {
                        return {
                            headerTitle: `${route.params.patient.firstName} ${route.params.patient.lastName}`,
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
                        };
                    }}
                />
                
                <Stack.Screen
                    name={'DailyActivities'}
                    component={DailyActivities}
                    options={({ }) => {
                        return {
                            headerTitle: 'Daily Activities',
                            headerStyle: globalStyles.headerContainer,
                            headerTintColor: COLORS.purpleLight,
                            headerTitleStyle: FONTSTYLES.pageHeaderText,
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