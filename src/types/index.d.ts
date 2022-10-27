import {compose} from 'redux';
import {StoreType} from '../redux/reduxStore';


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        store: StoreType
    }
}