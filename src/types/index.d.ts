import {compose} from 'redux';
import {AppStoreType} from "../redux/reduxStore";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        store: AppStoreType
    }
}