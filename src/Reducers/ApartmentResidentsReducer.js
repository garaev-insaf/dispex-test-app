const apartmentResidentsListReducer = (apartmentResidentsList = [], action) => {
	switch (action.type) {
		case "GET_RESIDENTS":
			console.log(action.apartmentResidentsList.data)
			return action.apartmentResidentsList.data;
		default:
			return apartmentResidentsList;
	}
};


export { apartmentResidentsListReducer } ;