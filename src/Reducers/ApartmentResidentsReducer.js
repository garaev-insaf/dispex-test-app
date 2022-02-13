const apartmentResidentsListReducer = (apartmentResidentsList = [], action) => {
	switch (action.type) {
		case "GET_RESIDENTS":
			console.log(action.apartmentResidentsList.data)
			return action.apartmentResidentsList.data;
		default:
			return apartmentResidentsList;
	}
};

const putApartmentResidentsListReducer = (putApartmentResidents = [], action) => {
	switch (action.type) {
		case "PUT_RESIDENTS":
			console.log(action.putApartmentResidents)
			return action.putApartmentResidents.data;
		default:
			return putApartmentResidents;
	}
};


const addressNameReducer = (addressName = [], action) => {
	switch (action.type) {
		case "GET_ADDRESS_NAME":
			console.log(action.addressName.data)
			return action.addressName.data;
		default:
			return addressName;
	}
};



export { apartmentResidentsListReducer, addressNameReducer, putApartmentResidentsListReducer } ;