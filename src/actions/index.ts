import { createAction, ActionFunctionAny } from 'redux-actions';
import * as types from './type';

export const updateUser: ActionFunctionAny<any> = createAction(types.UPDATE_USER);
