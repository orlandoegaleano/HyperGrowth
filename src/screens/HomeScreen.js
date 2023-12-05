import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import MesocycleList from '../components/MesocycleList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios directly
import axiosServer from '../api/axiosServer';

const YOUR_MESOCYCLE = "Your Mesocycles";
const SIGN_OUT_TEXT = "Sign Out";

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const { state, setMesocycles, resetMesocycles } = useContext(MesocycleContext);
  const [loading, setLoading] = useState(true);
  const { state: authState } = useContext(AuthContext);

  const cancelTokenSource = useRef(null);

  useEffect(() => {
    cancelTokenSource.current = axios.CancelToken.source(); // Use axios.CancelToken.source here

    const fetchMesocycles = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axiosServer.get('/mesocycles', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cancelToken: cancelTokenSource.current.token, // Pass the cancel token to the request
          });
          setMesocycles(response.data);
        }
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) { // Use axios.isCancel here
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching mesocycles:', error);
        }
        setLoading(false);
      }
    };

    fetchMesocycles();

    return () => {
      cancelTokenSource.current && cancelTokenSource.current.cancel('Component unmounted.');
    };
  }, [authState.token]);

  const handleSignOut = async () => {
    cancelTokenSource.current && cancelTokenSource.current.cancel('User signed out.');
    await signOut(resetMesocycles);
  };

  const handleMesocycleSelect = (mesocycle) => {
    navigation.navigate('Workout', mesocycle);
  };

  return (
    <View style={{ flex: 1 }}> 
      <NavBar />
      <Text style={styles.text}>Welcome User</Text>
      <Text style={styles.yourRoutineText}>{YOUR_MESOCYCLE}</Text>

      {loading ? (
        <Text>Loading Mesocycles...</Text>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <MesocycleList mesocycles={state} onMesocycleSelect={handleMesocycleSelect} />
        </ScrollView>
      )}

      <View style={styles.buttonContainer}> 
        <Button
          title={'Add a Routine'}
          onPress={() => navigation.navigate('AddRoutine')}
        />

        <TouchableOpacity
          style={styles.signOutContainer}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>{SIGN_OUT_TEXT}</Text>
        </TouchableOpacity>
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
  yourRoutineText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    padding: 10,
  },
  signOutContainer: {
    margin: 15,
  },
  signOutText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
  },
});

export default HomeScreen;
