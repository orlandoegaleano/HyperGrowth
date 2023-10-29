import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const YouTubeButton = ({ muscle, exercise, exercises }) => {
    const openYouTubeLink = (watchID) => {
        // Check if the provided URL can be opened
        const url = "https://www.youtube.com/watch?v="+ watchID

        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            // If we can open the URL, do it
            Linking.openURL(url); 
          } else {
            console.error('Unable to open URI: ' + watchID);
          }
        });
      };
      const handlePress = () => {
        // Check if both a muscle group and an associated exercise have been selected by the user
        if (muscle && exercise) {
            // If both muscle group and exercise are selected, find the YouTube link associated with the selected exercise
            // 'exercises' is an object where each key is a muscle group and its value is an array of exercise objects.
            // We first access the array of exercises associated with the selected muscle group.
            // Then, we find the exercise object who's name matches the selected exercise.
            // Finally, we retrieve the 'link' property from that exercise object.
            const exerciseLink = exercises[muscle].find(e => e.name === exercise).link;
            openYouTubeLink(exerciseLink);
        } else {
            // If either the muscle group or the exercise is not selected, show an error alert prompting the user to select an exercise
            alert('Please select an exercise first.');
        }
    };
    
    return (
        <TouchableOpacity style={{flex: 1}} onPress={handlePress}>
            <Entypo name='youtube' size={30} color='#000'/>
        </TouchableOpacity>
    );
       
};
export default YouTubeButton;