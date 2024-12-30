import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";

const About = () => {

    return (
        <ScrollView style={{ backgroundColor: COLORS.purpleLight }}>
            <View style={globalStyles.pageContainer}>
                <Image
                    style={styles.banner}
                    source={require("./../assets/cwmpas-banner.png")}
                />
                <View style={globalStyles.scrollContainer}>
                    <Text style={FONTSTYLES.textBox}>
                        Savanna and Lauren, founders of CwmpasOT, created this app to enhance the lives of people living with Dementia.
                        Inspired by their work on a dementia ward, they saw the need for person-centred care that adapts to each
                        individual’s needs.
                    </Text>
                    <Text style={FONTSTYLES.textBox}>
                        Their app helps families and caregivers understand the best ways to support someone based on
                        their function level and stage of Dementia, with the goal of improving care and making daily life more
                        meaningful.
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://google.com') }}>
                        <AntDesign name="facebook-square" color={COLORS.purpleDark} size={70} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://google.com') }}>
                        <AntDesign name="instagram" color={COLORS.purpleDark} size={70} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://google.com') }}>
                        <AntDesign name="linkedin-square" color={COLORS.purpleDark} size={70} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://google.com') }}>
                        <AntDesign name="weibo-square" color={COLORS.purpleDark} size={70} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default About;

const styles = StyleSheet.create({
    banner: {
        backgroundColor: COLORS.purpleLighter,
        borderRadius: 10,

        height: 100,
        width: '100%',

        marginBottom: 16,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
    },
    webButton: {
        flex: 1,
    }
})