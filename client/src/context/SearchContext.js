import React, { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  city: undefined,
  dates: [{ startDate: new Date(), endDate: new Date() }],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return { ...state, ...action.payload };
    case 'RESET_SEARCH':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
