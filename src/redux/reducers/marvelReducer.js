import { GET_CHARACTERS, GET_ONE_CHARACTER, GET_COMICS, GET_ONE_COMIC, GET_STORIES, GET_ONE_STORY, ON_SEARCH } from '../types';

const initialState = {
    searchTerm: ''
};

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

        case GET_COMICS:
            return {
                ...state,
                comics: action.payload.results
            }

        case GET_ONE_COMIC:
            return {
                ...state,
                singleComic: action.payload[0]
            }

        case GET_STORIES:
            return {
                ...state,
                stories: action.payload.results
            }

        case GET_ONE_STORY:
            return {
                ...state,
                singleStory: action.payload[0]
            }

        case ON_SEARCH:
            return {
                ...state,
                searchResults: action.payload.data.results,
                searchTerm: action.payload.searchTerm
            }

        default:
            return state
    }

}