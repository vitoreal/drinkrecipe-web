<template>
  <base-layout>
    <title-header-layout title-page="Meus dados" icon-page="fa-pen"></title-header-layout>
    <div class="container-fluid px-4">

      <div class="card mb-4">
        
        <div class="card-body">
          <box-mensagem-sistema v-if="msgSistema" :msgSistema="msgSistema" :tipoMsgSistema="tipoMsgSistema" />
                              
          <form @submit.prevent="submit" ref="formSubmit" method="post">
            <div class="mb-3 row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Nome:</label>
              <div class="col-sm-5">
                <input class="form-control" v-model="state.nome" />
              </div>
              <label class="error" v-if="v$.nome.$error">{{ v$.nome.$errors[0].$message }}</label>
            </div>
            
            <div class="mb-3 row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">CPF</label>
              <div class="col-sm-5">
                <input class="form-control" v-model="state.documento" v-mask="[ '###.###.###-##' ]" />
              </div>
              <label class="error" v-if="v$.documento.$error">{{ v$.documento.$errors[0].$message }}</label>
            </div>

            <div class="mb-3 row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Telefone:</label>
              <div class="col-sm-5">
                <input class="form-control" v-model="state.telefone" v-mask="['(##) ####-####', '(##) #####-####']" />
              </div>
              <label class="error" v-if="v$.telefone.$error">{{ v$.telefone.$errors[0].$message }}</label>
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
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mask } from 'vue-the-mask'

export default {
  name: "MeusDadosPage",
  directives: { mask },
  setup() {
    const state = reactive({
      nome: "",
      documento: "",
      telefone: ""
    })

   // const router = 
    const rules = computed(() => {
      return { 
        nome: { 
          required: helpers.withMessage("Campo nome é obrigatório!", required)
        },
        documento: { 
          required: helpers.withMessage("Campo documento é obrigatório!", required)
        },
        telefone: { 
          required: helpers.withMessage("Campo telefone é obrigatório!", required)
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
      msgSistema: '',
      tipoDoc: '',
      tipoMask: ''
    }
  },
  validations() {
    return {
      nome: { 
        required
      },
      documento: { 
        required
      },
      telefone: { 
        required
      },
    };
  },
  methods: {
    
   async submitForm() {
      
      this.v$.$validate();

      if(!this.v$.$error){

        // JSON.stringify(data)

       const response = await this.axios.post('alterar-dados', {
            name: this.state.nome,
            documento: this.state.documento,
            telefone: this.state.telefone,
        }).catch((error) => {
            if(error.response.data.type == 'ERROR'){
              this.msgSistema = error.response.data.mensagem;
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
      
    },
    async buscarMeusDados() {
      
      this.checkAuthTokenMixin(this.axios);

      await this.axios.get('usuario/buscar-meus-dados').then((response)=>{
          //this.users = response.data.users
          this.state.nome = response.data.user.name;
          this.state.telefone = response.data.telefone;
          if(response.data.tpCliente == 'CLIENTE'){
            this.state.documento = response.data.cpf;
            this.tipoDoc = 'CPF';
            this.tipoMask = '###.###.###-##';
            
          } else {
            this.state.documento = response.data.cnpj;
            this.tipoDoc = 'CNPJ';
            this.tipoMask = '##.###.###/####-##';
          }
          
          console.log(response);
        });

        
      
    }
  },
  mounted(){
    this.buscarMeusDados();
  }
};
</script>
