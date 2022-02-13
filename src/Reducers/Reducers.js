import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import {
	addressNameReducer,
	apartmentResidentsListReducer,
} from "./ApartmentResidentsReducer";
import { LoadingReducer } from "./LoadingReducer";
import {
	SearchFlatsReducer,
	SearchHousesReducer,
	SearchStreetsReducer,
} from "./SearchAddressesReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		streetsList: SearchStreetsReducer,
		housesList: SearchHousesReducer,
		flatsList: SearchFlatsReducer,
		apartmentResidentsList: apartmentResidentsListReducer,
		addressName: addressNameReducer,
		loadingStatus: LoadingReducer,
	});

export default createRootReducer;
