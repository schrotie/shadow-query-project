
const hello = (state = 'Hello world?', action) => {
	switch (action.type) {
	case 'SET_HELLO': return action.hello;
	default: return state;
	}
};

export default hello;
