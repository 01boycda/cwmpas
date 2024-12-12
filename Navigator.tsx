import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PatientDirectory from './screens/PatientDirectory';
import PatientProfile from './screens/PatientProfile';
import AddPatient from './screens/AddPatient';

import { COLORS, FONTSTYLES, globalStyles } from './styles';
import { Patient, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigator = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen
                    name={'PatientDirectory'}
                    component={PatientDirectory}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'AddPatient'}
                    component={AddPatient}
                    options={{
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    }}
                />
                <Stack.Screen
                    name={'PatientProfile'}
                    component={PatientProfile}
                    options={({ route }: { route: any }) => ({
                        title: route.params.name,
                        headerStyle: globalStyles.headerContainer,
                        headerTintColor: COLORS.purpleLight,
                        headerTitleStyle: FONTSTYLES.pageHeaderText,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;