import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../setters/types';

import { COLORS } from '../setters/styles';
import { Patient } from '../setters/types';

export const BackButton: React.FC = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={40} color={COLORS.purpleLighter} />
        </TouchableOpacity>
    )
}

export const HomeButton: React.FC = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.popToTop()}>
            <AntDesign name='home' size={40} color={COLORS.purpleLighter} />
        </TouchableOpacity>
    )
}

export const ProfileButton: React.FC<{ patient: Patient }> = ({ patient }: { patient: Patient }) => {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.popTo("PatientProfile", { patient: patient })}>
            <AntDesign name="user" size={40} color={COLORS.purpleLighter} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerButtonContainer: {
        margin: 20,
    }
})