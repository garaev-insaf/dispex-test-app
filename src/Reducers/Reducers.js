import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { apartmentResidentsListReducer } from './ApartmentResidentsReducer'
import { SearchFlatsReducer, SearchHousesReducer, SearchStreetsReducer } from './SearchAddressesReducer'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    streetsList: SearchStreetsReducer,
    housesList: SearchHousesReducer,
    flatsList: SearchFlatsReducer,
    apartmentResidentsList: apartmentResidentsListReducer,
})

export default createRootReducer