// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5144/', // Replace with your actual API base URL
});

export default instance;
