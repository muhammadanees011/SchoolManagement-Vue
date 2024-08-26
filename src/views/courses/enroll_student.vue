<template>
    <div v-if="show" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="h5 modal-title">Enroll Student to this Course</h5>
            <button type="button" class="btn-close text-dark" @click="closeModal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="pt-4 modal-body">
            <input id="jkanban-task-id" class="d-none">
            <div class="mb-4 input-group">
              <span class="input-group-text"><i class="far fa-edit" aria-hidden="true"></i></span>
              <input id="jkanban-task-title" v-model="StudentID" class="form-control" placeholder="Enter Student ID" type="text">
            </div>
            <!-- <div class="mb-4 input-group">
              <span class="input-group-text"><i class="fas fa-user" aria-hidden="true"></i></span>
              <input id="jkanban-task-assignee" v-model="localTask.assignee" class="form-control" placeholder="Task Assignee" type="text">
            </div>
            <div class="form-group">
              <textarea id="jkanban-task-description" v-model="localTask.description" class="form-control" placeholder="Task Description" rows="4"></textarea>
            </div> -->
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
      task: {
        type: Object,
        default: () => ({
          title: '',
          assignee: '',
          description: ''
        })
      }
    },
    computed: {
    },
    data() {
      return {
      StudentID:null,
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
      snackbarMsg(message) {
        this.$snackbar.add({
          type: 'success',
          text: message,
          background: 'white',
        })
      },
      closeModal() {
        this.$emit('close');
      },
      async saveChanges() {
        this.isError=false;
        let data={
          'StudentID':this.StudentID,
          'CourseCode':this.$route.params.id
        }
        try {
          await axiosClient.post('/enrollStudent', data)
          this.snackbarMsg('Student Enrolled Successfuly')
        } catch (error) {
          this.isError=true;
          this.validationErrors=error.response.data.errors
          for(let i=0; i<this.validationErrors.length; i++){
          this.snackbarMsg(this.validationErrors[i])
          }
        }
        this.closeModal();
        this.$emit('update-students');
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
  </style>
  