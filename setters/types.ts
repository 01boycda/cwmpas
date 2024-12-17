import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export const DATABASE_NAME = "test3";

export type Patient = {
    id: number;
    firstName: string;
    middleNames?: string;
    lastName: string;

    dob: string;
    joined: string;

    fScore: number;
    fLevel: "Prompting" | "Some Support" | "Step-by-Step Guidance" | "Full Assistance" | "Finish Assessment";
    lastAssessment: string;

    cookingLevel: number;
    dressingLevel: number;
    eatingLevel: number;
    choresLevel: number;
    washingLevel: number;
    readingLevel: number;
    communicationLevel: number;
    socialisingLevel: number;
    leisureLevel: number;
    physicalLevel: number;
    cognitiveLevel: number;

    hobbies?: string[];
}

export type Activity = {
    "activityName": string;
    "activityCategory": string;
    "Prompting": string[];
    "Some Support": string[];
    "Step-by-Step Guidance": string[];
    "Full Assistance": string[];
}

// List of screens that are allowed
export type RootStackParamList = {
    PatientDirectory: undefined;
    AddPatient: undefined;
    FunctionalityTest: { patient: Patient };
    PatientProfile: { patient: Patient };
    DailyActivities: { patient: Patient };
    Hobbies: { patient: Patient };
    ActivityPage: { patient: Patient, activityName: string };
}


// Used to auto fill navigation tools with allowed scenes
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type PatientRouteProp = RouteProp<RootStackParamList, "PatientProfile">;
export type ActivityRouteProp = RouteProp<RootStackParamList, "ActivityPage">;