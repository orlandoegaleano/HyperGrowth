import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';  
import CustomDay from '../components/CustomDay';

const CustomScreen = () => {    
    // CustomDaysArray contains the array of CustomDays which takes in an id as props.
    const [CustomDaysArray, setCustomDaysArray] = useState([{id:'1'}]);    
    // dayID tracks the ID of the next day to be added.
    const [dayID, setDayID] = useState(2);

    const addDay = () => {
        //Adding a new object to the CustomDaysArray with the current dayID increment
        setCustomDaysArray(prevDays => [...prevDays, {id: dayID}]);      
        setDayID(prevID => prevID + 1);
    };

    const removeDay = () => {
        if (CustomDaysArray.length > 0) {
            // Remove the last day from the CustomDaysArray array using slice.
            setCustomDaysArray(prevDays => prevDays.slice(0, prevDays.length - 1));            
            setDayID(prevID => prevID - 1);
        }
    };

    return (
        <View style={styles.container}>          
            <FlatList
                style={styles.list} 
                data={CustomDaysArray} 
                renderItem={({ item }) => <CustomDay id={item.id} />}  // Render each day using the CustomDay component.
                keyExtractor={item => item.id}
            />
            <View style={{marginBottom: 10, marginTop: 5}}>
              <View style={styles.buttonContainer}>
                <Button 
                  title="Add a day" 
                  onPress={addDay} 
                  disabled={CustomDaysArray.length >= 7} 
                />
              </View>
              <View style={styles.buttonContainer}>              
                <Button 
                  title="Remove a day" 
                  onPress={removeDay} 
                  disabled={CustomDaysArray.length <= 1} 
                />
              </View>
            </View>   
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list:{
    flex:1
  },
  buttonContainer:{
    margin: 5,
  },
});

export default CustomScreen;
