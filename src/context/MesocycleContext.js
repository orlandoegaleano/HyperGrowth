import createDataContext from './createDataContext';
import applyProgressiveOverload from '../helpers/applyProgressiveOverload';

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
                days: state.days.map((day) => {
                if (day.id === action.payload.id) {
                    // If the payload includes muscleGroups, update them
                    if (action.payload.muscleGroups) {
                    return {
                        ...day,
                        muscleGroups: action.payload.muscleGroups,
                    };
                    }
                    // Otherwise, return the updated day as is
                    return action.payload;
                }
                return day;
                }),
            };              
        case 'update_exercise_details':
            return {
                ...state,
                mesocycle: state.mesocycle.map((week, index) => {
                    if (index === action.payload.weekIndex) {
                        return week.map(day => {
                            if (day.title === action.payload.dayTitle) {
                                return {
                                    ...day,
                                    muscleGroups: day.muscleGroups.map(group => {
                                        if (group.exercise === action.payload.exercise) {
                                            return { ...group, ...action.payload.details };
                                        }
                                        return group;
                                    })
                                };
                            }
                            return day;
                        });
                    }
                    return week;
                })
            };
        case 'generate_mesocycle':
            return {...state,
                mesocycle: action.payload
            };        
        default:
            return state;
    };
};

const generateMesocycle = dispatch => {
    return (initialWeek) => {

        let mesocycle = [];

        for (let week = 1; week <=6; week++) {
            let weekRoutine = initialWeek.map((day) => ({
                ...day,                
                id: week > 1 ? Math.floor(Math.random() * 9999) : day.id,
                muscleGroups: day.muscleGroups.map((group) => ({
                    ...group,
                    weight: 5,
                    sets: 2,
                    repCounts: [],
                }))
            }));

            if (week > 1){
                applyProgressiveOverload(weekRoutine, mesocycle[ week - 2 ]);
            };

            mesocycle.push(weekRoutine);
        };
        dispatch({type: 'generate_mesocycle', payload: mesocycle});
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
    return (weekIndex, dayTitle, exercise, details) => {
      dispatch({ type: 'update_exercise_details', payload: { weekIndex, dayTitle, exercise, details }});
    };
  }; 

//Initializing mock data for easier testing
const initialState = {
    days: [
        {
            title: "Day 1",
            id: Math.floor(Math.random() * 9999),
            muscleGroups: [ 
            // { muscle: 'Chest', exercise: 'Bench Press', weight: '100', sets: '2' },
            // { muscle: 'Back', exercise: 'Normal Grip Pullup', weight: '150', sets: '2' },
            ],
        },
        // {
        //     title: "Day 2",
        //     id: Math.floor(Math.random() * 9999),
        //     muscleGroups: [
        //     { muscle: 'Glutes', exercise: 'Machine Glute Kickback', weight: '65', sets: '2' },
        //     { muscle: 'Quads', exercise: 'Leg Press', weight: '120', sets: '2' },
        //     ],
        // },
    ],
    mesocycle: [],
  };

export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { addDay: addDay, removeDay: removeDay, updateDay: updateDay, updateExerciseDetails: updateExerciseDetails, generateMesocycle: generateMesocycle,  },
    initialState
);
