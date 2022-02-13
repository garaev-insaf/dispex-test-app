import axios from "axios";

const domen = "https://dispex.org/api/vtest";

export const getAddressName = (flatId, streetId, houseId) => {
	return async (dispatch) => {
		await axios
			.get(`${domen}/HousingStock?addressId=${flatId}&streetId=${streetId}&houseId=${houseId}`)
			.then((addressName) => {
				console.log(addressName);
				dispatch({
					type: "GET_ADDRESS_NAME",
					addressName,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getApartmentResidentsList = (id) => {
	console.log(id);
	return async (dispatch) => {
		await axios
			.get(domen + "/HousingStock/clients?addressId=" + id)
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

export const deleteApartmentResidentsList = (id) => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_LOADER",
		});
		await axios
			.delete(domen + "/HousingStock/bind_client/" + id)
			.then((apartmentResidentsList) => {
				console.log(apartmentResidentsList);
				dispatch({
					type: "HIDE_LOADER",
					apartmentResidentsList,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const editApartmentResidentsList = (params) => {
	console.log(params);
	return (dispatch) => {
		dispatch({
			type: "SHOW_LOADER",
		});
		axios
			.post(`${domen}/HousingStock/client`, params)
			.then((putApartmentResidents) => {
				dispatch({
					type: "HIDE_LOADER",
					putApartmentResidents,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const putApartmentResidentsList = (params) => {
	return (dispatch) => {
		dispatch({
			type: "SHOW_LOADER",
		});
		axios
			.post(`${domen}/HousingStock/client`, params)
			.then((res) => {
				axios
					.put(`${domen}/HousingStock/bind_client`, {
						addressId: params.bindId,
						clientId: res.data.id,
					})
					.then((putApartmentResidents) => {
						dispatch({
							type: "HIDE_LOADER",
							putApartmentResidents,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
