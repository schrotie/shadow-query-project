import {combineReducers} from '../../../node_modules/redux/es/redux.mjs';

import hello from './hello.mjs';

export default combineReducers({
	hello,
	test: (state = 'coverage', action) => state,
});
