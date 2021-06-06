import React, { useContext, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import SortButtons from "../components/Pool/sortButtons";
import PoolTable from "../components/Pool/poolTable";
import "../css/pool.css";
import { GlobalContext } from "../context/GlobalContext";
import ComingSoon from "../images/pictures/coming-soon.png";
const Pool = () => {
	const { globalData } = useContext(GlobalContext);

	return (
		<div className='pageWrapper'>
			<img src={ComingSoon} alt='logo' className='comingSoon' />
			{/* <div id='poolSection'>
				<div id='poolHeader'>
					<PageTitle title='Pools' />
					<input
						id='search-pool'
						type='text'
						name='name'
						placeholder='Search pools by name or ticker'
					/>
				</div>
				<div className='wrapper'>
					<SortHeader />
					<SortButtons />
				</div>
				{globalData.pools ? <PoolTable rows={globalData.pools} /> : ""}
			</div> */}
		</div>
	);
};

export default Pool;
