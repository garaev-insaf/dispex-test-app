import axios from "axios";
const domen = "https://dispex.org/api/vtest";
export const getStreetsList = () => {
	return async (dispatch) => {
		await axios
			.get(domen + "/request/streets")
			.then((streetsList) => {
				console.log(streetsList);
				dispatch({
					type: "GET_STREETS",
					streetsList,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getHousesList = (id) => {
	return async (dispatch) => {
		await axios
			.get(domen + "/request/houses/"+id)
			.then((housesList) => {
				console.log(housesList);
				dispatch({
					type: "GET_HOUSES",
					housesList,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
export const getFlatsList = (id) => {
	return async (dispatch) => {
		await axios
			.get(domen + "/request/house_flats/"+id)
			.then((flatsList) => {
				console.log(flatsList);
				dispatch({
					type: "GET_FLATS",
					flatsList,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
