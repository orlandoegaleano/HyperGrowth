import createDataContext from './createDataContext';
import applyProgressiveOverload from '../helpers/applyProgressiveOverload';

const mesocycleReducer = (state, action) => {
    switch(action.type){
        
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
                                            return {
                                                    ...group, 
                                                    ...action.payload.details 
                                            };
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



const updateExerciseDetails = dispatch => {
    return (weekIndex, dayTitle, exercise, details) => {
      dispatch({ type: 'update_exercise_details', payload: { weekIndex, dayTitle, exercise, details }});
    };
}; 



export const { Context, Provider } = createDataContext(
    mesocycleReducer,
    { updateExerciseDetails: updateExerciseDetails, generateMesocycle: generateMesocycle, },
    []
);
