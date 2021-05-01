import axios from 'axios';
import toastr from 'toastr';
export const GetMenu = (state) => {
	axios
		.get('http://localhost:5000/api/Menu/View')
		.then((res) => {
			if (res.status == 200) {
				const data = res.data;
				toastr.success('Successfully retrieved data');
				state.menu = data;
			} else {
				toastr.error('Unexpected failure occured');
			}
		})
		.catch((err) => {
			toastr.error(err.response.data.status);
		});
};
