import { StyleSheet } from "react-native";

export const COLORS = {
    purpleLight: '#B8A2C7',
    purpleLighter: '#D9CDE1',
    purpleDark: '#49225B',
    purpleStrong: '#8A41AC',
    purpleSoft: '#674A7F',
    textContainer: '#BDAFA6',

    redStrong: '#DA2528',
    redSoft: '#E25050',

    warning: '#D3BA2C',

    black: '#0B0B0B',
    white: '#F0F2F3',
}

export const FONTSTYLES = StyleSheet.create({
    lightText: {
        color: COLORS.purpleLighter,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    textBox: {
        color: COLORS.black,
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        marginBottom: 20,
    },
    pageHeaderText: {
        color: COLORS.purpleLighter,
        fontSize: 35,
        fontWeight: '300',
        margin: 2,
        fontFamily: 'Roboto-Bold',
    },
    subheaderText: {
        color: COLORS.purpleDark,
        fontSize: 34,
        fontWeight: '200',
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
        textAlign: "center",
    },
    buttonText: {
        color: COLORS.purpleLighter,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    inputHeaderText: {
        color: COLORS.purpleDark,
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
    },
    dropdownText: {
        color: COLORS.purpleDark,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    datePickerButtonText: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
})

export const globalStyles = StyleSheet.create({
    centerContent: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    pageContainer: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: COLORS.purpleLight,
        padding: 16,
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
        marginBottom: 6,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelectd: {
        backgroundColor: COLORS.purpleStrong,
    },
    buttonDanger: {
        backgroundColor: COLORS.redStrong,
        borderColor: COLORS.redSoft,
    },
    buttonDisabled: {
        borderColor: COLORS.purpleLighter,
        backgroundColor: COLORS.purpleLight,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.textContainer,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        padding: 10,
        marginBottom: 6,
    },
    input: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLight,
        padding: 10,
        marginBottom: 10,

        color: COLORS.purpleDark,
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },
    dropdown: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLighter,
        marginBottom: 6,
        padding: 10,
        justifyContent: 'center',
    },
    alertMessageContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        backgroundColor: COLORS.purpleLight,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        padding: 16,
        position: "absolute",
        alignSelf: "center",
        bottom: 16,
    },
    // Date Time Picker
    datePicker: {
        height: 120,
    },
    datePickerContainer: {
        backgroundColor: COLORS.purpleLight,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        position: "absolute",
        alignSelf: "center",
        marginTop: 20,
    },
    datePickerButton: {
        backgroundColor: COLORS.purpleLighter,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 14,
    }
})