import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, Level, Patient, PatientRouteProp, ScreenNavigationProp } from "../setters/types";

import questions from "../data/questionnaire";

const FunctionalityTest = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Welcome Message Vars
    const [showWelcome, setShowWelcome] = useState<boolean>(false);

    const handleWelcomeMessage = () => {
        setShowWelcome(false);
    }

    // Questionnaire Vars
    const [questionNum, setQuestionNum] = useState<number>(0);
    const [answers, setAnswers] = useState<number[]>(Array(11).fill(0));

    const loadPreviousAnswers = async (): Promise<number[]> => {
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        const patientData = await db.getFirstAsync(`SELECT * FROM patients WHERE id = ${patient.id};`) as Patient;

        const latestAnswers = questions.map((question) => {
            const key = question.sqlKey as keyof Patient;
            return patientData[key] as number;
        });

        return latestAnswers;
    }

    const uploadPatientAnswer = async (answer: number) => {
        const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        await db.runAsync(`UPDATE patients SET ${questions[questionNum].sqlKey} = ? WHERE id = ?`, answer, patient.id);
    }

    const handleAnswer = (answer: number) => {
        // Update answers hook
        let newAnswers = [...answers];
        newAnswers[questionNum] = answer;

        setAnswers(newAnswers);
        uploadPatientAnswer(answer);
    }

    const previousQuestion = () => {
        setQuestionNum(prev => prev - 1)
    }

    const nextQuestion = () => {
        if (questionNum < 10) {
            // Commit answer to db
            setQuestionNum(prev => prev + 1)
        } else {
            uploadPatientFunctionality();
        }
    }

    const uploadPatientFunctionality = async () => {

        const db: SQLite.SQLiteDatabase = await SQLite.openDatabaseAsync(DATABASE_NAME);

        let lastAssessment: string = new Date().toLocaleDateString();
        await db.runAsync(`UPDATE patients SET lastAssessment = ? WHERE id = ?`, lastAssessment, patient.id);

        let score: number = answers.reduce((total, answer) => total + answer, -questions.length);
        await db.runAsync(`UPDATE patients SET fScore = ? WHERE id = ?`, score, patient.id);

        let level: Level = "Full Assistance";
        if (score <= 7) level = "Prompting";
        else if (score <= 17) level = "Some Support";
        else if (score <= 27) level = "Step-by-Step Guidance";
        await db.runAsync(`UPDATE patients SET fLevel = ? WHERE id = ?`, level, patient.id);

        let updatedPatient = { ...patient, fScore: score, fLevel: level, lastAssessment: lastAssessment };
        navigation.navigate("PatientProfile", { patient: updatedPatient });
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchAnswers = async () => {
                const latestAnswers = await loadPreviousAnswers();
                if (isActive) {
                    setAnswers(latestAnswers);

                    // Find the first index where the answer is 0 and update questionNum
                    const firstUnanswered = latestAnswers.findIndex(answer => answer === 0);

                    // If there's a value of 0, set questionNum to that index
                    if (firstUnanswered !== -1) {
                        setQuestionNum(firstUnanswered); // Set questionNum to the index of the first unanswered question
                    } else {
                        setQuestionNum(0); // All answers are filled, so set to the end
                    }

                    // Check if the first answer is 0
                    if (latestAnswers[0] === 0) {
                        setShowWelcome(true);
                    }
                }
            };

            fetchAnswers();

            return () => {
                isActive = false;
            };

        }, [])
    );

    // Render welcome message if no answers completed
    if (showWelcome) {
        return (
            <View style={[globalStyles.pageContainer, { justifyContent: 'space-between' }]}>
                <Text style={[FONTSTYLES.subheaderText, { fontSize: 40, textAlign: 'center' }]}>Welcome!</Text>
                <View style={globalStyles.scrollContainer}>
                    <Text style={[FONTSTYLES.textBox]}>
                        Complete the questionnaire to recieve a tailored profile that helps us support your daily activities based on your needs.
                    </Text>
                    <Text style={[FONTSTYLES.textBox]}>
                        You'll also unlock our Memory Book feature to capture and reflect on special moments.
                    </Text>
                    <Text style={[FONTSTYLES.textBox, { marginBottom: 0 }]}>
                        Feel free to save your progress and return later.
                    </Text>
                </View>
                <TouchableOpacity style={globalStyles.button} onPress={handleWelcomeMessage}>
                    <Text style={FONTSTYLES.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const QuestionButton = ({ q, a }: { q: number, a: number }) => {
        return (
            <TouchableOpacity
                style={answers[q] === a ? [styles.button, styles.buttonSelected] : styles.button}
                onPress={() => handleAnswer(a)}
            >
                <Text style={styles.buttonText}>{questions[q].answers[a - 1]}</Text>
            </TouchableOpacity>
        );
    }

    // Render question
    return (
        <View style={globalStyles.pageContainer}>
            <Text style={styles.questionHeader}>{questions[questionNum].heading}</Text>
            <Text style={styles.questionTracker}>Question {questionNum + 1}/11</Text>
            <QuestionButton q={questionNum} a={1} />
            <QuestionButton q={questionNum} a={2} />
            <QuestionButton q={questionNum} a={3} />
            <QuestionButton q={questionNum} a={4} />
            <View style={styles.arrowsContainer}>
                <TouchableOpacity
                    disabled={questionNum === 0 ? true : false}
                    style={questionNum === 0 ? [styles.button, styles.buttonDisabled] : styles.button}
                    onPress={previousQuestion}
                >
                    <AntDesign name="left" size={40} color={COLORS.purpleLighter} />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={answers[questionNum] === 0 ? true : false}
                    style={answers[questionNum] === 0 ? [styles.button, styles.buttonDisabled, { marginLeft: 6 }] : [styles.button, styles.buttonSelected, { marginLeft: 6 }]}
                    onPress={nextQuestion}
                >
                    <AntDesign name={questionNum < 10 ? "right" : "like2"} size={40} color={COLORS.purpleLighter} />
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
        flex: 1,
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,
        marginBottom: 6,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        backgroundColor: COLORS.purpleStrong,
    },
    buttonDisabled: {
        borderColor: COLORS.purpleSoft,
        backgroundColor: COLORS.purpleLight,
    },
    buttonText: {
        color: COLORS.purpleLighter,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    arrowsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});