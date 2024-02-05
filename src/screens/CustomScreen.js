import React, { useContext, useState } from 'react';
import { View, FlatList, Button, StyleSheet, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import {CustomDay, updateWarningDisplayed} from '../components/CustomDay';
import NavBar from '../components/NavBar';
import { Context as MesocycleContext } from '../context/MesocycleContext'; 
import { Context as DayContext } from '../context/DayContext'; 

const CustomScreen = ({ navigation }) => {
    const { state, addDay, removeDay, resetDays } = useContext(DayContext);
    const { generateMesocycle } = useContext(MesocycleContext);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ mesocycleTitle, setMesocycleTitle ] = useState('');

    const handleAddDay = () => {
        const newDay = { 
          title: `Day ${state.length + 1}`, 
          id: Math.floor(Math.random() * 9999), 
          exerciseDetails: [],  
        };
        addDay(newDay);
    };

    const handleRemoveDay = () => {
        if (state.length > 0) {
            removeDay(state[state.length - 1].id);
        }
    };

    const handleSaveMesocycle = () => {
        if (mesocycleTitle) {
            generateMesocycle(state, mesocycleTitle);
            setMesocycleTitle('');
            setModalVisible(false);
            updateWarningDisplayed(false);
            resetDays();
            navigation.navigate("Home");
        } else {
            alert('Please enter a title for the mesocycle.');
        }
    };

    return (
        <View style={styles.container}>
            <NavBar />          
            <FlatList
                style={styles.list} 
                data={state} 
                renderItem={({ item }) => <CustomDay title={item.title} id={item.id}/>}
                keyExtractor={item => item.id}
            />
            <View style={styles.buttonView}>
                <Button 
                  title="Add a day" 
                  onPress={handleAddDay} 
                  disabled={state.length >= 7} 
                />
                <Button 
                  title="Remove a day" 
                  onPress={handleRemoveDay} 
                  disabled={state.length <= 1} 
                />
                <Button 
                  title="Save Mesocycle" 
                  onPress={() => setModalVisible(true)} 
                />
            </View>  

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity
                    style={styles.modalOverlay} 
                    onPress={() => setModalVisible(false)} 
                >
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Enter Mesocycle Title"
                            onChangeText={(text) => setMesocycleTitle(text)}
                            value={mesocycleTitle}
                            style={styles.textInput}
                        />
                        <Button
                            title="Save"
                            onPress={handleSaveMesocycle}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  buttonView: {
    marginBottom: 10, 
    marginTop: 5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    padding: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  }
});

export default CustomScreen;
