import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type Patient = {
    id: string,
    firstName: string,
    lastName: string,
    level: "Prompting" | "Some Support" | "Step-by-Step Guidance" | "Full Assistance" | "Finish Assessment",
}

export type Activity = {
    "activityName": string,
    "activityCategory": string,
    "Prompting": string[],
    "Some Support": string[],
    "Step-by-Step Guidance": string[],
    "Full Assistance": string[],
}

// List of screens that are allowed
export type RootStackParamList = {
    PatientDirectory: undefined;
    AddPatient: undefined;
    PatientProfile: { patient: Patient };
    DailyActivities: { patient: Patient };
    ActivityPage: { patient: Patient, activityName: string };
}


// Used to auto fill navigation tools with allowed scenes
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type PatientRouteProp = RouteProp<RootStackParamList, "PatientProfile">;
export type ActivityRouteProp = RouteProp<RootStackParamList, "ActivityPage">;