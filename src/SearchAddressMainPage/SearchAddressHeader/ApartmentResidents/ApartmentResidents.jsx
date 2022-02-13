import * as React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import "./styles/ApartmentResidents.sass";
import styles from "../../CSSModules/SearchAddres.module.sass";
import { getAllUrlParams } from "../../SearchAddressStartPage/scripts/getAllUrlParams";
import {
	deleteApartmentResidentsList,
	getAddressName,
	getApartmentResidentsList,
	putApartmentResidentsList,
} from "../../../Actions/ApartmentResidentsAction";
import Modal from "./Modal/Modal";

const ApartmentResidents = ({
	apartmentResidentsList,
	getApartmentResidentsList,
	addressName,
	getAddressName,
	putApartmentResidentsList,
	loader,
	deleteApartmentResidentsList,
}) => {
	const initalState = {
		id: 0,
		name: "",
		phone: "",
		email: "",
		bindId: getAllUrlParams().fid,
	};
	const [mainClientsState, setMainClientsState] = useState([]);
	const [modalState, setModalState] = useState({
		status: false,
		type: 0,
	});
	const [actualValueForModal, setActualValueForModal] = useState(initalState);
	const [streetNameState, setStreetNameState] = useState({
		streetName: "",
		houseNumber: "",
		flatNumber: "",
	});
	useEffect(() => {
		setMainClientsState(apartmentResidentsList);
	}, [apartmentResidentsList]);
	useEffect(() => {
		setStreetNameState({
			...streetNameState,
			streetName: addressName[0]?.streetName,
			houseNumber: getAllUrlParams().hnum,
			flatNumber: getAllUrlParams().fnum,
		});
	}, [addressName]);

	useEffect(() => {
		if (apartmentResidentsList.length === 0) {
			getAddressName(getAllUrlParams().fid, getAllUrlParams().sid, getAllUrlParams().hid);
			getApartmentResidentsList(getAllUrlParams().fid);
		}
	}, []);
	const openModal = (elem) => {
		if (elem) {
			console.log(elem);
			setActualValueForModal(elem);
			setModalState({ modalState, status: true, type: 1 });
		} else {
			setActualValueForModal(initalState);
			setModalState({ modalState, status: true, type: 0 });
		}
	};
	console.log(loader);
	useEffect(() => {
		if (!loader) {
			getApartmentResidentsList(getAllUrlParams().fid);
		}
	}, [loader]);

	const deleteUser = (id) => {
		deleteApartmentResidentsList(id);
	};
	return (
		<main className={`apartment-residents-page ${styles.content}`}>
			<div className={`apartment-residents-page-container ${styles.container}`}>
				<section className={styles.actionBlock}>
					<header className={`apartment-residents-header ${styles.actionBlockHeader}`}>
						<div className="apartment-residents-header-text-block">
							<h2 className="header-text">
								{streetNameState.streetName !== 0 && !!streetNameState.streetName
									? `${streetNameState.streetName}, ${streetNameState.houseNumber}, ${streetNameState.flatNumber}`
									: null}
							</h2>
						</div>
						<div className="header-action-block">
							<button
								className={`button_add-user ${styles.userActionButton}`}
								onClick={() => openModal(null)}
							>
								<img src={`${process.env.PUBLIC_URL}/images/icons/add-user.svg`} alt="" />
							</button>
						</div>
					</header>
					<main className={`residents-main-block ${styles.actionBlockMain}`}>
						{mainClientsState.length > 0
							? mainClientsState.map((elem) => (
									<div className="user-card" key={elem.id}>
										<div className="main-info-wrapper">
											<div className="user-icon">
												<img src={`${process.env.PUBLIC_URL}/images/icons/user.svg`} alt="" />
											</div>
											<div className="user-info">
												<ul className="user-info-list">
													{elem.name.length > 0 && elem.email.length > 0 ? (
														<>
															<li className="user-info-list__item user-name">{elem.name}</li>
															<li className="user-info-list__item user-phone">{elem.phone}</li>
															<li className="user-info-list__item user-mail">{elem.email}</li>
														</>
													) : elem.name.length > 0 ? (
														<>
															<li className="user-info-list__item user-name">{elem.name}</li>
															<li className="user-info-list__item user-phone">{elem.phone}</li>
														</>
													) : elem.email.length > 0 ? (
														<>
															<li className="user-info-list__item user-mail">{elem.email}</li>
															<li className="user-info-list__item user-phone">{elem.phone}</li>
														</>
													) : (
														<li className="user-info-list__item user-phone">{elem.phone}</li>
													)}
												</ul>
											</div>
										</div>
										<div className="user-action-block">
											<button
												className={`button_delete-user ${styles.userActionButton}`}
												onClick={() => deleteUser(elem.bindId)}
											>
												<img src={`${process.env.PUBLIC_URL}/images/icons/trash.svg`} alt="" />
											</button>
											<button className={`button_change-user ${styles.userActionButton}`}>
												<img
													src={`${process.env.PUBLIC_URL}/images/icons/change-user.svg`}
													alt=""
													onClick={() => openModal(elem)}
												/>
											</button>
										</div>
									</div>
							  ))
							: null}
					</main>
				</section>
			</div>
			<Modal
				modalActive={modalState}
				setModalActive={setModalState}
				children={actualValueForModal}
			/>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		apartmentResidentsList: state.apartmentResidentsList,
		addressName: state.addressName,
		loader: state.loadingStatus.loading,
	};
};

const mapDispatchToProps = {
	getApartmentResidentsList,
	getAddressName,
	putApartmentResidentsList,
	deleteApartmentResidentsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentResidents);
