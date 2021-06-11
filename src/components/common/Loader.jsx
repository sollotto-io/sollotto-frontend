import Solloto from '../../images/pictures/sollotto.gif';
import React from 'react';

const Loader = () => {
  return (
    <div id="loader">
      <img src={Solloto} width={200} height={200} alt="loading" />
    </div>
  );
};

export default Loader;
