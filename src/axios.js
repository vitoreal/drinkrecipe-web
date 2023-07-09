import axios from "axios";

var AUTH_TOKEN = '';

if(localStorage.getItem('token')){
    const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
    AUTH_TOKEN = "Bearer "+ editedText;
}


axios.defaults.baseURL = 'http://localhost:8000/api/';

//axios.defaults.baseURL = 'https://grupodablio.com.br/advweb/app/prod/public/api/';

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// errorComposer will compose a handleGlobally function

axios.interceptors.response.use(
    response => response,
    error => {

    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 401) {
        localStorage.removeItem('token');
        this.$store.dispatch('user', null);
        localStorage.removeItem('user');
        this.axios.post('logout');
        this.$router.push('/');
    } else {
        return error.response;
    }

})