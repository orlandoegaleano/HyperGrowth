import createDataContext from './createDataContext';

const mesocycleReducer = (state, action) => {
    switch(action.type){
        case 'add_day':
            return {
                ...state,
                days: [...state.days, action.payload]
            };
        case 'remove_day':
            return {
                ...state,
                days: state.days.filter((day) => day.id !== action.payload)
            };
        case 'update_day':
            return {
                ...state,
                days: state.days.map((day) => day.id === action.payload.id ? action.payload : day
                )
            };
        case 'update_exercise_details':
            return {
                ...state,
                days: state.days.map((day) => {
                if (day.id === action.payload.dayID) {
                    return {
                    ...day,
                    muscleGroups: day.muscleGroups.map((pair) => {
                        if (pair.exercise === action.payload.exercise) {
                        return { ...pair, ...action.payload.details };
                        }
                        return pair;
                    })
                    };
                }
                return day;
                }),
            };        
        default:
            return state;
    };
};

const addDay = dispatch => {
    return (day) => {
        dispatch({ type: 'add_day', payload: day });
    };
};

const removeDay = dispatch => {
    return (id) => {
        dispatch({ type: 'remove_day', payload: id });
    };
};

const updateDay = dispatch => {
    return (day) => {
        dispatch({ type: 'update_day', payload: day });
    };
};

const updateExerciseDetails = dispatch => {
    return (dayID, exercise, details) => {
      dispatch({ type: 'update_exercise_details', payload: { dayID, exercise, details }});
    };
  };

//Initializing mock data for easier testing
const initialState = {
    days: [
      {
        id: '1',
        muscleGroups: [
          { muscle: 'Chest', exercise: 'Bench Press' },
          { muscle: 'Back', exercise: 'Normal Grip Pullup' },
        ],
      },
      {
        id: '2',
        muscleGroups: [
          { muscle: 'Glutes', exercise: 'Machine Glute Kickback' },
          { muscle: 'Quads', exercise: 'Leg Press' },
        ],
      },
    ],
  };

export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { addDay: addDay, removeDay: removeDay, updateDay: updateDay, updateExerciseDetails: updateExerciseDetails },
    initialState
);
