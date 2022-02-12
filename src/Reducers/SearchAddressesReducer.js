const SearchStreetsReducer = (streetsList = [], action) => {
	switch (action.type) {
		case "GET_STREETS":
			console.log(action.streetsList.data)
			return action.streetsList.data;
		default:
			return streetsList;
	}
};
const SearchHousesReducer = (housesList = [], action) => {
	switch (action.type) {
		case "GET_HOUSES":
			console.log(action.housesList.data)
			return action.housesList.data;
		default:
			return housesList
	}
};
const SearchFlatsReducer = (flatsList = [], action) => {
	switch (action.type) {
		case "GET_FLATS":
			console.log(action.flatsList.data)
			return action.flatsList.data;
		default:
			return flatsList;
	}
};

export { SearchStreetsReducer, SearchFlatsReducer, SearchHousesReducer };