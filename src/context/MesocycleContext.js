//MesoCycleContext.js
import createDataContext from './createDataContext';
import axiosServer from '../api/axiosServer';
import applyProgressiveOverload from '../helpers/applyProgressiveOverload';

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

const setMesocycles = dispatch => mesocycles => {
    dispatch({ type: 'set_mesocycles', payload: mesocycles });
};

const resetMesocycles = dispatch => () => {
    dispatch({ type: 'reset_mesocycles' });
};

const addMesocycle = dispatch => async mesocycle => {
    try {
        const response = await axiosServer.post('/mesocycles', mesocycle);
        dispatch({ type: 'add_mesocycle', payload: response.data });
    } catch (error) {
        console.error('Error adding mesocycle:', error);
    }
};

const updateMesocycle = dispatch => async (mesocycleId, updatedData) => {
    try {
        const response = await axiosServer.put(`/mesocycles/${mesocycleId}`, updatedData);
        dispatch({ type: 'update_mesocycle', payload: response.data });
    } catch (error) {
        console.error('Error updating mesocycle:', error);
    }
};

const deleteMesocycle = dispatch => async mesocycleId => {
    try {
        await axiosServer.delete(`/mesocycles/${mesocycleId}`);
        dispatch({ type: 'delete_mesocycle', payload: mesocycleId });
    } catch (error) {
        console.error('Error deleting mesocycle:', error);
    }
};

const generateMesocycle = dispatch => async initialWeek => {
    let mesocycle = { weeks: [] };

    for (let week = 1; week <= 6; week++) {
        let weekRoutine = initialWeek.map((day) => ({
            ...day,
            id: week > 1 ? Math.floor(Math.random() * 9999) : day.id,
            muscleGroups: day.muscleGroups.map((group) => ({
                muscle: group.muscle,     
                name: group.exercise,
                weight: 5,
                sets: 2,
                repCounts: [],
                
            })),
        }));

        mesocycle.weeks.push({ days: weekRoutine });
    };

    try {
        const response = await axiosServer.post('/mesocycles', mesocycle);
        dispatch({ type: 'add_mesocycle', payload: response.data });
    } catch (error) {
        console.error('Error generating mesocycle:', error);
    }
};

export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { setMesocycles, resetMesocycles, addMesocycle, updateMesocycle, deleteMesocycle, generateMesocycle },
    []
);
