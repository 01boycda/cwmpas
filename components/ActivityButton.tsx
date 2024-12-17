
import { Text, TouchableOpacity } from "react-native";
import { globalStyles, FONTSTYLES } from "../setters/styles";
import { Patient, ScreenNavigationProp } from "../setters/types";


const ActivityButton = ({navigation, patient, activity} :
    {navigation: ScreenNavigationProp, patient: Patient, activity: string}) => {
    return (
        <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate("ActivityPage", { patient: patient, activityName: activity })}>
            <Text style={FONTSTYLES.buttonText}>{activity}</Text>
        </TouchableOpacity>
    )
}

export default ActivityButton;