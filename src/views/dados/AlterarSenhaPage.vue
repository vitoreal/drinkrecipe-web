<template>
  <base-layout>
    <title-header-layout title-page="Alterar Senha" icon-page="fa-key"></title-header-layout>
    <div class="container-fluid px-4">

      <div class="card mb-4">
        
        <div class="card-body">
          <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
          <form @submit.prevent="submit" ref="formSubmit" method="post">
            <div class="mb-3 row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Senha</label>
              <div class="col-sm-5">
                <input class="form-control" v-model="state.password" type="password" />
              </div>
              <div v-for="(error, index) of v$.password.$errors" :key="index">
                <label class="error">{{ error.$message }}</label>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Confirmar Senha</label>
              <div class="col-sm-5">
                <input class="form-control" v-model="state.password_confirmation" type="password" />
              </div>
              <div v-for="(error, index) of v$.password_confirmation.$errors" :key="index">
                <label class="error">{{ error.$message }}</label>
              </div>
            </div>

              <div class="d-flex align-items-center justify-content-center mt-4 col-md-6">
                  <button type="button" @click="submitForm"  class="btn btn-primary" style="margin-right: 10px;">Salvar</button>
              </div>
          </form>
          
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
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
        }
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
    };
  },
  methods: {
    
   async submitForm() {
      
      console.log(this.$v)

      this.v$.$validate();

      if(!this.v$.$error){
              
        // JSON.stringify(data)
      
       const response = await this.axios.post('alterar-senha', {
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }).catch((error) => {
         
          if(error.response.data.type == 'ERROR'){
            this.msgSistema = error.response.data.mensagem;
            this.tipoMsgSistema = 'alert-danger';
          }
                     
        });
        
          
        if(this.checkIsUndefined(response)){
          
          if(response.data.type == 'SUCESSO'){
            
            this.msgSistema = response.data.mensagem;
            this.tipoMsgSistema = 'alert-success';

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
