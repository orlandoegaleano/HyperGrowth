import React, { useContext } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';  
import CustomDay from '../components/CustomDay';
import { Context as MesocycleContext } from '../context/MesocycleContext'; 
import { Context as DayContext } from '../context/DayContext'; 


const CustomScreen = ({ navigation }) => {    
    // Use the context to get state and actions.
    const { state, addDay, removeDay } = useContext(DayContext);
    const { generateMesocycle } = useContext(MesocycleContext)
    
    // Add a new day using the context action.
    const handleAddDay = () => {
        // Create a new day with a unique id.
        const newDay = { 
          title: `Day ${state.length + 1}`, 
          id: Math.floor(Math.random() * 9999), 
          muscleGroups: [],  
        };
        addDay(newDay);
    };

    // Remove a day using the context action.
    const handleRemoveDay = () => {
        if (state.length > 0) {
            // Use the id of the last day for removal.
            removeDay(state[state.length - 1].id);
        }
    };

    return (
        <View style={styles.container}>          
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
                  onPress={() => {generateMesocycle(state); navigation.navigate("Workout")}}
                />
            </View>   
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
});

export default CustomScreen;
