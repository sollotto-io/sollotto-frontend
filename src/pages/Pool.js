import React, { useContext } from "react";
import PageTitle from "../components/common/PageTitle";
import PoolTable from "../components/Pool/poolTable";
import "../css/pool.css";
import { GlobalContext } from "../context/GlobalContext";
import ComingSoon from "../images/pictures/coming-soon.png";
const Pool = () => {
	const { globalData } = useContext(GlobalContext);

	return (
		<div className='pageWrapper'>
			<div id='poolSection'>
				<img src={ComingSoon} alt='logo' className='comingSoon' />
			</div>
		</div>
	);
};

export default Pool;
