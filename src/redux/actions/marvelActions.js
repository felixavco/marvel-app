import axios from 'axios';
import { GET_CHARACTERS, GET_ERRORS, GET_ONE_CHARACTER, GET_ONE_COMIC, GET_ONE_STORY } from '../types';
import { url } from '../../utils';

/**
 * @Method: GET
 * @Desc: Returns list of of all Characters
 */
export const getCharacters = (limit, offset) => (dispatch) => {

    axios
        .get(url('/characters', `&limit=${limit}&offset=${offset}`))
        .then(res => {
            dispatch({
                type: GET_CHARACTERS,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });

}

/**
 * @Method: GET
 * @Desc: Returns a single character by its ID
 */
export const getSingleCharacter = (id) => (dispatch) => {

    axios
        .get(url(`/characters/${id}`))
        .then(res => {
            dispatch({
                type: GET_ONE_CHARACTER,
                payload: res.data.data.results
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

/**
 * @Method: GET
 * @Desc: Returns a single Comic by its ID
 */
export const getSingleComic = (id) => (dispatch) => {

    axios
        .get(url(`/comics/${id}`))
        .then(res => {
            dispatch({
                type: GET_ONE_COMIC,
                payload: res.data.data.results
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

/**
 * @Method: GET
 * @Desc: Returns a single Story by its ID
 */
export const getSingleStory = (id) => (dispatch) => {

    axios
        .get(url(`/stories/${id}`))
        .then(res => {
            dispatch({
                type: GET_ONE_STORY,
                payload: res.data.data.results
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}