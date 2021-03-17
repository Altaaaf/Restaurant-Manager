import axios from 'axios';
export const GetMenu = (state) => {
	axios
		.get('http://localhost:5000/api/Menu/View')
		.then((res) => (state.menu = res))
		.catch((err) => (state.error = err));
};
