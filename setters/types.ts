import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type Patient = {
    id: string,
    firstName: string,
    lastName: string,
    level: "Prompting" | "Some Support" | "Step-by-Step Guidance" | "Full Assistance" | "Finish Assessment",
}

export type Activity = {
    activityName: string,
    activityCategory: string,
    activityLevel: "Prompting" | "Some Support" | "Step-by-Step Guidance" | "Full Assistance",
    section1: string,
    section2: string,
    section3: string,
    section4: string,
    section5: string,
    section6: string,
    section7: string,
    section8: string,
    section9: string,
    section10: string,
    section11: string,
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