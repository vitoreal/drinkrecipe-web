const utilsMixin = {
    data() {
        return {
         role: this.$store.state.user == null ? "" : this.$store.state.user.role.name
        }
      },
    methods: {
        permissaoMenuRootMixin(){
        
            var rolePerm = ['ROOT_ADMIN'];

            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        permissaoMenuSuperAdminMixin(){
            
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        permissaoMenuPadraoMixin(){
            
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN', 'USER_PADRAO'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        logoutMixin() {
      
            localStorage.removeItem('token');
            this.$store.dispatch('user', null);
            localStorage.removeItem('user');
            this.axios.post('logout');
            this.$router.push('/');
        },
        checkIsUndefinedMixin (variable) {
     
            if(typeof(variable) != 'undefined' && variable != null && variable !== undefined){
                return true;
            }
            return false;

        },
        checkAuthTokenMixin (axios) {
        
            var AUTH_TOKEN = '';

            if(localStorage.getItem('token')){
                const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
                AUTH_TOKEN = "Bearer "+ editedText;
            }

            axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        }
    }
}

export default utilsMixin;