import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mesocycleReducer = (state, action) => {
    switch (action.type) {
        case 'set_mesocycles':
            return action.payload;
        case 'reset_mesocycles':
            return [];
        case 'add_mesocycle':
            return [...state, action.payload];
        case 'update_mesocycle':
            return state.map((meso) => 
                meso._id === action.payload._id ? action.payload : meso
            );
        case 'delete_mesocycle':
            return state.filter((meso) => meso._id !== action.payload);
        default:
            return state;
    }
};

const saveMesocycles = async (mesocycles) => {
    try {
        await AsyncStorage.setItem('mesocycles', JSON.stringify(mesocycles));
    } catch (error) {
        console.error('Error saving mesocycles:', error);
    }
};

const loadMesocycles = async () => {
    try {
        const mesocyclesString = await AsyncStorage.getItem('mesocycles');
        return mesocyclesString ? JSON.parse(mesocyclesString) : [];
    } catch (error) {
        console.error('Error loading mesocycles:', error);
        return [];
    }
};

const setMesocycles = dispatch => async (mesocycles) => {
    await saveMesocycles(mesocycles);
    dispatch({ type: 'set_mesocycles', payload: mesocycles });
};

const resetMesocycles = dispatch => async () => {
    await AsyncStorage.removeItem('mesocycles');
    dispatch({ type: 'reset_mesocycles' });
};

const addMesocycle = dispatch => async (mesocycle) => {
    const currentMesocycles = await loadMesocycles();
    const updatedMesocycles = [...currentMesocycles, mesocycle];
    await saveMesocycles(updatedMesocycles);
    dispatch({ type: 'add_mesocycle', payload: mesocycle });
};

const updateMesocycle = dispatch => async (mesocycleId, updatedData) => {
    const currentMesocycles = await loadMesocycles();
    const updatedMesocycles = currentMesocycles.map((meso) => 
        meso._id === mesocycleId ? updatedData : meso
    );
    await saveMesocycles(updatedMesocycles);
    dispatch({ type: 'update_mesocycle', payload: updatedData });
};

const deleteMesocycle = dispatch => async (mesocycleId) => {
    const currentMesocycles = await loadMesocycles();
    const updatedMesocycles = currentMesocycles.filter((meso) => meso._id !== mesocycleId);
    await saveMesocycles(updatedMesocycles);
    dispatch({ type: 'delete_mesocycle', payload: mesocycleId });
};

const generateMesocycle = dispatch => async (initialWeek, mesocycleTitle ) => {
    let _id = Math.floor(Math.random() * 9999);
    let mesocycle = {mesocycleTitle, weeks: [], _id };

    for (let week = 1; week <= 6; week++) {
        let weekRoutine = initialWeek.map((day) => ({
            ...day,
            id: week > 1 ? Math.floor(Math.random() * 9999) : day.id,
            exerciseDetails: day.exerciseDetails.map((details) => ({
                _id: Math.floor(Math.random() * 99999).toString(),
                muscle: details.muscle,     
                name: details.exercise,
                weight: 5,
                sets: 2,
                repCounts: [],
            })),
        }));

        mesocycle.weeks.push({ days: weekRoutine });
    };

    addMesocycle(dispatch)(mesocycle);
};

export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { setMesocycles, resetMesocycles, addMesocycle, updateMesocycle, deleteMesocycle, generateMesocycle },
    []
);
