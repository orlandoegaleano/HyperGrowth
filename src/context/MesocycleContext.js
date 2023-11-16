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
                days: state.days.map((day) => day.id === action.payload.id ? action.payload : day )
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
        case 'generate_mesocycle':
            return {...state,
                sixWeekCycle: action.payload
            };        
        default:
            return state;
    };
};

const deepCopyDay = (day, weekNumber) => {
    return {
        title: day.id,
        id: Math.floor(Math.random * 9999),
        muscleGroups: day.muscleGroups.map((group) => ({
            muscle: group.muscle,
            exercise: group.exercise,
            weight: group.weight,
            sets: group.sets,
        }))
    };

};
const applyProgressiveOverload = (currentWeekRoutine, previousWeekRoutine) => {
    // Iterating over each day in the week
    currentWeekRoutine.forEach((day, index) => {

        const previousWeekDay = previousWeekRoutine[index];
  
      // Iterating over each exercise of the day
      // Each "group" in the array muscleGroups contains props: muscle, exercise, weight, and sets
      day.muscleGroups.forEach(group => {

        const previousExercise = previousWeekDay.muscleGroups.find(prevWeekGroup => prevWeekGroup.exercise === group.exercise);

        // Implementing logic to calculate changes to weight or sets for progressive overloading
        if (previousExercise) {
  
          group.weight = calculateNewWeight(previousExercise.weight);
          group.sets = calculateNewSets(previousExercise.sets);
        }
      });
    });
  
    return currentWeekRoutine;
  };
  
const calculateNewWeight = (previousWeight) => {
    return Number(previousWeight) + 5;

};
const calculateNewSets = (previousSets) => {
    return Number(previousSets) + 1;

};

const generateMesocycle = dispatch => {
    return (initialWeek) => {

        let sixWeekCycle = [];

        for (let week = 1; week <=6; week++) {
            let weekRoutine = initialWeek.map((day) => deepCopyDay(day, week));

            if (week > 1){
                applyProgressiveOverload(weekRoutine, sixWeekCycle[ week - 2 ]);
            };

            sixWeekCycle.push(weekRoutine);
        };
        dispatch({type: 'generate_mesocycle', payload: sixWeekCycle});
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
            { muscle: 'Chest', exercise: 'Bench Press', weight: '100', sets: '2' },
            { muscle: 'Back', exercise: 'Normal Grip Pullup', weight: '150', sets: '2' },
            ],
        },
        {
            id: '2',
            muscleGroups: [
            { muscle: 'Glutes', exercise: 'Machine Glute Kickback', weight: '65', sets: '2' },
            { muscle: 'Quads', exercise: 'Leg Press', weight: '120', sets: '2' },
            ],
        },
    ],
    sixWeekCycle: [],
  };

export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { addDay: addDay, removeDay: removeDay, updateDay: updateDay, updateExerciseDetails: updateExerciseDetails, generateMesocycle: generateMesocycle },
    initialState
);
