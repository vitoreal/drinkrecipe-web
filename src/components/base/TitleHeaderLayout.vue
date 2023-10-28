<template>
<div class="card bg-light-info shadow-none position-relative overflow-hidden">
    <div class="card-body">
    <h5 class="fw-semibold mb-8">
      <div class="page-header-icon">
        <font-awesome-icon :icon="iconPage" />
        {{ titlePage }}
      </div>
      
    </h5>
    <!-- <p class="mb-0">This is a sample page </p> -->
    </div>
</div>
</template>

<script>

export default {
  name: 'MenuLayout', 
  props: ['titlePage', 'iconPage'] 
}
</script>
