import createDataContext from "./createDataContext";
import { navigate } from '../navigationRef';
import axiosServer from "../api/axiosServer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'signout':
            return { token: null, errorMessage: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default: 
            return state;
    }
};

const signUp = dispatch => async ({ firstName, lastName, email, password }) => {
    try {
        const response = await axiosServer.post('/signup', { firstName, lastName, email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token });
        navigate('Home');
    } catch (err) {
        dispatch({ type: 'add_error', payload: "Something went wrong with sign up" });
        console.log(err.message);
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const signIn = dispatch => async ({ email, password }) => {
    try {
        const response = await axiosServer.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('Home');
    } catch (err) {
        dispatch({ type: 'add_error', payload: "Something went wrong with signing in" });
        console.log(err.message);
    }
};

const signOut = dispatch => async (resetMesocycles) => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    resetMesocycles();
    navigate('Login');
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate("Home");
    } else {
        navigate("Login");
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signIn, signOut, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);
