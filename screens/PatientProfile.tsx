import React, { useLayoutEffect, useState } from "react";
import { Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";
import { PatientRouteProp, ScreenNavigationProp } from "../setters/types";

const functionalityDesc = {
    "Prompting": "At the \"Prompting\" level, I can usually do many tasks on my own but sometimes need a gentle reminder to get started. I can plan and work towards completing everyday activities like getting dressed, eating, or having a conversation, but I may need help if a problem comes up. I can follow simple instructions and find things in obvious places, but I might struggle with longer directions or searching beyond where I normally look. I do best when things are clear and straightforward, but I can have trouble understanding when something feels unclear or hard to follow.",
    "Some Support": "At the \"Some Support\" level, I can usually manage tasks like bathing, dressing, and making a snack, especially if I follow my usual routines and am in a familiar environment. I enjoy the process of doing these activities more than focusing on the end result, and I can complete them when they are broken down into smaller, 2-3 step instructions. However, I might not always recognize when the activity is necessary or when it’s finished. I rely on visual cues like labels and familiar items being out in the open. I can join in conversations and use simple language, but I may struggle to find the right words or keep up with fast-paced or complex conversations. I do best with topics that are concrete and in the present moment, rather than abstract ideas.",
    "Step-by-Step Guidance": "At the \"Step-by-Step Guidance\" level, I respond primarily to sensations like textures, smells, and colours and require guidance to complete tasks. I can follow instructions if they are broken down into clear, simple steps and provided one at a time. I may not have a conscious plan to finish a task on my own, so I rely on step-by-step directions and gentle reminders. Placing items directly in my hands and using short, straightforward phrases or demonstrations help me stay focused and engaged in activities.",
    "Full Assistance": "At the \"Full Assistance\" level, I am most responsive to gentle sensory experiences, such as touch, sounds, and smells, which can help me feel more connected to myself and those around me. I may not always be fully aware of my surroundings, but I can still engage with others through simple body language and reflexive responses when gently guided. I benefit from a calm and soothing environment, where I feel safe and supported. Sensory input helps me feel more comfortable and present, so taking a slow, thoughtful approach to activities helps me feel at ease and better able to connect with the world around me.",
    "Finish Assessment": "Finish assessment to discover patient's Functionality Level"
}

const PatientProfile: React.FC = () => {
    const route = useRoute<PatientRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Info Menu
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [infoBox, setInfoBox] = useState<number>(0);
    const ProfileInfoButton = () => {
        return (
            <TouchableOpacity style={{ margin: 20 }} onPress={() => setShowInfo(!showInfo)}>
                {showInfo ?
                    <FontAwesome name="close" size={40} color={COLORS.purpleLighter} /> :
                    <MaterialCommunityIcons name="chat-question-outline" size={40} color={COLORS.purpleLighter} />
                }
            </TouchableOpacity>
        )
    }

    // Setup back button
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<ProfileInfoButton />)
        });
        setInfoBox(0);
    }, [navigation, showInfo]);

    return (
        <LinearGradient
            style={globalStyles.pageContainer}
            colors={[COLORS.backgroundGradTop, COLORS.backgroundGradBottom]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>

            <ScrollView style={globalStyles.scrollContainer}>
                <Text style={FONTSTYLES.subheaderText}>{patient.fLevel}</Text>
                <Text style={FONTSTYLES.textBox}>{functionalityDesc[patient.fLevel]}</Text>
            </ScrollView>

            {patient.fLevel === "Finish Assessment" ?
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => navigation.navigate("FunctionalityTest", { patient: patient })}
                >
                    <Text style={[FONTSTYLES.buttonText, { color: COLORS.warning }]}>Finish Test</Text>
                </TouchableOpacity>
                :
                <View>
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => navigation.navigate("DailyActivities", { patient: patient })}
                    >
                        <Text style={FONTSTYLES.buttonText}>Daily Activities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={globalStyles.button}
                        onPress={() => navigation.navigate("Hobbies", { patient: patient, category: "Favourites" })}
                    >
                        <Text style={FONTSTYLES.buttonText}>Hobbies</Text>
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("PatientInfo", { patient: patient })}>
                    <FontAwesome name="user-circle" size={50} color={COLORS.purpleLighter} />
                    <Text style={styles.iconText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconButton, { marginHorizontal: 6 }]} onPress={() => navigation.navigate("LifeStory", { patient: patient })}>
                    <FontAwesome name="book" size={50} color={COLORS.purpleLighter} />
                    <Text style={styles.iconText}>Life Story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("About")}>
                    <FontAwesome name="info-circle" size={50} color={COLORS.purpleLighter} />
                    <Text style={styles.iconText}>About</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showInfo}
                onRequestClose={() => { setShowInfo(!showInfo) }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ height: 80, flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={{ height: 80, width: 80, marginTop: 20 }}
                            onPress={() => navigation.popToTop()}>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ height: 80, width: 80, marginTop: 20 }}
                            onPress={() => setShowInfo(false)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "#B8A2C770" }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            {patient.fLevel !== "Finish Assessment" &&
                                (
                                    <>
                                        <TouchableOpacity style={{ position: "absolute", left: 40, top: 25 }} onPress={() => setInfoBox(infoBox === 1 ? 0 : 1)}>
                                            <View style={globalStyles.infoIconFill} />
                                            <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ position: "absolute", left: Dimensions.get("screen").width / 2 - 25, bottom: 195 }} onPress={() => setInfoBox(infoBox === 2 ? 0 : 2)}>
                                            <View style={globalStyles.infoIconFill} />
                                            <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ position: "absolute", left: Dimensions.get("screen").width / 2 - 25, bottom: 110 }} onPress={() => setInfoBox(infoBox === 3 ? 0 : 3)}>
                                            <View style={globalStyles.infoIconFill} />
                                            <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                                        </TouchableOpacity>
                                    </>
                                )
                            }

                            <TouchableOpacity style={{ position: "absolute", left: 40, bottom: 25 }} onPress={() => setInfoBox(infoBox === 4 ? 0 : 4)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "absolute", left: Dimensions.get("screen").width / 2 - 25, bottom: 25 }} onPress={() => setInfoBox(infoBox === 5 ? 0 : 5)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "absolute", right: 40, bottom: 25 }} onPress={() => setInfoBox(infoBox === 6 ? 0 : 6)}>
                                <View style={globalStyles.infoIconFill} />
                                <MaterialCommunityIcons name="chat-question-outline" size={60} color={COLORS.purpleDark} />
                            </TouchableOpacity>

                            {infoBox > 0 &&
                                (
                                    <View style={globalStyles.infoBox}>
                                        <Text style={FONTSTYLES.textBox}>
                                            {infoBox == 1 && "The Functionality Description Box gives some additional details on what to expect when caring for the user."}
                                            {infoBox == 2 && "This App has a range of Activities divided into Daily and Hobbies\n\nDaily Activities are expected to be performed on a regular basis."}
                                            {infoBox == 3 && "This App has a range of Activities divided into Daily and Hobbies\n\nHobbies are activities that are expected to be performed on a less regular basis."}
                                            {infoBox == 4 && "A User's information can be found here in 'User Info'."}
                                            {infoBox == 5 && "Record memories on the 'Life Story' page. This can be a useful exercise for testing a user's memory and a nice way to create a record of their life."}
                                            {infoBox == 6 && "The 'About' page is an easy way to find out more about CwmpasOT, the creators of this App."}
                                        </Text>
                                    </View>
                                )
                            }

                        </View>

                    </View>
                </SafeAreaView>
            </Modal>
        </LinearGradient>
    )
}

export default PatientProfile;

export const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButton: {
        flex: 1,

        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    iconText: {
        color: COLORS.purpleLight,
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        marginTop: 4,
    }
})