import axios from 'axios';
import { GET_ERRORS, GET_CHARACTERS, GET_ONE_CHARACTER, GET_COMICS, GET_ONE_COMIC, GET_STORIES, GET_ONE_STORY, ON_SEARCH } from '../types';
import { url } from '../../utils';

/**
 * @Method: GET
 * @Desc: Returns list of of all Characters
 */
export const getCharacters = (limit, offset, filter = true) => (dispatch) => {

    axios
        .get(url('/characters', `&limit=${limit}&offset=${offset}&orderBy=${filter ? 'name' : '-name'}`))
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
 * @Desc: Returns list of of all Comics
 */
export const getComics = (limit, offset, formatType, displayBy, orderBy) => (dispatch) => {

    axios
        .get(url('/comics', `&limit=${limit}&offset=${offset}&formatType=${formatType}&orderBy=${orderBy ? '' : '-'}${displayBy}`))
        .then(res => {
            dispatch({
                type: GET_COMICS,
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
 * @Desc: Returns list of of all Comics
 */
export const getStories = (limit, offset) => (dispatch) => {

    axios
        .get(url('/stories', `&limit=${limit}&offset=${offset}`))
        .then(res => {
            dispatch({
                type: GET_STORIES,
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

/**
 * @Method: GET
 * @Desc: Returns a list of characters that matches the search term. 
 */
export const onSearch = (value) => (dispatch) => {
    axios
        .get(url('/characters', `&limit=100&offset=0&orderBy=name&nameStartsWith=${value}`))
        .then(res => {
            dispatch({
                type: ON_SEARCH,
                payload: { data: res.data.data, searchTerm: value }
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}