import axios from 'axios';

const intranetApi = axios.create({
  baseURL: 'http://localhost:8000',
  xsrfHeaderName: 'X-CSRFToken',
});

export default intranetApi;
