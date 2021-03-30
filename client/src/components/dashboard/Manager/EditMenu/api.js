import axios from 'axios';

class MenuApi
 {
	static CreateMenu(EditMenu) {
		axios
			.post('http://localhost:5000/Api/Reservations/CreateMenuItem', EditMenu)
			.then((res) => console.log('Successfully created MenuItem '))
			.catch((err) => console.log('Error occured: ' + err));
	}
}

export default MenuApi;