<template>
    <div id="layoutSidenav_nav" @click="closeSidebar">
        <!-- Sidebar Start -->
    <aside class="left-sidebar">
      <!-- Sidebar scroll-->
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <router-link v-if="permissaoMenuPadraoMixin()" class="text-nowrap logo-img" to="/home">
            <img src="@/assets/images/logos/DrinkRecipeLogo.png" width="180" alt="" />
          </router-link>
          <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
<!-- Sidebar navigation-->
<nav class="sidebar-nav scroll-sidebar nav-toggler" data-simplebar="">
  <span class="navbar-toggler-icon"></span>
          <ul id="sidebarnav">
            <!-- 
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Geral</span>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/home">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Buscar drinks</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/home">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Meus favoritos</span>
              </router-link>
            </li>
            
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Meus drinks</span>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/home">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Cadastrar drinks</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/home">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Visualizar drinks</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./ui-alerts.html" aria-expanded="false">
                <span>
                  <i class="ti ti-alert-circle"></i>
                </span>
                <span class="hide-menu">Alerts</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./ui-card.html" aria-expanded="false">
                <span>
                  <i class="ti ti-cards"></i>
                </span>
                <span class="hide-menu">Card</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./ui-forms.html" aria-expanded="false">
                <span>
                  <i class="ti ti-file-description"></i>
                </span>
                <span class="hide-menu">Forms</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./ui-typography.html" aria-expanded="false">
                <span>
                  <i class="ti ti-typography"></i>
                </span>
                <span class="hide-menu">Typography</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./authentication-register.html" aria-expanded="false">
                <span>
                  <i class="ti ti-user-plus"></i>
                </span>
                <span class="hide-menu">Register</span>
              </a>
            </li>
            -->
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Perfil</span>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/usuario/meus-dados">
                  <span>
                    <i class="ti ti-mood-happy"></i>
                  </span>
                  <span class="hide-menu">Meus dados</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link v-if="permissaoMenuPadraoMixin()" class="sidebar-link" to="/usuario/alterar-senha">
                  <span>
                    <i class="ti ti-aperture"></i>
                  </span>
                  <span class="hide-menu">Alterar senha</span>
              </router-link>
            </li>

            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">CONFIGURAÇÃO</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./authentication-login.html" aria-expanded="false">
                <span>
                  <i class="ti ti-login"></i>
                </span>
                <span class="hide-menu">Status</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./authentication-login.html" aria-expanded="false">
                <span>
                  <i class="ti ti-login"></i>
                </span>
                <span class="hide-menu">Permissão</span>
              </a>
            </li>

            <!--
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">SUPORTE</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./authentication-login.html" aria-expanded="false">
                <span>
                  <i class="ti ti-login"></i>
                </span>
                <span class="hide-menu">Contato</span>
              </a>
            </li>
            -->
          </ul>
         
        </nav>
        <!-- End Sidebar navigation -->
      </div>
      <!-- End Sidebar scroll-->
    </aside>
    <!--  Sidebar End -->
</div>    
</template>

<script>
//import utils from '../../utils';

export default {
  name: 'MenuLayout',
  methods: {
    closeSidebar(){
        document.body.classList.remove('sidenav-toggled');
        localStorage.removeItem('sb|sidebar-toggle');
    }
   
  },
  mounted(){
    //console.log(this.$store.state.user.role)
    
  }  
}
</script>
