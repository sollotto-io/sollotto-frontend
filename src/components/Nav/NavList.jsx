import React from "react";
import NavItem from "./NavItem";


export default function NavList(props) {
	return (
		<div
			className='navList'
			style={props.navActive === true ? { display: "grid" } : null}
		>
			<NavItem url_link='purchase' />
			<NavItem url_link='charities' />
			<NavItem url_link='suggest' />
			<NavItem url_link='results' />
			<NavItem url_link='pool' />
		</div>
	);
}
