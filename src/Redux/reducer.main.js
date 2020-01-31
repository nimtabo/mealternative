/*
  The root reducer
*/
import { combineReducers } from 'redux';

import AuthReducer from './authentication';
import LocationReducer from './location';
import CreateReducer from './create';
import ListReducer from './list';
import RecipeReducer from './recipe';

const MainReducer = combineReducers({
  Auth: AuthReducer,
  Location: LocationReducer,
  Create: CreateReducer,
  List: ListReducer,
  Recipe: RecipeReducer
});

export default MainReducer;
