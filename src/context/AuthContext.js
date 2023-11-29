import createDataContext from "./createDataContext";
import {navigate} from '../navigationRef';
import trackerAPI from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
        
        case 'signup':
            return {errorMessage: '', token: action.payload}
        
        case 'signin':
            return {errorMessage: '', token: action.payload}

        case 'signout':
            return {token: null, errorMessage: ''}

        case 'clear_error_message':
            return {...state, errorMessage: ''}

        default: state;
    }
};

const signUp = (dispatch) => {
    return async ({email, password}) => {
        try {
            const response = await trackerAPI.post('/signup', {email, password});

            await AsyncStorage.setItem('token', response.data.token);
            //await AsyncStorage.getItem('token');
            dispatch({type: 'signup', payload: response.data.token});
            navigate('Home');
        }catch(err){
            dispatch({type: 'add_error', payload: "something went wrong with sign up"})
            console.log(err.message);
        }
    }
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'})
    }
}

const signIn = (dispatch) => {
    return async ({email, password}) => {
        try {
            const response = await trackerAPI.post('/signin', {email, password});

            await AsyncStorage.setItem('token', response.data.token);
            //await AsyncStorage.getItem('token');
            dispatch({type: 'signin', payload: response.data.token});
            navigate('Home');

        }catch(err){
            dispatch({type: 'add_error', payload: "something went wrong with signing in"})
            console.log(err.message);
        }
    }
};

const signOut = (dispatch) => {
    return async () => {
            await AsyncStorage.removeItem('token');
            dispatch({type: 'signout'});
            navigate('Login');
    }
};

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            dispatch({type: 'signIn', payload: token});
            navigate("Home");
        } 
        
        else{
            navigate("Login");
        }
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signUp, signIn, signOut, clearErrorMessage, tryLocalSignin},
    {token: false, errorMessage: ''}
);