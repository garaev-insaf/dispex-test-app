import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import { store, history } from "./Store/store";
import { Provider } from "react-redux";

ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
	document.getElementById("root")
);
