<template>
<!--  Header Start -->


<header class="app-header v-toolbar v-toolbar--density-default elevation-0 v-theme--BLUE_THEME v-locale--is-ltr v-app-bar">
  <nav class="navbar navbar-expand-lg navbar-light ">
    <div class="navbar-collapse justify-content-end px-0 " id="navbarNav">
      
      

          <div class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-end mb-md-0">
            
            <div class="dropdown text-end">
              <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logoutMixin">Sign out</a></li>
              </ul>
            </div>
          </div>
     <!--

      <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
        <a href="#" @click="logoutMixin">  
              <div class="dropdown-item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sair
              </div>
          </a>
      </ul>
      -->
    </div>
  </nav>
</header>
<!--  Header End -->
</template>

<script>

export default {
  name: 'HeaderLayout',
}
</script>
