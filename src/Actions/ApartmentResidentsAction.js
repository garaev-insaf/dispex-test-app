import axios from "axios";

const domen = "https://dispex.org/api/vtest";

export const getApartmentResidentsList = (id) => {
	console.log(id);
	return async (dispatch) => {
		await axios
			.get(domen + "/HousingStock/clients?addressId="+id)
			.then((apartmentResidentsList) => {
				console.log(apartmentResidentsList);
				dispatch({
					type: "GET_RESIDENTS",
					apartmentResidentsList,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};