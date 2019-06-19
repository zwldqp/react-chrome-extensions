import { handleActions, Action } from 'redux-actions';
import {
  UPDATE_USER,
} from '../actions/type';

export interface AppState {
  // user 是示例代码，可视需求保留或删除，请删除改行注释
  user: any;
}

const initialState: AppState = {
  user: {
    id: 1,
    name: 'Guest',
  }
};


export default handleActions({
  [UPDATE_USER](state: AppState, action: any) {
    return {
      user: action.payload.user,
    };
  },
},                           initialState);
