<template>

<!--  Body Wrapper -->
<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <!-- Sidebar Start -->
    <menu-layout></menu-layout>
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
        <header-layout></header-layout>
      <div class="container-fluid">
        <slot />
      </div>
    </div>
  </div>
    
</template>

<script>


export default {
  name: "BaseLayout"
}
</script>
