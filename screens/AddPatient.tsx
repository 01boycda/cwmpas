import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { globalStyles, COLORS, FONTSTYLES } from "../setters/styles";

const AddPatient = (props: any) => {
    const nav = props.navigation;

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={FONTSTYLES.inpuerHeaderText}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setFirstName}
                placeholder="Tap here"
                placeholderTextColor={COLORS.purpleDark}
                caretHidden
            />
            <Text style={FONTSTYLES.inpuerHeaderText}>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setLastName}
                placeholder="Tap here"
                placeholderTextColor={COLORS.purpleDark}
                caretHidden
                editable={false}
            />
        </View>
    )
}

export default AddPatient;