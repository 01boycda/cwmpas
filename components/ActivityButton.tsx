
import { Text, TouchableOpacity } from "react-native";
import { globalStyles, FONTSTYLES } from "../setters/styles";
import { Patient, ScreenNavigationProp } from "../setters/types";


const ActivityButton = ({ navigation, patient, activity, favourited }:
    { navigation: ScreenNavigationProp, patient: Patient, activity: string, favourited: boolean }) => {
    return (
        <TouchableOpacity
            style={favourited ? [globalStyles.button, globalStyles.buttonSelectd] : globalStyles.button}
            onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: activity })}>
            <Text style={FONTSTYLES.buttonText}>{activity}</Text>
        </TouchableOpacity>
    )
}

export default ActivityButton;