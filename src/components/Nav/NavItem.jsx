import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function NavItem(props) {
	const isDesktop = useMediaQuery({ query: "(min-width: 980px)" });
	return (
		<NavLink
			onClick={props.onNavLinkClick}
			className='navLink'
			to={`/${props.url_link}`}
			activeStyle={
				isDesktop
					? {
							color: "#fff",
							borderBottom: "1px solid var(--purple-dino)",
							transition: "all 0.5s",
					  }
					: {
							color: "#fff",
							background: "var(--purple-dino)",
							transition: "all 0.5s",
					  }
			}
		>
			{props.url_link}
		</NavLink>
	);
}
