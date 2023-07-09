import { createRouter, createWebHistory } from 'vue-router';

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
  
  { path: '/error-page', name: 'ErrorPage', component: ErrorPage  },
  //{ path: '/home', name: 'HomePage', component: HomePage, beforeEnter: checkAuthAll },
  { path: '/home', name: 'HomePage', component: HomePage, beforeEnter: checkAuthAll },

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
  if(checkAuth(next)){
    var role = retornaRole();
    if(role != 'ROOT_ADMIN' && role != 'SUPER_ADMIN' && role != 'EMPRESA_ADMIN' && role != 'ADVOGADO_ADMIN' && role != 'CLIENTE_ADMIN'){
      next("/error-page");
    } else {
      next();
    }
  }
}

// Verifica se tem autorizacao para entrar na pagina
function checkAuth(next) 
{
  if(!localStorage.getItem('user') || !localStorage.getItem('token')){

    // Verifica se o login foi feito atraves do google
    
    next("/");
  } 
  return true;

}

function retornaRole(){
  var user = JSON.parse(localStorage.getItem('user'));
  return user.roles[0].name;
}
