import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { changeFilter } from './phone-actions';

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({ filter });