import React from "react";
import "./App.css";
import { SearchAddressMainPage } from "./SearchAddressMainPage/SearchAddressMainPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<SearchAddressMainPage />
		</Router>
	);
}

export default App;
