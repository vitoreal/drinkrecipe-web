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
                              <h4 class="my-4">Lembrar Senha</h4>
                          
                              <!-- Login form-->
                              <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
                              <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
                                <div class="row mb-3">
                                   <label class="small mb-1">E-mail:</label>
                                  <input class="form-control" v-model="state.email" />
                                  <label class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</label>
                                </div>
                                
                                <!-- Form Group (login box)-->
                                <div class="d-flex align-items-center justify-content-center mt-4 mb-0">
                                    <button type="button" @click="submitForm"  class="btn btn-primary" style="margin-right: 10px;">Enviar</button>
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
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "loginPage",
  props: ["errorLogin"],
  setup() {
    const state = reactive({
      email: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        email: { 
          required: helpers.withMessage("Campo e-mail é obrigatório!", required)
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
      email: { 
        required
      },
    };
  },
  methods: {
    
   async submitForm() {
      
      console.log(this.$v)

      this.v$.$validate();

       if(!this.v$.$error){

        // JSON.stringify(data)

        const response = await this.axios.post('lembrar-senha', {
            email: this.state.email,
            urlRetorno: window.location.origin+"/reset-senha"
        }).catch((error) => {
            if(error.response.data.type == 'ERROR'){
              this.msgSistema = error.response.data.mensagem;
              this.tipoMsgSistema = 'alert-danger';
            } else {
              this.msgSistema = "Algum erro aconteceu!";
              this.tipoMsgSistema = 'alert-danger';
            }
        });
        
        if(this.checkIsUndefinedMixin(response)){
          if(response.data.type == 'SUCESSO'){
              this.msgSistema = response.data.mensagem;
              this.tipoMsgSistema = 'alert-success';
          }
        }
        
       

      } else {
         console.log("Error na validação"); 
      }
      
    }
  }
};

</script>
