import { TOGGLE_NAV, TOGGLE_SUB_MENU, SET_FAB_CHAR } from '../types';

const initialState = {
    isMenuActive: false,
    isSubMenuActive: false,
    favorites: []
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

        default:
            return state
    }

}