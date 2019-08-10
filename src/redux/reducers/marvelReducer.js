import { GET_CHARACTERS, GET_ONE_CHARACTER, GET_ONE_COMIC } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_CHARACTERS:

            return {
                ...state,
                characters: action.payload.results
            }

        case GET_ONE_CHARACTER:
            return {
                ...state,
                singleCharacter: action.payload[0]
            }

        case GET_ONE_COMIC:
            return {
                ...state,
                singleComic: action.payload[0]
            }

        default:
            return state
    }

}