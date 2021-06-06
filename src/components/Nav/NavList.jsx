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
			<a rel="noopener noreferrer" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdMRU7GzeNDukSv-Gq9VJk_rtjVxR5CL-M33GZn8fjrCNxmwA/viewform" className="navLink">Suggest</a>
			<NavItem url_link='results' />
			<NavItem url_link='pools' />
		</div>
	);
}
