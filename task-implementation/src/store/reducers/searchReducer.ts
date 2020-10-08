import { UPDATE_PHRASE, DELETE_PHRASE } from '../actions/actionTypes';

const initialState: string = '';

export const searchReducer = (state: string = initialState, action: any) => {

  switch (action.type) {

    case UPDATE_PHRASE:
      return action.data;
    case DELETE_PHRASE:
      return '';
    default:
      return state;
  }
};
