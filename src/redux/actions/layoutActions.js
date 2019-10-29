import { LAYOUT, CHARACTER, COMIC } from '../types';
import store from '../store';
const { dispatch } = store

export const layoutActions = {
    toggleMenu: isActive => {
        dispatch({ type: LAYOUT.TOGGLE_NAV, payload: !isActive });
    },
    toggleSubMenu: isActive => {
        dispatch({ type: LAYOUT.TOGGLE_SUB_MENU, payload: !isActive });
    },
    setFavorite: character => {
        const LS = localStorage.favorites;
    
        if (LS && LS.length > 0) {
            /*
                If localStorage already
                has elements add the new element to the existin array of favorites
            */
            const favArr = JSON.parse(LS);
            if (favArr.filter(fav => fav.id === character.id).length < 1) {
                const updatedFavArr = [...favArr, character];
                localStorage.setItem('favorites', JSON.stringify(updatedFavArr));
            }
        } else {
            //**If localStorage is empty store the first value
            const newFavArr = [character];
            localStorage.setItem('favorites', JSON.stringify(newFavArr));
        }
    
        dispatch({
            type: CHARACTER.SET_FAV,
            payload: JSON.parse(localStorage.getItem('favorites'))
        });
    },
    removeFavorite: id => {
        const LS = localStorage.getItem('favorites');
    
        if (LS && LS.length > 0) {
            const favArr = JSON.parse(LS);
            const updatedFavArr = favArr.filter(item => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavArr))
        }
    
        dispatch({
            type: CHARACTER.SET_FAV,
            payload: JSON.parse(localStorage.getItem('favorites'))
        });
    },
    setCharFilter: filterState => {
        const LS = localStorage.preferences;
    
        if (LS) {
            //Current preferences values
            let preferences = JSON.parse(LS);
            //Change value of the Character filter
            preferences[0] = !filterState;
            localStorage.setItem('preferences', JSON.stringify(preferences));
    
            dispatch({
                type: CHARACTER.SET_FILTER,
                payload: JSON.parse(localStorage.preferences)[0]
            });
        }
    }, 
    setComicFilter: (formatType, displayBy, orderBy) => {
        const LS = localStorage.preferences;
    
        if (LS) {
            //Current preferences values
            let preferences = JSON.parse(LS);
    
            //Change the values 
            preferences[1] = formatType;
            preferences[2] = displayBy;
            preferences[3] = orderBy;
            localStorage.setItem('preferences', JSON.stringify(preferences));
    
            dispatch({
                type: COMIC.SET_FILTER,
                payload: JSON.parse(localStorage.preferences)
            });
        }
    }
}











