import Solloto from '../../images/pictures/solloto-spinner.gif';
import React from 'react';

const Loader = ({ style }) => {
  return (
    <div id="loader" style={style ?? {}}>
      <img src={Solloto} width={200} height={200} alt="loading" />
    </div>
  );
};

export default Loader;
