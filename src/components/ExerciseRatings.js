import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const ExerciseRatings = ({ isVisible, onClose, onSaveRatings}) => {
    const [sorenessRating, setSorenessRating] = useState(0);
    const [pumpRating, setPumpRating] = useState(0);

    const handleSave = () => {
        onSaveRatings( sorenessRating, pumpRating );
        onClose();
    };

    const RatingButton = ({ title, value, currentRating, setRating }) => (
        <TouchableOpacity
            style={[
                styles.ratingButton,
                { backgroundColor: value === currentRating ? '#ddd' : 'white' }
            ]}
            onPress={() => setRating(value)}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Soreness Level</Text>
                    <View style={styles.ratingContainer}>
                        <RatingButton title="None" value={1} currentRating={sorenessRating} setRating={setSorenessRating} />
                        <RatingButton title="Some" value={0} currentRating={sorenessRating} setRating={setSorenessRating} />
                        <RatingButton title="Very Sore" value={-1} currentRating={sorenessRating} setRating={setSorenessRating} />
                    </View>

                    <Text style={styles.modalText}>Pump Level</Text>
                    <View style={styles.ratingContainer}>
                        <RatingButton title="None/Very Little" value={1} currentRating={pumpRating} setRating={setPumpRating} />
                        
                        <RatingButton title="Good/Insane" value={0} currentRating={pumpRating} setRating={setPumpRating} />
                    </View>

                    <Button title="Save Ratings" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)' 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    ratingButton: {
        padding: 10,
        borderRadius: 10,
    },
});

export default ExerciseRatings;
