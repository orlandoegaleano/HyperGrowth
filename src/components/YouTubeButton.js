import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import YoutubePlayer from 'react-native-youtube-iframe';
import {exercises} from './exercises';

// exercises is the const exercises.js (key: muscle, value: exercise) from component folder
const YouTubeButton = ({ muscle, exercise }) => {
    
    // Creating a state variable 'showVideo' to manage the visibility of the video player. Initialize it as false.
    const [showVideo, setShowVideo] = useState(false);    
    // Creating a state variable 'videoId' to store the video ID of the YouTube video. Initialize it as null.
    const [videoId, setVideoId] = useState(null);

    // Defining the 'handlePress' function which will be executed when the YouTubeButton is pressed.
    const handlePress = () => {
        // Check if both a muscle group and an associated exercise have been selected by the user.
        if (muscle && exercise) {
            // If both muscle group and exercise are selected, find the YouTube link associated with the selected exercise.
            // 'exercises' is an object where each key is a muscle group and its value is an array of exercise objects.
            // We first access the array of exercises associated with the selected muscle group.
            // Then, we find the exercise object who's name matches the selected exercise.
            // Finally, we retrieve the 'link' property from that exercise object.
            const exerciseLink = exercises[muscle].find(e => e.name === exercise).link;
            setVideoId(exerciseLink);
            setShowVideo(true);
        } else {
            // If either the muscle group or the exercise is not selected, show an error alert prompting the user to select an exercise.
            alert('Please select an exercise first.');
        }
    };

    return (
        <View>
            {/* Display the 'youtube' icon from the 'Entypo' icon set.*/}
            <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
                <Entypo name='youtube' size={50} color='#000' />
            </TouchableOpacity>

            {/* Conditional rendering: If 'showVideo' is true, display the 'Modal' component to play the YouTube video.*/}
            {showVideo && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={showVideo}
                >
                    <View style={styles.modalView}>
                        {/* The 'YoutubePlayer' component plays the YouTube video.*/}
                        <YoutubePlayer
                            height={300}
                            width={300}
                            play={true}
                            videoId={videoId}
                            onChangeState={event => {
                                // If the video ends, hide the modal.
                                if (event === "ended") setShowVideo(false);
                            }}
                        />
                        {/*Displaying the 'x' icon in the top right of the Modal*/}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowVideo(false)}>
                            <Entypo name='cross' size={50} color='#000' />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'  // Semi-transparent black background
    },
    closeButton: {
        position: 'absolute',   // Absolute positioning to place it over the modal
        top: 10,
        right: 10,
    }
});

export default YouTubeButton;
