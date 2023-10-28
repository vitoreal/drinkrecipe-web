<template>

  <!--  Body Wrapper -->
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="@/assets/images/logos/DrinkRecipeLogo.png" width="180" alt="">
                </a>
                <div class="row">
                    <div class="col-12 mb-2 mb-sm-0" data-ux_mode="popup">
                      <a class="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8" href="http://localhost:8000/api/redirect" role="button">
                        <img src="@/assets/images/logos/google-icon.svg" alt="" class="img-fluid me-2" width="18" height="18">
                        <span class="d-none d-sm-block me-1 flex-shrink-0">Entrar com</span>Google
                      </a>
                    </div>
                  </div>
                  <div class="position-relative text-center my-4">
                    <p class="mb-0 fs-4 px-3 d-inline-block bg-white text-dark z-index-5 position-relative">ou entrar com</p>
                    <span class="border-top w-100 position-absolute top-50 start-50 translate-middle"></span>
                  </div>

                <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
                <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
                  <input type="hidden" name="errorLogin" id="errorLogin" value="{{ flagErroLogin }}" />
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">E-mail</label>
                    <input type="email" class="form-control" v-model="state.email" aria-describedby="emailHelp">
                    <label class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</label>

                  </div>
                  <div class="mb-4">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="state.password" autocomplete="on">
                    <div v-for="(error, index) of v$.password.$errors" :key="index">
                      <label class="error">{{ error.$message }}</label>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                      <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                      <label class="form-check-label text-dark" for="flexCheckChecked">
                       Relembrar
                      </label>
                    </div>
                    <router-link to="/lembrar-senha" class="text-primary fw-bold">Esqueceu a senha?</router-link>
                  </div>
                  
                  <button type="button" @click="submitForm"  class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Entrar</button>

                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-4 mb-0 fw-bold">Ainda não é cadastrado?</p>
                    <router-link to="/registrar" class="text-primary fw-bold ms-2">Registrar!</router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Descrição da movimentação</h3>
      </template>
      <template #body>
        {{ descricaoMovimentacao }}
      </template>
    </modal>
  </Teleport>

</template>

<script>
import useVuelidate from "@vuelidate/core";

import Modal from './../../components/modal/Modal.vue';

import { required, minLength, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "loginPage",
  components: {
    Modal,
  },
  setup() {
    const state = reactive({
      email: "",
      password: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        password: {
            required: helpers.withMessage("Campo senha é obrigatório!", required),
            minLength: helpers.withMessage(
               ({ $params }) =>"Insira uma senha com mais de "+$params.min+" dígitos!", minLength(6)),
        },
        email: { 
          required: helpers.withMessage("Campo e-mail é obrigatório!", required),
          email: helpers.withMessage("Campo e-mail é inválido!", email),
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
     msgSistema: '',
     showModal: false,
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(6),
      },
      email: { 
        required,
        email,
      },
    };
  },
  methods: {
    
   async submitForm() {
      
      this.v$.$validate();

      if(!this.v$.$error){
              
        // JSON.stringify(data)
      
       const response = await this.axios.post('login', {
            email: this.state.email,
            password: this.state.password
        }).catch((error) => {
         console.log(error);
         if(error.response.data.type == 'ERROR') {
            this.msgSistema = error.response.data.mensagem;
            this.tipoMsgSistema = 'alert-danger';
         }
                     
        });
        
        if(this.checkIsUndefinedMixin(response)){
          
          if(response.data.type == 'SUCESSO'){
            
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));

            this.$store.dispatch('user', response.data.user);
            this.$router.push('/home');

          } else {
            this.msgSistema = response.data.mensagem;
            this.tipoMsgSistema = 'alert-danger';
          }
        
        }
        
      }
      
    }
  }
};
</script>
