import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { EditScreenRouteProp, ScreenNavigationProp } from "../setters/types";

const dailyActivities = {
    'cooking': {
        'activity': 'Cooking',
        'category': 'Daily',
        'Prompting': [
            'Cooking Prompting What_I_Can_Do description',
            'Cooking Prompting What_I_Need_Help_Wit description',
            'Cooking Prompting How_to_Prepare_the_Space description',
            'Cooking Prompting How_to_Support_Me description',
            'Cooking Prompting Step_by_Step_Instructions description',
            'Cooking Prompting Sensory_Preferences description',
            'Cooking Prompting Managing_Sensory_Overload description',
            'Cooking Prompting How_to_Communicate_with_Me description',
            'Cooking Prompting Encouraging_Me description',
            'Cooking Prompting Ending_the_Activity description',
            'Cooking Prompting What_Comes_Next description'
        ],
        'Some Support': [
            'Cooking Some Support What_I_Can_Do description',
            'Cooking Some Support What_I_Need_Help_Wit description',
            'Cooking Some Support How_to_Prepare_the_Space description',
            'Cooking Some Support How_to_Support_Me description',
            'Cooking Some Support Step_by_Step_Instructions description',
            'Cooking Some Support Sensory_Preferences description',
            'Cooking Some Support Managing_Sensory_Overload description',
            'Cooking Some Support How_to_Communicate_with_Me description',
            'Cooking Some Support Encouraging_Me description',
            'Cooking Some Support Ending_the_Activity description',
            'Cooking Some Support What_Comes_Next description'
        ],
        'Step-by-Step Guidance': [
            'Cooking Step-by-Step Guidance What_I_Can_Do description',
            'Cooking Step-by-Step Guidance What_I_Need_Help_Wit description',
            'Cooking Step-by-Step Guidance How_to_Prepare_the_Space description',
            'Cooking Step-by-Step Guidance How_to_Support_Me description',
            'Cooking Step-by-Step Guidance Step_by_Step_Instructions description',
            'Cooking Step-by-Step Guidance Sensory_Preferences description',
            'Cooking Step-by-Step Guidance Managing_Sensory_Overload description',
            'Cooking Step-by-Step Guidance How_to_Communicate_with_Me description',
            'Cooking Step-by-Step Guidance Encouraging_Me description',
            'Cooking Step-by-Step Guidance Ending_the_Activity description',
            'Cooking Step-by-Step Guidance What_Comes_Next description'
        ],
        'Full Assistance': [
            'Cooking Full Assistance What_I_Can_Do description',
            'Cooking Full Assistance What_I_Need_Help_Wit description',
            'Cooking Full Assistance How_to_Prepare_the_Space description',
            'Cooking Full Assistance How_to_Support_Me description',
            'Cooking Full Assistance Step_by_Step_Instructions description',
            'Cooking Full Assistance Sensory_Preferences description',
            'Cooking Full Assistance Managing_Sensory_Overload description',
            'Cooking Full Assistance How_to_Communicate_with_Me description',
            'Cooking Full Assistance Encouraging_Me description',
            'Cooking Full Assistance Ending_the_Activity description',
            'Cooking Full Assistance What_Comes_Next description'
        ],
    },
    'dressing': {
        'activity': 'Dressing',
        'category': 'Daily',
        'Prompting': [
            'Dressing Prompting What_I_Can_Do description',
            'Dressing Prompting What_I_Need_Help_Wit description',
            'Dressing Prompting How_to_Prepare_the_Space description',
            'Dressing Prompting How_to_Support_Me description',
            'Dressing Prompting Step_by_Step_Instructions description',
            'Dressing Prompting Sensory_Preferences description',
            'Dressing Prompting Managing_Sensory_Overload description',
            'Dressing Prompting How_to_Communicate_with_Me description',
            'Dressing Prompting Encouraging_Me description',
            'Dressing Prompting Ending_the_Activity description',
            'Dressing Prompting What_Comes_Next description'
        ],
        'Some Support': [
            'Dressing Some Support What_I_Can_Do description',
            'Dressing Some Support What_I_Need_Help_Wit description',
            'Dressing Some Support How_to_Prepare_the_Space description',
            'Dressing Some Support How_to_Support_Me description',
            'Dressing Some Support Step_by_Step_Instructions description',
            'Dressing Some Support Sensory_Preferences description',
            'Dressing Some Support Managing_Sensory_Overload description',
            'Dressing Some Support How_to_Communicate_with_Me description',
            'Dressing Some Support Encouraging_Me description',
            'Dressing Some Support Ending_the_Activity description',
            'Dressing Some Support What_Comes_Next description'
        ],
        'Step-by-Step Guidance': [
            'Dressing Step-by-Step Guidance What_I_Can_Do description',
            'Dressing Step-by-Step Guidance What_I_Need_Help_Wit description',
            'Dressing Step-by-Step Guidance How_to_Prepare_the_Space description',
            'Dressing Step-by-Step Guidance How_to_Support_Me description',
            'Dressing Step-by-Step Guidance Step_by_Step_Instructions description',
            'Dressing Step-by-Step Guidance Sensory_Preferences description',
            'Dressing Step-by-Step Guidance Managing_Sensory_Overload description',
            'Dressing Step-by-Step Guidance How_to_Communicate_with_Me description',
            'Dressing Step-by-Step Guidance Encouraging_Me description',
            'Dressing Step-by-Step Guidance Ending_the_Activity description',
            'Dressing Step-by-Step Guidance What_Comes_Next description'
        ],
        'Full Assistance': [
            'Dressing Full Assistance What_I_Can_Do description',
            'Dressing Full Assistance What_I_Need_Help_Wit description',
            'Dressing Full Assistance How_to_Prepare_the_Space description',
            'Dressing Full Assistance How_to_Support_Me description',
            'Dressing Full Assistance Step_by_Step_Instructions description',
            'Dressing Full Assistance Sensory_Preferences description',
            'Dressing Full Assistance Managing_Sensory_Overload description',
            'Dressing Full Assistance How_to_Communicate_with_Me description',
            'Dressing Full Assistance Encouraging_Me description',
            'Dressing Full Assistance Ending_the_Activity description',
            'Dressing Full Assistance What_Comes_Next description'
        ],
    },
}

const DailyActivities = (props: any) => {
    const route = useRoute<EditScreenRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <View style={globalStyles.pageContainer}>
            <TouchableOpacity style={[globalStyles.button, { flex: 1, marginTop: 0 }]}>
                <Text style={FONTSTYLES.buttonText}>Cooking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                <Text style={FONTSTYLES.buttonText}>Dressing</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                <Text style={FONTSTYLES.buttonText}>Eating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                <Text style={FONTSTYLES.buttonText}>Household Chores</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.button, { flex: 1 }]}>
                <Text style={FONTSTYLES.buttonText}>Washing</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DailyActivities;