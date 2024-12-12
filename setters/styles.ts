import { StyleSheet } from "react-native";

export const COLORS = {
    purpleLight: '#B8A2C7',
    purpleLighter: '#D9CDE1',
    purpleDark: '#49225B',
    purpleStrong: '#8A41AC',
    purpleSoft: '#674A7F',
    textContainer: '#BDAFA6',

    black: '#0B0B0B',
    white: '#F0F2F3',
}

export const FONTSTYLES = StyleSheet.create({
    lightText: {
        color: COLORS.purpleLighter,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    darkText: {
        color: COLORS.black,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    pageHeaderText: {
        color: COLORS.purpleLighter,
        fontSize: 30,
        fontWeight: '300',
        margin: 2,
        fontFamily: 'Roboto-Bold',
    },
    buttonText: {
        color: COLORS.purpleLighter,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    inpuerHeaderText: {
        color: COLORS.purpleDark,
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
    }
})

export const globalStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: COLORS.purpleLight,
        padding: 20,
    },
    headerContainer: {
        backgroundColor: COLORS.purpleSoft,
        borderBottomWidth: 4,
        borderBottomColor: COLORS.purpleDark,
        borderStyle: 'solid',
        height: 80,
    },
    button: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,
        marginTop: 20,
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLight,
        padding: 10,
        marginBottom: 10,

        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
      },
})