
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/Api/Menu/View'
  
});

export default api;