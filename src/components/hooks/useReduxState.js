import { useSelector } from 'react-redux';
import reduxAction from '../../redux/reduxAction';
const useReduxState = (state) => {
  const reduxState = useSelector(state);

  const setReduxState = (action) => {
    reduxAction(action);
  };

  return [reduxState, setReduxState];
};

export default useReduxState;
