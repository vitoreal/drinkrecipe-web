<template>

<div class="alert" :class="tipoMsgSistema" role="alert">
    {{ msgSistema }}
</div>
    
</template>

<script>


export default {
  name: "BoxMensagemSistema",
  props: ['msgSistema', 'tipoMsgSistema']
}
</script>
