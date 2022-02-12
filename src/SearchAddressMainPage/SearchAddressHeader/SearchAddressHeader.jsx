import * as React from "react";
import { Link } from "react-router-dom";
import './styles/SearchAddressHeader.sass'
import styles from "../CSSModules/SearchAddres.module.sass";
const SearchAddressHeader = () => {
	return (
		<header className="search-address-header">
			<div className={`search-address-header-container ${styles.container}`}>
				<Link to="/" className="link_toHome">
					<img src={`${process.env.PUBLIC_URL}/images/dispex-logo.png`} alt="" />
				</Link>
			</div>
		</header>
	);
};

export { SearchAddressHeader };
