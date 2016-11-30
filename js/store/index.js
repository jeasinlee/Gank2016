import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { DEBUG, RDEBUG } from '../Constants';

// function logger(store) {
//     return function (next) {
//         return function (action) {
//             if (!DEBUG || !RDEBUG) return next(action);
//
//             if (typeof action === 'function') {
//                 console.log('>>>> logger => dispatching a function');
//             } else {
//                 console.log('>>>> logger => dispatching', action);
//             }
//
//             let result = next(action);
//             console.log('next state', store.getState());
//             return result;
//         }
//     }
// }

const logger = store => next => action => {
    if (!DEBUG || !RDEBUG) return next(action);

    if (typeof action === 'function') {
        console.log('>>>> logger => dispatching a function');
    } else {
        console.log('>>>> logger => dispatching', action);
    }

    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

export const store = compose(applyMiddleware(logger, thunk))(createStore)(reducers);