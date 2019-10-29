import axios from 'axios';
import { CHARACTER, COMIC, STORY } from '../types';
import { url } from '../../utils';
import store from '../store';
const { dispatch } = store;


const charactersActions = {
    getList: async (limit, offset, filter = true) => {
        try {
            const params = `&limit=${limit}&offset=${offset}&orderBy=${filter ? 'name' : '-name'}`;
            const res = await axios.get(url('/characters', params));
            dispatch({ type: CHARACTER.GET_ALL, payload: res.data.data });
        } catch (error) {
            dispatch({ type: CHARACTER.SET_ERROR, payload: error });
        }
    },

    getOne: async id => {
        try {
            const res = await axios.get(url(`/characters/${id}`));
            dispatch({ type: CHARACTER.GET_ONE, payload: res.data.data.results });
        } catch (error) {
            dispatch({ type: CHARACTER.SET_ERROR, payload: error });
        }
    },

    onSearch: async value => {
        try {
            const params = `&limit=100&offset=0&orderBy=name&nameStartsWith=${value}`;
            const res = await axios.get(url('/characters', params));
            dispatch({ type: CHARACTER.ON_SEARCH, payload: { data: res.data.data, searchTerm: value } });
        } catch (error) {
            dispatch({ type: CHARACTER.SET_ERROR, payload: error });
        }
    }
}

const comicsActions = {
    getList: async (limit, offset, formatType, displayBy, orderBy) => {
        try {
            const params = `&limit=${limit}&offset=${offset}&formatType=${formatType}&orderBy=${orderBy ? '' : '-'}${displayBy}`;
            const res = axios.get(url('/comics', params));
            dispatch({ type: COMIC.GET_ALL, payload: res.data.data });

        } catch (error) {
            dispatch({ type: COMIC.SET_ERROR, payload: error });
        }

    },
    getOne: async (id) => {
        try {
            const res = await axios.get(url(`/comics/${id}`))
            dispatch({ type: GET_ONE_COMIC, payload: res.data.data.results });
        } catch (error) {
            dispatch({ type: COMIC.SET_ERROR, payload: error });
        }

    }
}

const storiesActions = {
    getList: async (limit, offset) => {
        try {
            const params = `&limit=${limit}&offset=${offset}`;
            const res = await axios.get(url('/stories', params));
            dispatch({ type: STORY.GET_ALL, payload: res.data.data });
        } catch (error) {
            dispatch({ type: STORY.SET_ERROR, payload: error });
        }
    },
    getOne: async id => {
        try {
            const res = await axios.get(url(`/stories/${id}`));
            dispatch({ type: STORY.GET_ONE, payload: res.data.data.results });
        } catch (error) {
            dispatch({ type: STORY.SET_ERROR, payload: error });
        }
    }
}

export { charactersActions, comicsActions, storiesActions };
