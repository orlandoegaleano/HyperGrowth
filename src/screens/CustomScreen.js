import React, { useContext } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';  
import CustomDay from '../components/CustomDay';
import { Context as MesocycleContext } from '../context/MesocycleContext'; // Import your context


const CustomScreen = ({ navigation }) => {    
    // Use the context to get state and actions.
    const { state: { days }, addDay, removeDay, generateMesocycle } = useContext(MesocycleContext);
    
    // Add a new day using the context action.
    const handleAddDay = () => {
        // Create a new day with a unique id.
        const newDay = { id: String(days.length + 1) };
        addDay(newDay);
    };

    // Remove a day using the context action.
    const handleRemoveDay = () => {
        if (days.length > 0) {
            // Use the id of the last day for removal.
            removeDay(days[days.length - 1].id);
        }
    };

    return (
        <View style={styles.container}>          
            <FlatList
                style={styles.list} 
                data={days} 
                renderItem={({ item }) => <CustomDay id={item.id}/>}
                keyExtractor={item => item.id}
            />
            <View style={styles.buttonView}>
                <Button 
                  title="Add a day" 
                  onPress={handleAddDay} 
                  disabled={days.length >= 7} 
                />
                <Button 
                  title="Remove a day" 
                  onPress={handleRemoveDay} 
                  disabled={days.length <= 1} 
                />
                <Button 
                  title="Save Mesocycle" 
                  onPress={() => {generateMesocycle(days); navigation.navigate("Workout")}}
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
