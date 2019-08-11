import { TOGGLE_NAV } from '../types';

export const toggleMenu = (isActive) => (dispatch) => {
    dispatch({
        type: TOGGLE_NAV,
        payload: !isActive
    });
}