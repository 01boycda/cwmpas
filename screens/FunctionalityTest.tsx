import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";
import { ProfileButton } from "../components/HeaderButtons";
import ActivityButton from "../components/ActivityButton";

const questions = [
    {
        heading: "Cooking",
        answers: [
            "I can plan and cook a meal when prompted and if ingredients are easy to find.",
            "I can make a simple meal if the steps are broken down for me. I may need some help for things that are outside my usual routine.",
            "I can do single tasks like stirring when guided one step at a time.",
            "I enjoy smells and textures, but I need help with most aspects of cooking."
        ]
    },
    {
        heading: "Dressing",
        answers: [
            "I can decide what to wear and get dressed with a reminder, as long as things are easy to find.",
            "I can dress myself if the process is broken into smaller steps and I follow my usual routine.",
            "I can do tasks like zipping up or combing my hair when guided one step at a time.",
            "I respond to the texture and sensory aspects of clothes, but I need help getting dressed."
        ]
    },
    {
        heading: "Eating",
        answers: [
            "I can plan a meal, set the table, and find cutlery when prompted and if they're in their usual places. ",
            "I can prepare a snack or drink if steps are broken into stages and I follow my routine.",
            "I can manage finger foods or lift a spoon with help, as long as I'm guided one step at a time.",
            "I respond to the texture, smell, and taste of food but need full assistance with eating."
        ]
    },
    {
        heading: "Household Chores",
        answers: [
            "I can do simple chores like dusting or folding laundry with prompting and if items are in their usual place.",
            "I can complete chores if they're broken into steps, and I follow my usual routine.",
            "I can handle tasks like holding a duster or folding towels when guided one step at a time.",
            "I respond to the sensory aspects of cleaning such as my favourite scent of cleaning product. I need full assistance with household chores."
        ]
    },
    {
        heading: "Washing",
        answers: [
            "I can bathe or wash myself if prompted and can find toiletries in their usual places.",
            "I can wash or shower if the task is broken into steps and I follow my usual routine.",
            "I can complete tasks like washing my face or hands when guided step by step.",
            "I respond to the warmth of water and the smell of soap but need full assistance to bathe."

        ]
    },
    {
        heading: "Reading",
        answers: [
            "I can enjoy reading my favourite books/magazines if they're kept in view to prompt me.",
            "I enjoy reading books and can follow along if the story short or I read short sections.",
            "I enjoy my favourite books and can engage when guided step by step.",
            "I respond to the feel of holding a book, but I need full assistance to engage with the text."
        ]
    },
    {
        heading: "Communicating",
        answers: [
            "I enjoy conversations but may need prompting to stay engaged. I prefer simple, familiar topics.",
            "I enjoy chatting and can engage if the conversation is kept simple and supportive.",
            "I respond to voices and can participate in conversations when guided",
            "I respond to hearing voices or feeling a gentle touch, but I need full assistance to engage."
        ]

    },
    {
        heading: "Socialising",
        answers: [
            "I enjoy group activities but may need prompting to engage. I prefer interactions with familiar people.",
            "I can join in group activities if they are broken into steps, and I enjoy the social aspect.",
            "I can participate in group activities when guided step by step, focusing on the social experience.",
            "I respond to voices and touch but need full assistance to engage in group activities."
        ]
    },
    {
        heading: "Leisure Activities",
        answers: [
            "I enjoy familiar hobbies and interests but may need prompting and help to get started.",
            "I can participate in familiar hobbies and interests if they are broken into simple steps, and I follow a routine.",
            "I can engage in familiar hobbies and interests like holding or using objects when guided one step at a time.",
            "I respond to sensory experiences like sounds and touch during familiar hobbies and interests, but need full assistance to engage."
        ]

    },
    {
        heading: "Physical Activities",
        answers: [
            "I enjoy physical activities but may need reminders and support to start and stay engaged.",
            "I can participate in physical activities if they are broken down into simple steps and in a familiar environment.",
            "I respond well to physical activities when guided step by step, focusing on experiences like movement.",
            "I respond to sensations like touch or movement during physical activities but need full assistance."
        ]
    },
    {
        heading: "Cognitive Activities",
        answers: [
            "I enjoy cognitive activities like quizzes but may need reminders and help with more complex questions.",
            "I can participate in cognitive activities if they are broken into simple steps and in a familiar setting.",
            "I can engage in cognitive activities like answering questions when guided step by step.",
            "I  respond to sensory cues like hearing questions or holding cards but need full assistance to participate."
        ]
    },
]

const FunctionalityTest = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    /*
    SHOW WELCOME MESSAGE FIRST
    */

    const [questionNum, setQuestionNum] = useState<number>(0);

    const QuestionButton = ({ q, a }: { q: number, a: number }) => {
        return (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{questions[q].answers[a]}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={styles.questionHeader}>{questions[questionNum].heading}</Text>
            <Text style={styles.questionTracker}>Question {questionNum + 1}/11</Text>
            <QuestionButton q={questionNum} a={0} />
            <QuestionButton q={questionNum} a={1} />
            <QuestionButton q={questionNum} a={2} />
            <QuestionButton q={questionNum} a={3} />
            <View style={styles.arrowsContainer}>
                <TouchableOpacity style={[styles.button, {marginRight: 3}]}>
                    <AntDesign name="left" size={40} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {marginLeft: 3}]}>
                    <AntDesign name="right" size={40} color={COLORS.purpleLighter} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FunctionalityTest;

const styles = StyleSheet.create({
    questionHeader: {
        color: COLORS.purpleDark,
        fontSize: 36,
        fontWeight: '200',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },
    questionTracker: {
        color: COLORS.black,
        fontSize: 24,
        fontWeight: '200',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    button: {
        flex: 2,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,
        marginBottom: 6,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.purpleLighter,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    arrowsContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});