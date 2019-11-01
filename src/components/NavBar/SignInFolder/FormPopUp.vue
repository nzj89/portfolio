<template>
  <v-dialog width="440" v-model="dialog">
    <!-- Snackbar -->
    <v-snackbar v-model="showSnackBar" :timeout="8000" bottom color="error">
      <v-icon class="mr-3">error</v-icon>
      <span class="title font-weight-black text-xs-center">{{snackText}}</span>
      <v-btn text icon @click="showSnackBar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- Button Activator -->
    <template v-slot:activator="{ on }">
      <button v-on="on" v-show="!user" text>
        <font-awesome-icon size="lg" icon="user" />
      </button>
    </template>

    <!-- Background Img-->
    <v-img class="imgStyle" :src="require('@/assets/tech3.jpg')" height="430px" alt="resized image">
      <FormSignIn
        :showSignInForm="showSignIn"
        @msgClosePopUp="closePopUp"
        @msgChangeForm="changeForm"
        @msgShowSnackBar="showSnackBarFunction"
      />
      <FormSignUp
        :showSignUpForm="showSignUp"
        @msgClosePopUp="closePopUp"
        @msgChangeForm="changeForm"
        @msgShowSnackBar="showSnackBarFunction"
      />
    </v-img>
  </v-dialog>
</template>

<script>
import FormSignIn from "./FormSignIn.vue";
import FormSignUp from "./FormSignUp.vue";
import { mapState } from "vuex";
export default {
  components: { FormSignIn, FormSignUp },
  data() {
    return {
      dialog: false,
      showSignIn: true,
      showSignUp: false,
      showSnackBar: false,
      snackText: "caca"
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    changeForm() {
      this.showSnackBar = false;
      if (this.showSignIn) {
        this.showSignIn = false;
        setTimeout(() => (this.showSignUp = true), 550);
      } else {
        this.showSignUp = false;
        setTimeout(() => (this.showSignIn = true), 550);
      }
    },
    closePopUp() {
      this.showSignIn = true;
      this.showSignUp = false;
      this.showSnackBar = false;
      this.dialog = false;
    },
    showSnackBarFunction(msg) {
      this.showSnackBar = true;
      this.snackText = msg;
    }
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.showSignIn = true;
        this.showSignUp = false;
        this.showSnackBar = false;
      }
    }
  }
};
</script>

<style>
.imgStyle {
  border-radius: 10px;
}
</style>
