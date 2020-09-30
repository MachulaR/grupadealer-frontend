<template>
  <div id="app" class="row justify-content-center">
    <div class="col-3"></div>
      <div class="col-6">
    <vue-form-generator :schema="schema" :model="model" />
    <button class="btn btn-secondary" v-on:click="sendNotification">Send Notification(s)</button>
      </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      model: {
        logins: [],
        message: ""
      },
      schema: {
        fields: [
          {
            type: "checklist",
            label: "Users:",
            model: "logins",
            multi: true,
            required: true,
            multiSelect: true,
            values: this.getUsersLoginList
          },
          {
            type: "textArea",
            inputType: "textArea",
            rows: 3,
            label: "message",
            model: "message",
            required: true
          }
        ]
      }
    };
  },
  methods: {
    getUsersLoginList() {
      let usersLoginList = [];
      this.$store.state.users.forEach(user => {
        usersLoginList.push(user.login);
      });
      return usersLoginList;
    },
    sendNotification() {
      let data = {
        message: this.model.message,
        logins: this.model.logins.join(", ")
      };
      data = JSON.stringify(data);

      axios
        .post(this.$store.state.url + "/notification/send", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          if(response.data.status == 200) {
            this.$notification["success"]("Notification(s) send!");
          } else {
            this.$notification["error"]("Something went wrong!");
          }
        });
    }
  }
};
</script>
<style>
  body {
    background-color: #fafafa !important;
  }

  .form-group{
    align-items: center;
    padding: 5px 20%;
  }

  .field-wrap, .wrapper{
    width: 100%;
  }

  .dropList{
    left: 0;
    background-color: #FFF;
    position: relative;
  }  
  </style>
