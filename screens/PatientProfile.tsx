import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, Patient, ScreenNavigationProp } from "../setters/types";

const functionalityDesc = {
    "Prompting": "At the \"Prompting\" level, I can usually do many tasks on my own but sometimes need a gentle reminder to get started. I can plan and work towards completing everyday activities like getting dressed, eating, or having a conversation, but I may need help if a problem comes up. I can follow simple instructions and find things in obvious places, but I might struggle with longer directions or searching beyond where I normally look. I do best when things are clear and straightforward, but I can have trouble understanding when something feels unclear or hard to follow.",
    "Some Support": "At the \"some support\" level, I can usually manage tasks like bathing, dressing, and making a snack, especially if I follow my usual routines and am in a familiar environment. I enjoy the process of doing these activities more than focusing on the end result, and I can complete them when they are broken down into smaller, 2-3 step instructions. However, I might not always recognize when the activity is necessary or when it’s finished. I rely on visual cues like labels and familiar items being out in the open. I can join in conversations and use simple language, but I may struggle to find the right words or keep up with fast-paced or complex conversations. I do best with topics that are concrete and in the present moment, rather than abstract ideas.",
    "Step-by-Step Guidance": "At the \"Step-by-Step Guidance\" level, I respond primarily to sensations like textures, smells, and colours and require guidance to complete tasks. I can follow instructions if they are broken down into clear, simple steps and provided one at a time. I may not have a conscious plan to finish a task on my own, so I rely on step-by-step directions and gentle reminders. Placing items directly in my hands and using short, straightforward phrases or demonstrations help me stay focused and engaged in activities.",
    "Full Assistance": "At the \"Step-by-Step Guidance\" level, I respond primarily to sensations like textures, smells, and colours and require guidance to complete tasks. I can follow instructions if they are broken down into clear, simple steps and provided one at a time. I may not have a conscious plan to finish a task on my own, so I rely on step-by-step directions and gentle reminders. Placing items directly in my hands and using short, straightforward phrases or demonstrations help me stay focused and engaged in activities.",
    "Finish Assessment": "Finish assessment to discover patient's Functionality Level"
}

const PatientProfile: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.darkText}>{patient.level}</Text>

            <ScrollView style={globalStyles.textBox}>
                <Text style={FONTSTYLES.darkText}>{functionalityDesc[patient.level]}</Text>
            </ScrollView>

            <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate("DailyActivities", { patient: patient })}>
                <Text style={FONTSTYLES.buttonText}>Daily Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button}>
                <Text style={FONTSTYLES.buttonText}>Hobbies & Interests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button}>
                <Text style={FONTSTYLES.buttonText}>Your Story</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button}>
                <Text style={FONTSTYLES.buttonText}>About CwmpasOT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PatientProfile;