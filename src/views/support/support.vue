<template>
    <div class="row">
        <div class="col-md-12 col-sm-12">
    <div class="support-form-container">
      <form class="support-form" @submit.prevent="handleSubmit">
        <h2>Contact Support</h2>
        <div class="col-md-6 col-sm-12">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input v-model="form.fullName" type="text" id="fullName" name="fullName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input v-model="form.subject" type="text" id="subject" name="subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="form.message" id="message" name="message" rows="5" required></textarea>
        </div>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
    </div>
    </div>
  </template>
  
  <script>
  import axiosClient from '../../axios'

  export default {
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          subject: '',
          message: ''
        }
      };
    },
    methods: {
    //--------------TOAST MESSAGE--------------
    snackbarMsg(message) {
        this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
        })
    },
    async handleSubmit() {
    try {
        await axiosClient.post('/sendSupportEmail',this.form)
        this.snackbarMsg('Message Sent Successfully!')
    } catch (error) {
        console.log(error)
        this.snackbarMsg('Something Went Wrong.')
    }
    }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  
  .support-form-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 100%;
  }
  
  .support-form {
    display: flex;
    flex-direction: column;
  }
  
  .support-form h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: black;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #573078;
    outline: none;
  }
  
  .submit-button {
    padding: 10px;
    background-color: #573078;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    width: 120px;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #43225d;
  }
  </style>
  