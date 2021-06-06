import React, { useEffect } from "react";
import SortButtonsResult from "../components/Result/SortButtonsResult";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import "../css/result.css";
import ResultTable from "../components/Result/ResultTable";

export default function Results() {
	return (
		<div className='pageWrapper'>
			<div className='resultSection'>
				<div id='resultHeader'>
					<PageTitle title='Result' />
					<input
						id='search-pool'
						type='text'
						name='name'
						placeholder='Search result by name '
					/>
				</div>
				<div className='wrapper'>
					<SortHeader />
					<SortButtonsResult />
				</div>

				<ResultTable />
			</div>
		</div>
	);
}
