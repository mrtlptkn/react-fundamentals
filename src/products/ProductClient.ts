import axios from 'axios';

// axios settings
axios.defaults.baseURL = 'https://services.odata.org/northwind/northwind.svc/';
axios.defaults.params = {
	$format: 'json',
};

// axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 10000; // 10 seconds timeout for all requests
axios.defaults.timeoutErrorMessage = 'Request timed out';

axios.interceptors.request.use((config) => {
	console.log('Request made with config:', config);

	if (localStorage.getItem('token')) {
		config.headers['Authorization'] = `Bearer ` + localStorage.getItem('token'); // Replace with your actual token if needed
	}

	return config;
});

axios.interceptors.response.use(
	(response) => {
		console.log('Response received:', response);
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export function getProducts() {
	return axios.get('Products');
}
