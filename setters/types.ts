import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type Patient = {
    id: string,
    firstName: string,
    lastName: string,
    level: 'Prompting' | 'Some Support' | 'Step-by-Step Guidance' | 'Full Assistance' | 'Finish Assessment',
}

// List of screens that are allowed
export type RootStackParamList = {
    PatientDirectory: undefined;
    AddPatient: undefined;
    PatientProfile: {
        patient: Patient | undefined
    };
    DailyActivities: undefined;
}


// Used to auto fill navigation tools with allowed scenes
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type EditScreenRouteProp = RouteProp<RootStackParamList, 'PatientProfile'>;