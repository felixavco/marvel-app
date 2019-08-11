import { TOGGLE_NAV } from '../types';

const initialState = {
    isMenuActive: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_NAV:
            return {
                ...state,
                isMenuActive: action.payload
            }

        default:
            return state
    }

}