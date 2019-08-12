import { TOGGLE_NAV, TOGGLE_SUB_MENU, SET_FAB_CHAR } from '../types';

export const toggleMenu = (isActive) => (dispatch) => {
    dispatch({
        type: TOGGLE_NAV,
        payload: !isActive
    });
}

export const toggleSubMenu = (isActive) => (dispatch) => {
    dispatch({
        type: TOGGLE_SUB_MENU,
        payload: !isActive
    });
}

export const setFavorite = (character) => (dispatch) => {
    const LS = localStorage.favorites;

    if(LS && LS.length > 0) {
        /*
            If localStorage already
            has elements add the new element to the existin array of favorites
        */
        const favArr = JSON.parse(LS);
        if(favArr.filter(fav => fav.id === character.id).length < 1) {
            const updatedFavArr = [...favArr, character];
            localStorage.setItem('favorites', JSON.stringify(updatedFavArr));
        }
    } else {
        //**If localStorage is empty store the first value
        const newFavArr = [character];
        localStorage.setItem('favorites', JSON.stringify(newFavArr));
    }

    dispatch({
        type: SET_FAB_CHAR,
        payload: JSON.parse(localStorage.getItem('favorites'))
    });
}

export const removeFavorite = (id) => (dispatch) => {
    const LS = localStorage.getItem('favorites');

    if(LS && LS.length > 0) {
        const favArr = JSON.parse(LS);
        const updatedFavArr = favArr.filter(item => item.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavArr))
    }

     dispatch({
        type: SET_FAB_CHAR,
        payload: JSON.parse(localStorage.getItem('favorites'))
    });
}