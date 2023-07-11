import { createRouter, createWebHistory } from 'vue-router';

import axios from 'axios'
import VueAxios from 'vue-axios'

// Paginas de acesso
import LoginPage from './../views/base/LoginPage.vue';
import RegistrarPage from './../views/base/RegistrarPage.vue';
import LembrarSenha from './../views/base/LembrarSenhaPage.vue';
import ResetSenha from './../views/base/ResetSenhaPage.vue';

// Pagina principal
import HomePage from './../views/base/HomePage.vue';

// Paginas do sistema - DADOS
import MeusDadosPage from './../views/dados/MeusDadosPage.vue';
import AlterarSenhaPage from './../views/dados/AlterarSenhaPage.vue';

// Pagina de erro
import ErrorPage from './../components/error/ErrorLayout.vue';

const routes = [
  { path: '/', name: 'LoginPage', component: LoginPage  },
  { path: '/registrar', name: 'RegistrarPage', component: RegistrarPage  },
  { path: '/lembrar-senha', name: 'lembrarSenhaPage', component: LembrarSenha  },
  { path: '/reset-senha/:token', name: 'ResetSenhaPage', component: ResetSenha  },
  // Precisa de autorizacao
  
  { path: '/error-page', name: 'ErrorPage', component: ErrorPage, beforeEnter: checkAuthAll  },
  //{ path: '/home', name: 'HomePage', component: HomePage, beforeEnter: checkAuth },
  { path: '/home', name: 'HomePage', component: HomePage, beforeEnter: checkAuthAll },
  { path: '/home/:idUser', name: 'HomePageGoogleAuth', component: HomePage, beforeEnter: checkGoolgeAuthAll },

  // MEUS DADOS
  { path: '/dados/meus-dados', name: 'MeusDadosPage', component: MeusDadosPage },  
  { path: '/dados/alterar-senha', name: 'AlterarSenhaPage', component: AlterarSenhaPage },  
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router

function checkAuthAll(to, from, next) {

  // Verifica se tem autorizacao para entrar na pagina
  if(!localStorage.getItem('user') || !localStorage.getItem('token')){
    next("/");
  } else {
    console.log(3)
    // Verifica as permissoes do usuario
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    var role = user.roles[0].name;

    if(role != 'ROOT_ADMIN' && role != 'SUPER_ADMIN' && role != 'USER_PADRAO'){
      next("/error-page");
    } else {
      next();
    }
    
  }

}

function checkGoolgeAuthAll(to, from, next) {

  if(to.params.idUser){
    validaDadosLoginGoogle(to.params.idUser, next);
  } else {
    next("/");
  } 
  
}

import store from './../vuex';

function validaDadosLoginGoogle(idUser, next){
  

  const response = axios.post('validaDadosLoginGoogle', {
      idUser: idUser,
  }).then(function (response) {
    
    
    if(typeof(response) != 'undefined' && response != null && response !== undefined){
      
      if(response.data.type == 'SUCESSO'){
     
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
    
        store.dispatch('user', response.data.user);

        var role = response.data.user.roles[0].name;
        
        if(role != 'ROOT_ADMIN' && role != 'SUPER_ADMIN' && role != 'USER_PADRAO'){
          next("/error-page");
        } else {
          next("/home");
          //this.$router.push('/home');
        }

      } else {
        this.msgSistema = response.data.mensagem;
        this.tipoMsgSistema = 'alert-danger';
      }
    
    }

  }).catch((error) => {
    console.log(error);
    if(error.response.data.type == 'ERROR') {
        this.msgSistema = error.response.data.mensagem;
        this.tipoMsgSistema = 'alert-danger';
    }          
  });

  



}