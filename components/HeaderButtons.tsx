import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../setters/types';

import { COLORS } from '../setters/styles';
import { Patient } from '../setters/types';

export const HomeButton: React.FC = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.popToTop()}>
            <FontAwesome name='home' size={40} color={COLORS.purpleLighter} />
        </TouchableOpacity>
    )
}

export const ProfileButton: React.FC<{ patient: Patient }> = ({ patient }: { patient: Patient }) => {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.popTo("PatientProfile", { patient: patient })}>
            <FontAwesome name="user" size={40} color={COLORS.purpleLighter} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerButtonContainer: {
        margin: 20,
    }
})