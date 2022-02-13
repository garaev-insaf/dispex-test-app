import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect, createRef } from "react";
import "./styles/SearchAddressStartPage.sass";
import { Link } from "react-router-dom";
import styles from "../CSSModules/SearchAddres.module.sass";
import { getStreetsList, getFlatsList, getHousesList } from "../../Actions/SearchAddresseAction";
import { checkCityId } from "./scripts/scripts";
const SearchAddressStartPage = ({
	streetsList,
	housesList,
	flatsList,
	getStreetsList,
	getFlatsList,
	getHousesList,
}) => {
	const inputsIndex = 3;
	const arrLength = inputsIndex;
	const elRefs = React.useRef([]);

	if (elRefs.current.length !== arrLength) {
		elRefs.current = Array(arrLength)
			.fill()
			.map((_, i) => elRefs.current[i] || createRef());
	}
	const [streetsState, setStreetsState] = useState({
		data: [],
		currentValue: "",
		key: "street",
	});
	const [housesState, setHousesState] = useState({
		data: [],
		currentValue: "",
		key: "house",
	});
	const [flatsState, setFlatsState] = useState({
		data: [],
		currentValue: "",
		key: "flat",
	});
	const [toggler, setToggler] = useState(() => false);
	const [activeDropDownMenu, setActiveDropDownMenu] = useState(() => 0);

	// заполнение состояния улиц
	useEffect(() => {
		const timeArray = streetsList;
		if (timeArray.length > 0) {
			const newArray = timeArray.filter(checkCityId);
			setStreetsState({ ...streetsState, data: newArray });
		}
	}, [streetsList]);

	useEffect(() => {
		setHousesState({ ...housesState, data: housesList });
	}, [housesList]);
	
	useEffect(() => {
		const timeArray = flatsList;
		if (timeArray.length > 0) {
			const newArray = timeArray.filter((item) => item.typeName === "Квартира");
			setFlatsState({ ...flatsState, data: newArray });
		}
	}, [flatsList]);

	console.log(flatsState);
	// получение улиц
	const getStreets = () => {
		if (streetsList.length === 0) {
			getStreetsList();
			setActiveDropDownMenu(1);
		} else {
			setActiveDropDownMenu(1);
		}
	};
	const getHouses = () => {
		if (housesState !== housesList) {
			getHousesList(
				streetsList.find(
					(elem) => elem.name.toLowerCase() === streetsState.currentValue.toLowerCase()
				)?.id
			);
		}
		setActiveDropDownMenu(2);
	};
	const getFlats = () => {
		getFlatsList(housesList.find((elem) => elem.name === housesState.currentValue)?.id);
		setActiveDropDownMenu(3);
	};
	useEffect(() => {
		const handleClickOutside = (event) => {
			const actualValue = event.target;
			console.log(event.target);
			if (
				activeDropDownMenu > 0 &&
				elRefs.current[activeDropDownMenu - 1] &&
				!elRefs.current[activeDropDownMenu - 1].current.contains(event.target) &&
				event.target.tagName !== "INPUT"
			) {
				setActiveDropDownMenu(0);
			} else if (activeDropDownMenu !== 0 && event.target.tagName === "LI") {
				if (activeDropDownMenu === 1) {
					setStreetsState({ ...streetsState, currentValue: actualValue.innerHTML });
					setHousesState({ ...housesState, currentValue: "" });
					setFlatsState({ ...flatsState, currentValue: "" });
				} else if (activeDropDownMenu === 2) {
					setHousesState({ ...housesState, currentValue: actualValue.innerHTML });
					setFlatsState({ ...flatsState, currentValue: "" });
				} else if (activeDropDownMenu === 3) {
					setFlatsState({ ...flatsState, currentValue: actualValue.innerHTML });
				}
				setActiveDropDownMenu(0);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [elRefs, activeDropDownMenu, streetsState, housesState, flatsState]);
	console.log(streetsState);
	const SortStreets = (a, b) => {
		if (activeDropDownMenu === 1) {
			if (
				a.name
					.slice(0, streetsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					b.name
						.slice(0, streetsState.currentValue.length)
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, streetsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) ===
					streetsState.currentValue
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110))
			) {
				return -1;
			}
			if (
				a.name
					.slice(0, streetsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					streetsState.currentValue
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, streetsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) <
					streetsState.currentValue
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110))
			) {
				return 1;
			}
		}
		if (activeDropDownMenu === 2) {
			if (
				a.name
					.slice(0, housesState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					b.name
						.slice(0, housesState.currentValue.length)
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, housesState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) ===
					housesState.currentValue.toLocaleLowerCase().replace("ё", "е" + String.fromCharCode(1110))
			) {
				return -1;
			}
			if (
				a.name
					.slice(0, housesState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					housesState.currentValue
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, housesState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) <
					housesState.currentValue.toLocaleLowerCase().replace("ё", "е" + String.fromCharCode(1110))
			) {
				return 1;
			}
		}
		if (activeDropDownMenu === 3) {
			if (
				a.name
					.slice(0, flatsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					b.name
						.slice(0, flatsState.currentValue.length)
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, flatsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) ===
					flatsState.currentValue.toLocaleLowerCase().replace("ё", "е" + String.fromCharCode(1110))
			) {
				return -1;
			}
			if (
				a.name
					.slice(0, flatsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) !==
					flatsState.currentValue
						.toLocaleLowerCase()
						.replace("ё", "е" + String.fromCharCode(1110)) &&
				a.name
					.slice(0, flatsState.currentValue.length)
					.toLocaleLowerCase()
					.replace("ё", "е" + String.fromCharCode(1110)) <
					flatsState.currentValue.toLocaleLowerCase().replace("ё", "е" + String.fromCharCode(1110))
			) {
				return 1;
			}
		}
	};
	useEffect(() => {
		const array = streetsState.data;
		array.sort(SortStreets);
		setToggler(() => !toggler);
	}, [streetsState]);

	useEffect(() => {
		const array = housesState.data;
		array.sort(SortStreets);
		setToggler(() => !toggler);
	}, [housesState]);

	useEffect(() => {
		const array = flatsState.data;
		array.sort(SortStreets);
		setToggler(() => !toggler);
	}, [flatsState]);

	const onChangeHalder = (type, event) => {
		if (type === 1) {
			setStreetsState({ ...streetsState, currentValue: event.target.value });
		} else if (type === 2) {
			setHousesState({ ...housesState, currentValue: event.target.value });
		} else if (type === 3) {
			setFlatsState({ ...flatsState, currentValue: event.target.value });
		}
	};
	return (
		<main className={`search-address-start-page ${styles.content}`}>
			<div className={`search-address-start-page-container ${styles.container}`}>
				<section className={styles.actionBlock}>
					<header className={`search-header ${styles.actionBlockHeader}`}>
						<h2 className="header-text">Поиск адреса и списка жильцов</h2>
					</header>
					<main className={`search-main ${styles.actionBlockMain}`}>
						<div className="search-main-header">
							<h3 className={`earch-main-header-text`}>Адрес</h3>
						</div>
						<div className="inputs-wrapper">
							<div
								className="dropwdown-block street-dropdown-block"
								ref={elRefs.current[0]}
								id="street-dropdown-block"
							>
								<div className="inputblock">
									<input
										type="search"
										name="street"
										placeholder="Улица"
										value={streetsState.currentValue}
										className={`inputs-wrapper__setStreetInput ${styles.searchInput}`}
										onClick={() => getStreets()}
										onChange={(e) => onChangeHalder(1, e)}
									/>
								</div>
								<div
									className={`drop-down-content ${activeDropDownMenu === 1 ? "active" : "passive"}`}
								>
									<ul className="items-list" id="search-list">
										{streetsState.data.map((elem) => (
											<li className="items-list__item" key={elem.id}>
												{elem.name}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="dropwdown-block house-dropdown-block" ref={elRefs.current[1]}>
								<div className="inputblock">
									<input
										type="search"
										name="house"
										placeholder="Дом"
										value={housesState.currentValue}
										className={`inputs-wrapper__setHouseInput ${styles.searchInput}`}
										onClick={() => getHouses()}
										onChange={(e) => onChangeHalder(2, e)}
									/>
								</div>

								<div
									className={`drop-down-content ${activeDropDownMenu === 2 ? "active" : "passive"}`}
								>
									<ul className="items-list" id="search-list">
										{housesState.data.length !== 0 ? (
											housesState.data.map((elem) => (
												<li className="items-list__item" key={elem.id}>
													{elem.name}
												</li>
											))
										) : (
											<li className="items-list__item">Ничего не найдено:(</li>
										)}
									</ul>
								</div>
							</div>
							<div className="dropwdown-block flat-dropdown-block" ref={elRefs.current[2]}>
								<input
									type="search"
									name="flat"
									placeholder="Кв./офис"
									value={flatsState.currentValue}
									className={`inputs-wrapper__setFlatInput ${styles.searchInput}`}
									onClick={() => getFlats()}
									onChange={(e) => onChangeHalder(3, e)}
								/>
								<div
									className={`drop-down-content ${activeDropDownMenu === 3 ? "active" : "passive"}`}
								>
									<ul className="items-list" id="search-list">
										{flatsState.data.length !== 0 ? (
											flatsState.data.map((elem) => (
												<li className="items-list__item" key={elem.id}>
													{elem.name}
												</li>
											))
										) : (
											<li className="items-list__item">Ничего не найдено:(</li>
										)}
									</ul>
								</div>
							</div>
						</div>
						<Link
							className={`${styles.actionLink}`}
							to={`/addresses-residents?fid=${
								flatsList.find(
									(elem) => elem.name.toLowerCase() === flatsState.currentValue.toLowerCase()
								)?.id
							}&sid=${
								streetsList.find(
									(elem) => elem.name.toLowerCase() === streetsState.currentValue.toLowerCase()
								)?.id
							}&hid=${
								housesList.find(
									(elem) => elem.name.toLowerCase() === housesState.currentValue.toLowerCase()
								)?.id
							}
							&fnum=${flatsState.currentValue}
							&hnum=${housesState.currentValue}
							`}
						>
							Поиск
						</Link>
					</main>
				</section>
			</div>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		streetsList: state.streetsList,
		housesList: state.housesList,
		flatsList: state.flatsList,
	};
};

const mapDispatchToProps = {
	getStreetsList,
	getHousesList,
	getFlatsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddressStartPage);
