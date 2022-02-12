import * as React from "react";
import { Routes, Route } from "react-router-dom";
import ApartmentResidents from "./SearchAddressHeader/ApartmentResidents/ApartmentResidents";
import { SearchAddressHeader } from "./SearchAddressHeader/SearchAddressHeader";
import SearchAddressStartPage from "./SearchAddressStartPage/SearchAddressStartPage";
import "./styles/SearchAddressMainPage.sass";

const SearchAddressMainPage = () => {
	return (
		<div className="search-addres-main-page">
			<SearchAddressHeader />
			<Routes>
				<Route exact path="/" element={<SearchAddressStartPage />} />
				<Route exact path="/addresses-residents" element={<ApartmentResidents/>} />
			</Routes>
		</div>
	);
};

export { SearchAddressMainPage };
