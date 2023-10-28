import axios from "axios";

var AUTH_TOKEN = '';

if(localStorage.getItem('token')){
    const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
    AUTH_TOKEN = "Bearer "+ editedText;
}


axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

//axios.defaults.withCredentials = true;

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