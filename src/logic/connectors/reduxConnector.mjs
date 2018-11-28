import rootReducer from '../reducers/root.mjs';
import {createStore} from '../../../node_modules/redux/es/redux.mjs';

const store = createStore(rootReducer);

/**
 * Base-class for your Connectors. A Connector connects DOM to Redux and vice
 * versa. `ReduxConnector` significantly simplifies creating Connectors.
 * `ReduxConnector` can potentially remain the only place in the app that
 * interacts directly with the Redux state. Should you want to add change
 * detection code, `ReduxConnector` also provides the one point, where you can
 * and it and have all you code profit from it.
 */
export class ReduxConnector {
	/**
	 * Always call `super(node);` in you constructor to initialize you base!
	 * @param {ShadowQuery} node DOM to bind from/to
	 */
	constructor(node) {this._$node = node;}

	/**
	 * Create a `binding` from the Redux state to the DOM. Automatically
	 * subscribes to the store and depending on the binding config may do
	 * everything automatically or rely on code you provide with the
	 * `binding`.
	 * @param {Object} binding `binding` configuration
	 * @param {String|Function} binding.path path of the bound property in the
	 * Redux store, e.g. `'topLevelBranch.branch.leaf'`. You may also pass a
	 * function as `path`. This function will be called with its `this` pointer
	 * set to `ReduxConnector: this` and the parameter `state` which is the
	 * top-level Redux state.
	 * @param {String} binding.operation how to bind to the DOM; possible values:
	 * `attr`, `'prop'`, `text`, binding to attribute, property or text
	 * respectively.
	 * @param {String} [binding.key] attribute or property key, not required for
	 * text bindings.
	 * @example
	 * this.binding({path:'hello', operation: 'prop', key:'hello'});
	 */
	binding(binding) {
		if(!this._storeToEl) {
			this._storeToEl = [binding];
			store.subscribe(this._onStore.bind(this));
		}
		else this._storeToEl.push(binding);
		this._onStore();
	}

	/**
	 * Create a binding from the DOM to the store.
	 * @param {String} evt `ReduxConnector` will register a callback for this
	 * event on the DOM you provided in the constructor call. Since it is
	 * using ShadowQuery you can listen to standard events, attribute,
	 * property, or text changes.
	 * @param {Function} action this function will be called to get the `action`
	 * which ReduxConnector will dispatch to the Redux store. The function will
	 * get the caught event as a parameter.
	 * @example
	 * this.dispatcher('hello', evt => setHello(evt.detail));
	 */
	dispatcher(evt, action) {
		this._$node.on(evt, evt => {
			const act = action(evt);
			if(act) store.dispatch(act);
		});
	}

	_onStore() {
		const state = store.getState();
		for(const binding of this._storeToEl) {
			this._$node[binding.operation](
				binding.key, this.getPath(binding.path, state)
			);
		}
	}

	getPath(path, state = store.getState()) {
		if(typeof(path) === 'function') return path.call(this, state);
		if(typeof(path) === 'string') path = path.split('.');
		state = state[path[0]];
		return (path.length > 1) ? this.getPath(path.slice(1), state) : state;
	}
}

export default ReduxConnector;
