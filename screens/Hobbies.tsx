import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SQLite from "expo-sqlite";

import { globalStyles, FONTSTYLES } from "../setters/styles";
import { DATABASE_NAME, HobbiesRouteProp, ScreenNavigationProp } from "../setters/types";
import ActivityButton from "../components/ActivityButton";

const Hobbies: React.FC = () => {
    const route = useRoute<HobbiesRouteProp>();
    const navigation = useNavigation<ScreenNavigationProp>();
    const patient = route.params.patient;

    // Load activity data from Json
    const activitiesData = require('../data/activities.json');

    // Patient Data
    const loadFavouritesData = async () => {
        console.log("Category input:", category);

        try {
            const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

            // Create table if not existing
            await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS hobbies (
                        id INTEGER PRIMARY KEY NOT NULL,
                        patient_id INTEGER REFERENCES patients(id),
                        activity TEXT NOT NULL);`
            );

            // Create favourites list
            let favouritesData: { "activity": string }[] = await db.getAllAsync(`SELECT DISTINCT activity FROM hobbies WHERE patient_id = ${patient.id}`);
            let favouritesList: string[] = [];
            Object.values(favouritesData).forEach(a => favouritesList.push(a["activity"]));

            // Update favourites hook
            setFavourites(favouritesList);
        } catch (e) {
            console.log("Failed to get patient data:\n", e)
        }
    }

    // Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [items, setItems] = useState([
        { label: "Favourites", value: "Favourites" },
        { label: "Cognitive Activities", value: "Cognitive Activities" },
        { label: "Creative Activities", value: "Creative Activities" },
        { label: "Engaging with Others", value: "Engaging with Others" },
        { label: "Music", value: "Music" },
        { label: "Physical Activities", value: "Physical Activities" },
        { label: "Relaxation", value: "Relaxation" },
    ]);
    const [category, setCategory] = useState<string>(route.params.category);
    const [activities, setActivities] = useState<string[]>([]);
    const [favourites, setFavourites] = useState<string[]>([]);

    // Update activity buttons
    const handleCategory = () => {
        let currentActivities: string[] = [];
        if (category === "Favourites") {
            Object.keys(activitiesData).map(key => {
                if (favourites.indexOf(key) > -1) {
                    currentActivities.push(key);
                }
            });
        } else {
            Object.keys(activitiesData).map(key => {
                if (activitiesData[key]["activityCategory"] === category) {
                    currentActivities.push(key);
                }
            });
        }

        setActivities(currentActivities);
        console.log("therefore current activities are", activities);
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavouritesData();
        }, [])
    );

    useEffect(() => {
        handleCategory();
    }, [favourites]);

    return (
        <View style={globalStyles.pageContainer}>
            <DropDownPicker
                style={globalStyles.dropdown}
                textStyle={FONTSTYLES.dropdownText}
                open={openDropdown}
                value={category}
                items={items}
                setOpen={setOpenDropdown}
                setValue={setCategory}
                setItems={setItems}
                placeholder={"Favourites"}
                onChangeValue={handleCategory}
            />

            <ScrollView style={globalStyles.scrollContainer}>
                <View style={{marginBottom:6}}>
                    {activities ? activities.map((activity, i) => {
                        return (
                            <ActivityButton key={i} navigation={navigation} patient={patient} activity={activity} favourited={favourites.indexOf(activity) > -1} />
                        )
                    }) :
                        <Text style={FONTSTYLES.subheaderText}>No Favourites Found</Text>}
                </View>
            </ScrollView>
        </View>
    )
}

export default Hobbies;
