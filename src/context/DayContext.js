import createDataContext from './createDataContext';

const dayReducer = (state, action) => {
    switch(action.type){
      case 'add_day':
        return [...state, action.payload];
      case 'remove_day':
        return state.filter(day => day.id !== action.payload);
      case 'update_day':
        return state.map(day => {
          if (day.id === action.payload.id) {
            return action.payload;
          }
          return day;
        });
      default:
        return state;
    }
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

const initialState = [
        {
            title: "Day 1",
            id: Math.floor(Math.random() * 9999),
            muscleGroups: [],
        },
];

export const {Context, Provider} = createDataContext(
    dayReducer,
    { addDay: addDay, removeDay: removeDay, updateDay: updateDay, },
    initialState
);

