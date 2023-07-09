const utilsMixin = {
    data() {
        return {
         role: this.$store.state.user == null ? "" : this.$store.state.user.role.name
        }
      },
    methods: {
        permissaoMenuAdvogado(){
        
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN', 'EMPRESA_ADMIN'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        permissaoMenuCliente(){
            
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN', 'EMPRESA_ADMIN', 'ADVOGADO_ADMIN', 'CLIENTE_ADMIN'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        permissaoMenuAdmin(){
            
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        permissaoEmpresaAdvogado(){
            
            var rolePerm = ['ROOT_ADMIN', 'SUPER_ADMIN', 'EMPRESA_ADMIN', 'ADVOGADO_ADMIN'];
            if(rolePerm.includes(this.role)){
                return true;
            }
            return false;
        },
        checkIsUndefined (variable) {
     
            if(typeof(variable) != 'undefined' && variable != null && variable !== undefined){
                return true;
            }
            return false;

        },
        checkAuthToken (axios) {
        
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