import { actions } from './actions';
import store from './stores/store';

export default function reduxAction(action) {
  store.dispatch(actions[action.type](action.arg));
}
