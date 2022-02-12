import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import "./styles/ApartmentResidents.sass";
import styles from "../../CSSModules/SearchAddres.module.sass";
import { getAllUrlParams } from "../../SearchAddressStartPage/scripts/getAllUrlParams";
import { getApartmentResidentsList } from "../../../Actions/ApartmentResidentsAction";

const ApartmentResidents = ({ apartmentResidentsList, getApartmentResidentsList }) => {
	const [mainClientsState, setMainClientsState] = useState(() => null);
	useEffect(() => {
		setMainClientsState(apartmentResidentsList);
	}, [apartmentResidentsList]);
	useEffect(() => {
		if (apartmentResidentsList.length === 0) {
			getApartmentResidentsList(getAllUrlParams().id);
		}
	}, []);
	return (
		<main className={`apartment-residents-page ${styles.content}`}>
			<div className={`apartment-residents-page-container ${styles.container}`}>
				<section className={styles.actionBlock}>
					<header className={`apartment-residents-header ${styles.actionBlockHeader}`}>
						<h2 className="header-text">Список жильцов</h2>
					</header>
					<main className={`search-main ${styles.actionBlockMain}`}>
						<div className="search-main-header">
							<h3 className={`earch-main-header-text`}>Адрес</h3>
						</div>
					</main>
				</section>
			</div>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		apartmentResidentsList: state.apartmentResidentsList,
	};
};

const mapDispatchToProps = {
	getApartmentResidentsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentResidents);
