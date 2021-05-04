import React, { useState } from "react";
import Axios from "axios";

export default function Provider(props) {
	// let restType = this.getRestType(props.router.match.path);
	let route = props.router.match.path;
	let slug = props.router.match.params.slug
		? props.router.match.params.slug
		: "";

	const [ctxData, setCtxData] = useState({
		slug: slug,
		// restType: restType,
		route: route,
		ticketPrice: null,
		holdingWalletId: null,
		connectedWalledId: null,
		activeCharities: null,
	});

	function getTicketPrice() {
		Axios.get("/api/v1/transaction").then((response) => {
			setCtxData();
		});
	}

	return <div></div>;
}
