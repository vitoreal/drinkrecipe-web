<template>
<div id="layoutAuthentication">
  <div id="layoutAuthentication_content">
      <main>
          <div class="container-xl px-4">
              <div class="row justify-content-center">
                  <div class="col-lg-5">
                      <!-- Basic login form-->
                      <div class="card shadow-lg border-0 rounded-lg mt-5">
                          <img src="@/assets/images/logos/DrinkRecipeLogo.png" />
                          <div class="card-body">
                              <h4 class="my-4">Preencha os dados abaixo para se cadastrar</h4>
                              <!-- Login form-->
                              <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
                              <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
                                <input type="hidden" name="errorLogin" id="errorLogin" value="{{ flagErroLogin }}" />
                                
                                <div class="row" style="display: none;">
                                  <div class="alert alert-danger">Mensagem de erro</div>
                                </div>
                                <div class="row mb-3">
                                    <label class="small mb-1">Nome:</label>
                                    <input class="form-control" v-model="state.nome" />
                                    <label class="error" v-if="v$.nome.$error">{{ v$.nome.$errors[0].$message }}</label>
                                </div>
                                <div class="row mb-3">
                                    <label class="small mb-1">Email:</label>
                                    <input class="form-control" type="email" v-model="state.email" />
                                    <div v-for="(error, index) of v$.email.$errors" :key="index">
                                      <label class="error">{{ error.$message }}</label>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                  <label class="small mb-1">Senha:</label>
                                    <input v-model="state.password" type="password" class="form-control" autocomplete="on" />
                                  <div v-for="(error, index) of v$.password.$errors" :key="index">
                                    <label class="error">{{ error.$message }}</label>
                                  </div>
                                </div>
                                <div class="row mb-3">
                                  <label class="small mb-1">Repita a Senha:</label>
                                    <input v-model="state.password_confirmation" type="password" class="form-control" autocomplete="on" />
                                    <div v-for="(error, index) of v$.password_confirmation.$errors" :key="index">
                                    <label class="error">{{ error.$message }}</label>
                                  </div>
                                </div>
                                <!-- Form Group (login box)-->
                                <div class="d-flex align-items-center justify-content-center mt-4 mb-0">
                                    <button type="button" @click="submitForm"  class="btn btn-primary" style="margin-right: 10px;">Registrar</button>
                                </div>
                              </form>
                          </div>
                          <div class="card-footer text-center">
                              <div class="small">
                                <router-link to="/">Você já possui registro? Logar!</router-link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  </div>
  <div id="layoutAuthentication_footer" class="bg-primary mt-4">
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
import { required, minLength, sameAs, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "RegistrarPage",
  props: ["errorLogin"],
  setup() {
    const state = reactive({
      email: "",
      password: "",
      password_confirmation: "",
      nome: "",
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
          email: helpers.withMessage("E-mail é inválido!", email)
        },
        nome: { 
          required: helpers.withMessage("Campo nome é obrigatório!", required)
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
      msgSistema: ''
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
        email
      },
      nome: { 
        required
      },
    };
  },
  methods: {

   async submitForm() {
      
      this.v$.$validate();

      if(!this.v$.$error){

        // JSON.stringify(data)

       const response = await this.axios.post('registrar', {
            email: this.state.email,
            password: this.state.password,
            name: this.state.nome,
            password_confirmation: this.state.password_confirmation
        }).catch((error) => {
            if(error.response.data.type == 'ERROR'){
              this.msgSistema = error.response.data.mensagem;
              this.tipoMsgSistema = 'alert-danger';
            }
        });

        if(this.checkIsUndefinedMixin(response)){
          if(response.data.type == 'SUCESSO'){
            alert(response.data.mensagem);
            this.$router.push('/')
          }
        }

      } else {
         console.log("Error na validação"); 
      }
      
    },
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
    }
  },
};
</script>
