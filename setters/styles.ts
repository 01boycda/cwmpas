import { Dimensions, StyleSheet } from "react-native";

const screenDimensions = Dimensions.get('screen');

export const COLORS = {
    purpleLight: '#B8A2C7',
    purpleLighter: '#D9CDE1',
    purpleDark: '#49225B',
    purpleStrong: '#8A41AC',
    purpleSoft: '#674A7F',

    backgroundGradTop: '#E9D9F1',
    backgroundGradBottom: '#aa6bc7',

    textContainer: '#BDAFA6',
    textContainerDark: '#957F70',

    redStrong: '#DA2528',
    redSoft: '#E25050',

    warning: '#D3BA2C',

    black: '#0B0B0B',
    white: '#F0F2F3',
}

export const FONTSTYLES = StyleSheet.create({
    buttonText: {
        color: COLORS.purpleLighter,
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    datePickerButtonText: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    dropdownText: {
        color: COLORS.purpleDark,
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    inputHeaderText: {
        color: COLORS.purpleDark,
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
    },
    lightText: {
        color: COLORS.purpleLighter,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
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
    textBox: {
        color: COLORS.black,
        fontSize: 22,
        fontFamily: 'Roboto-Regular',
        marginBottom: 20,
    },
})

export const globalStyles = StyleSheet.create({

    button: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: COLORS.purpleSoft,
        marginBottom: 6,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
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

    centerContent: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },

    checkbox: {
        height: 40,
        width: 40,
    },

    datePicker: {
        height: 120,
    },
    datePickerButton: {
        backgroundColor: COLORS.purpleLighter,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 14,
    },

    dropdown: {
        height: 70,

        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLighter,
        marginBottom: 6,
        padding: 10,
        justifyContent: 'center',
    },
    dropdownList: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderTopWidth: 0,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLighter,
        marginBottom: 6,
        padding: 10,
        justifyContent: 'center',
        
    },
    dropdownSelected: {
        borderRadius: 10,
        backgroundColor: COLORS.purpleStrong,

        color: COLORS.purpleLight,
    },
    headerContainer: {
        backgroundColor: COLORS.purpleSoft,
        borderBottomWidth: 4,
        borderBottomColor: COLORS.purpleDark,
        borderStyle: 'solid',
        height: 80,
    },

    hoverContainer: {
        alignSelf: "center",
        position: "absolute",
        width: screenDimensions.width - 32,
        padding: 16,
        bottom: 16,

        backgroundColor: COLORS.purpleLight,

        // Border
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,

        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    infoBox: {
        backgroundColor: COLORS.warning,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        
        padding: 10,
        width: 300,
    },
    infoIconFill: {
        position: "absolute",
        left: 10,
        top: 10,

        width: 40,
        height: 35,
        
        backgroundColor: COLORS.warning,
        borderRadius: 20
    },

    input: {
        borderColor: COLORS.purpleDark,
        borderWidth: 4,
        borderRadius: 10,

        backgroundColor: COLORS.purpleLighter,
        padding: 10,
        marginBottom: 10,

        color: COLORS.purpleDark,
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },

    pageContainer: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: COLORS.purpleLight,
        padding: 16,
    },

    scrollContainer: {
        flex: 1,
        backgroundColor: COLORS.textContainer,
        borderColor: COLORS.purpleDark,
        borderRadius: 10,
        borderWidth: 4,
        padding: 10,
        marginBottom: 6,
    },
})