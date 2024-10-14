<template>
    <div v-if="show" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" style="width: 28%;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="h5 modal-title">Product Owner</h5>
            <button type="button" class="btn-close text-dark" @click="closeModal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="pt-4 modal-body">
            <input id="jkanban-task-id" class="d-none">
            <div class="mb-4 input-group">
              <input id="jkanban-task-title" v-model="owner.product_owner_name" type="email" class="form-control border p-1" placeholder="Name">
            </div>
            <div class="mb-4 input-group">
              <input id="jkanban-task-title" v-model="owner.product_owner_email" type="email" class="form-control border p-1" placeholder="Email">
            </div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div class="text-end">
              <button @click="saveChanges" class="m-1 btn btn-primary"> Save </button>
              <button @click="closeModal" class="m-1 btn btn-secondary"> Close </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axiosClient from '../../axios'

  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      },
      ownerData: {
        type: Object,
        required: true,
     },

    },
    mounted(){
      this.$globalHelper.buttonColor();
    },
    computed: {
      formattedBalance: {
        get() {
          return this.addedBalance;
        },
        set(value) {
          const formattedValue = parseFloat(value).toFixed(2);
          this.addedBalance = formattedValue;
        },
      },
    },
    data() {
      return {
        addedBalance:null,
        successMessage: '',
        owner:{
            product_owner_name:'',
            product_owner_email:''
          },
      };
    },
    watch: {
        ownerData: {
        handler(newData) {
          this.owner = newData;
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      async saveChanges() {
        try {
          const apiUrl =`/productsOwner`;
          await axiosClient.post(apiUrl, this.owner)
          this.snackbarMsg('Item Updated Successfuly')
        } catch (error) {
            console.log(error)
        }
        this.$emit('update-task', this.addedBalance);
        this.closeModal();
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
  