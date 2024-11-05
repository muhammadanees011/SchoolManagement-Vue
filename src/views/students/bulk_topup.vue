<template>
    <div v-if="show" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="h5 modal-title">Bulk Topup</h5>
            <button type="button" class="btn-close text-dark" @click="closeModal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="pt-4 modal-body">
            <input id="jkanban-task-id" class="d-none">
            <div class="mb-4 input-group">
              <span class="input-group-text"><i class="far fa-edit" aria-hidden="true"></i></span>
              <input id="jkanban-task-title" v-model="addedBalance" class="form-control" placeholder="Topup amount" type="number" min='0'>
            </div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div class="text-end">
              <button @click="saveChanges" class="m-1 btn btn-primary"> Topup </button>
              <button @click="closeModal" class="m-1 btn btn-secondary"> Close </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      },
      task: {
        type: Object,
        default: () => ({
          title: '',
          assignee: '',
          description: ''
        })
      }
    },
    mounted(){
      this.$globalHelper.buttonColor();
    },
    computed: {
      // formattedBalance: {
      //   get() {
      //     return this.addedBalance;
      //   },
      //   set(value) {
      //     const formattedValue = parseFloat(value).toFixed(2);
      //     this.addedBalance = formattedValue;
      //   },
      // },
    },
    data() {
      return {
        addedBalance:null,
        localTask: { ...this.task },
        successMessage: ''
      };
    },
    watch: {
      task: {
        handler(newTask) {
          this.localTask = { ...newTask };
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      saveChanges() {
        // this.successMessage = 'Changes saved!';
        this.$emit('update-task', this.addedBalance);
        this.closeModal();
        this.addedBalance=null
        // setTimeout(() => {
        //   this.successMessage = '';
        //   this.closeModal();
        // }, 2000);
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
  }
  </style>
  