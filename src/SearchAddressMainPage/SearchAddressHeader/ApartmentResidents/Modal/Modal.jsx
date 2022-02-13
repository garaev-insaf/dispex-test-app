import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	editApartmentResidentsList,
	putApartmentResidentsList,
} from "../../../../Actions/ApartmentResidentsAction";
import { getAllUrlParams } from "../../../SearchAddressStartPage/scripts/getAllUrlParams";
import "./styles/modal.sass";

import styles from "../../../CSSModules/SearchAddres.module.sass";

// модальное окно крайне кривое и без стилей
const Modal = ({
	modalActive,
	setModalActive,
	children,
	putApartmentResidentsList,
	editApartmentResidentsList,
}) => {
	const initalState = {
		id: 0,
		name: "",
		phone: "",
		email: "",
		bindId: getAllUrlParams().fid,
	};
	const [modalContentState, setModalContentState] = useState(initalState);

	useEffect(() => {
		setModalContentState(children);
	}, [children]);

	const inputChangeHandler = (event, type) => {
		if (type === 0) {
			setModalContentState({ ...modalContentState, phone: event.target.value });
		} else if (type === 1) {
			setModalContentState({ ...modalContentState, email: event.target.value });
		} else if (type === 2) {
			setModalContentState({ ...modalContentState, name: event.target.value });
		}
	};
	console.log(modalContentState);
	const modalActionClick = () => {
		if (modalActive.type === 0) {
			if (modalContentState.phone.length === 0) {
				alert("Введите корректный номер телефона"); // я не успеваю сделать всё в сроки, поэтому вынужден алертить:(
				return;
			} else {
				putApartmentResidentsList(modalContentState);
				setModalContentState(initalState);
				setModalActive({ ...modalActive, status: false });
			}
		} else {
			editApartmentResidentsList(modalContentState);
			setModalContentState(initalState);
			setModalActive({ ...modalActive, status: false });
		}
	};
	const closeModal = () => {
		setModalActive({ ...modalActive, status: false });
	};
	return (
		<div className={modalActive.status ? "modal active" : "modal"} onClick={closeModal}>
			<div
				className={modalActive.status ? "modal__content active" : "modal__content"}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-inputs-wrapper">
					<div className={`phone-input input`}>
						<p>Телефон</p>
						<input
							className={styles.searchInput}
							type="text"
							value={modalContentState.phone}
							onChange={(event) => inputChangeHandler(event, 0)}
							placeholder="Телефон"
						/>
					</div>
					<div className="phone-input input">
						<p>e-mail</p>
						<input
							className={styles.searchInput}
							type="text"
							value={modalContentState.email}
							onChange={(event) => inputChangeHandler(event, 1)}
							placeholder="Почта"
						/>
					</div>
					<div className="phone-input input">
						<p>ФИО</p>
						<input
							className={styles.searchInput}
							type="text"
							value={modalContentState.name}
							onChange={(event) => inputChangeHandler(event, 2)}
							placeholder="ФИО"
						/>
					</div>
					{modalActive.type === 0 ? (
						<div className="buttons-wrapper">
							<button onClick={closeModal}>отмена</button>
							<button onClick={() => modalActionClick()}>добавить</button>
						</div>
					) : (
						<div className="buttons-wrapper">
							<button onClick={closeModal}>отмена</button>
							<button onClick={() => modalActionClick()}>изменить</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	putApartmentResidentsList,
	editApartmentResidentsList,
};

export default connect(null, mapDispatchToProps)(Modal);
