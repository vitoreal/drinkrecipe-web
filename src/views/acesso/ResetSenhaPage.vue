<template>
<div id="layoutAuthentication">
  <div id="layoutAuthentication_content">
      <main>
          <div class="container-xl px-4">
              <div class="row justify-content-center">
                  <div class="col-lg-5">
                      <!-- Basic login form-->
                      <div class="card shadow-lg border-0 rounded-lg mt-5">
                          <div class="card-header justify-content-center"><h3 class="fw-light my-4">Nova senha: {{ nomeSistema }}</h3></div>
                          <div class="card-body">
                              <!-- Login form-->
                              <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
                              <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
                                <input type="hidden" v-model="$route.params.token" />
                                <div class="row mb-3">
                                   <label class="small mb-1">E-mail:</label>
                                  <input class="form-control" v-model="state.email" />
                                  <label class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</label>
                                </div>
                                <div class="row mb-3">
                                  <label class="small mb-1">Senha:</label>
                                    <input v-model="state.password" type="password" class="form-control" />
                                    <div v-for="(error, index) of v$.password.$errors" :key="index">
                                    <label class="error">{{ error.$message }}</label>
                                  </div>
                                </div>
                                <div class="row mb-3">
                                  <label class="small mb-1">Confirmar Senha:</label>
                                    <input v-model="state.password_confirmation" type="password" class="form-control" />
                                    <div v-for="(error, index) of v$.password_confirmation.$errors" :key="index">
                                    <label class="error">{{ error.$message }}</label>
                                  </div>
                                  
                                </div>
                                <!-- Form Group (login box)-->
                                <div class="d-flex align-items-center justify-content-center mt-4 mb-0">
                                    <button type="button" @click="submitForm"  class="btn btn-primary" style="margin-right: 10px;">Salvar</button>
                                </div>
                              </form>
                          </div>
                          <div class="card-footer text-center">
                            <div class="small">
                              <router-link to="/">Voltar para a página de login</router-link>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  </div>
  <div id="layoutAuthentication_footer" class="bg-primary">
      <footer class="footer-admin mt-auto footer-dark">
          <div class="container-xl px-4">
              <div class="row">
                  <div class="col-md-6 small">Copyright © {{ nomeSistema }} 2022</div>
                  <div class="col-md-6 text-md-end small">
                      <a href="#!">Política e Privacidade</a>
                      ·
                      <a href="#!">Termos &amp; Condições</a>
                  </div>
              </div>
          </div>
      </footer>
  </div>
</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, sameAs, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "loginPage",
  setup() {
    const state = reactive({
      email: "",
      password: "",
      password_confirmation: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        password: {
            required: helpers.withMessage("Campo senha é obrigatório!", required),
            minLength: helpers.withMessage(
               ({ $params }) =>"Insira uma senha com mais de "+$params.min+" dígitos!", minLength(6)),
        },
        password_confirmation: {
            sameAsPassword: helpers.withMessage("Senhas diferentes!", sameAs(state.password)),
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
     token: ""
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(6),
      },
      password_confirmation: {
        sameAsPassword: sameAs('password')
      },
      email: { 
        required,
        email,
      },
    };
  },
  methods: {
    
   async submitForm() {
      
      console.log(this.$v)

      this.v$.$validate();

      if(!this.v$.$error){
              
        // JSON.stringify(data)
      
       const response = await this.axios.post('reset-senha', {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            token: this.token
        }).catch((error) => {
         
          if(error.response.data.type == 'ERROR'){
            this.msgSistema = error.response.data.mensagem;
            this.tipoMsgSistema = 'alert-danger';
          }
                     
        });
        
          
        if(this.checkIsUndefinedMixin(response)){
          
          if(response.data.type == 'SUCESSO'){
            
            this.$router.push('/home');

          } else {
            alert("Algo inexperado aconteceu!");
          }
        
        }
      }
      
    }
  },
  mounted(){
     this.token = this.$route.params.token;
    },
};
</script>
