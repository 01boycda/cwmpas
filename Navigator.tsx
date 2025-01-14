import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import { COLORS, FONTSTYLES, globalStyles } from "./setters/styles";
import { RootStackParamList } from "./setters/types";

// Screens
import PatientDirectory from "./screens/PatientDirectory";
import AddPatient from "./screens/AddPatient";
import FunctionalityTest from "./screens/FunctionalityTest";
import PatientProfile from "./screens/PatientProfile";
import DailyActivities from "./screens/DailyActivities";
import Hobbies from "./screens/Hobbies";
import ActivitySectionMenu from "./screens/ActivitySectionMenu";
import ActivityPage from "./screens/ActivityPage";
import PatientInfo from "./screens/PatientInfo";
import MemoryBook from "./screens/MemoryBook";
import About from "./screens/About";

// Custom Components
import { BackButton, HomeButton, HomeButtonArrow, ProfileButton } from "./components/HeaderButtons";

const Stack = createStackNavigator<RootStackParamList>();
const Navigator: React.FC = () => {

    const defaultNavProps: StackNavigationOptions = {
        headerStyle: globalStyles.headerContainer,
        headerTitleStyle: FONTSTYLES.pageHeaderText,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.purpleLight,
        gestureEnabled: false,
    }

    return (
        <NavigationContainer >
            <Stack.Navigator>

                <Stack.Screen name="PatientDirectory" component={PatientDirectory}
                    options={{ ...defaultNavProps, headerTitle: "User Directory" }} />

                <Stack.Screen name="AddPatient" component={AddPatient}
                    options={{ ...defaultNavProps, headerTitle: "Add User", headerLeft: () => (<BackButton />) }} />

                <Stack.Screen name="FunctionalityTest" component={FunctionalityTest}
                    options={{ ...defaultNavProps, headerTitle: "Questionnaire", headerLeft: () => (<HomeButtonArrow />) }} />

                <Stack.Screen name="PatientProfile" component={PatientProfile}
                    options={({ route }: { route: any }) => ({ ...defaultNavProps, headerTitle: `${route.params.patient.firstName} ${route.params.patient.lastName[0]}`, headerLeft: () => (<HomeButton />) })} />

                <Stack.Screen name={"DailyActivities"} component={DailyActivities}
                    options={{ ...defaultNavProps, headerTitle: "Daily", headerLeft: () => (<BackButton />) }} />

                <Stack.Screen name={"Hobbies"} component={Hobbies}
                    options={({ }) => ({ ...defaultNavProps, headerTitle: "Hobbies", headerLeft: () => (<BackButton />) })} />

                <Stack.Screen name={"ActivitySectionMenu"} component={ActivitySectionMenu}
                    options={({ }) => ({ ...defaultNavProps, headerTitle: "Section", headerLeft: () => (<BackButton />) })} />

                <Stack.Screen name={"ActivityPage"} component={ActivityPage}
                    options={({ route }: { route: any }) => ({ ...defaultNavProps, headerTitle: `${route.params.activityName}`, headerRight: () => (<ProfileButton patient={route.params.patient} />) })} />

                <Stack.Screen name={"PatientInfo"} component={PatientInfo}
                    options={{ ...defaultNavProps, headerTitle: "User Info", headerLeft: () => (<BackButton />) }} />

                <Stack.Screen name={"LifeStory"} component={MemoryBook}
                    options={{ ...defaultNavProps, headerTitle: "Life Story" }} />

                <Stack.Screen name={"About"} component={About}
                    options={{ ...defaultNavProps, headerTitle: "About Us", headerLeft: () => (<BackButton />) }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;