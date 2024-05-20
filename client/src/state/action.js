// src/state/index.js

// Define your action types
export const SET_FILTER_TERM = 'SET_FILTER_TERM';

// Define your action creators
export const setFilterTerm = (term) => {
  return {
    type: SET_FILTER_TERM,
    payload: term,
  };
};
