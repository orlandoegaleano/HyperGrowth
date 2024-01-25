import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import MesocycleList from '../components/MesocycleList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YOUR_MESOCYCLE = "Your Mesocycles";

const HomeScreen = ({ navigation }) => {
    const { state, setMesocycles, resetMesocycles, deleteMesocycle } = useContext(MesocycleContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMesocycles = async () => {
            try {
                const mesocyclesString = await AsyncStorage.getItem('mesocycles');
                const mesocycles = mesocyclesString ? JSON.parse(mesocyclesString) : [];
                setMesocycles(mesocycles);
            } catch (error) {
                console.error('Error fetching mesocycles:', error);
            }
            setLoading(false);
        };

        fetchMesocycles();
    }, []);

    const handleMesocycleSelect = (mesocycle) => {
        navigation.navigate('Workout', mesocycle);
    };

    return (
        <View style={{ flex: 1 }}>
            <NavBar />
            <Text style={styles.yourMesocyclesText}>{YOUR_MESOCYCLE}</Text>

            {loading ? (
                <Text>Loading Mesocycles...</Text>
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <MesocycleList 
                        mesocycles={state} 
                        onMesocycleSelect={handleMesocycleSelect}
                        onDeleteMesocycle={deleteMesocycle} 
                    />
                </ScrollView>
            )}

            <View style={styles.buttonContainer}>
                <Button
                    title={'Add a Routine'}
                    onPress={() => navigation.navigate('AddRoutine')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        textAlign: 'center',
        marginVertical: 20,
    },
    yourMesocyclesText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 30,
    },
    buttonContainer: {
        padding: 10,
    }
});

export default HomeScreen;
