import { TOGGLE_NAV, TOGGLE_SUB_MENU, SET_FAB_CHAR, SET_CHAR_FILTER } from '../types';

const initialState = {
    isMenuActive: false,
    isSubMenuActive: false,
    favorites: [],
    characterFilter: true
}

export default (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_NAV:
            return {
                ...state,
                isMenuActive: action.payload
            }

        case TOGGLE_SUB_MENU:
             return {
                ...state,
                isSubMenuActive: action.payload
            }

        case SET_FAB_CHAR:
             return {
                ...state,
                favorites: action.payload
            }

        case SET_CHAR_FILTER:
             return {
                ...state,
                characterFilter: action.payload
            }

        default:
            return state
    }

}