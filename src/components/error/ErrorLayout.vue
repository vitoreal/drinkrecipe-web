<template>

<header-layout></header-layout>
<div id="layoutSidenav">

    <div id="layoutSidenav_content">
        <main>
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3"> <span class="text-danger">Ooops!</span> Página não encontrado.</p>
                    <p class="lead">
                        A página que você tentou acessar não existe ou você não tem permissão!
                    </p>
                    <router-link to="/home" class="btn btn-primary">Home</router-link>
                </div>
            </div>
        </main>
        <footer-layout></footer-layout>
    </div>
</div>
    
</template>

<script>


export default {
  name: "ErrorLayout"
}
</script>
