import { UPDATE_PHRASE, DELETE_PHRASE } from './actionTypes';

interface SearchActionType {
  type: string;
  data?: string;
};

function updatePhrase(phrase: string): SearchActionType {

  return {
    type: UPDATE_PHRASE,
    data: phrase
  };
}

function deletePhrase(): SearchActionType {

  return {
    type: DELETE_PHRASE
  };
}

export {
  updatePhrase,
  deletePhrase
};
