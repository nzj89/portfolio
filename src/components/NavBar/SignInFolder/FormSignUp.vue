<template>
  <transition name="fadeTransition">
    <v-container class="myContainer" v-if="showSignUpForm" fluid pa-0>
      <!-- Title -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol text-center pa-1" cols="8">
          <span class="title primary--text">Create Account</span>
        </v-col>
      </v-row>
      <!-- Sign Up with Social Media -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-1" cols="9">
          <span class="caption">Create account with Social Media</span>
        </v-col>
      </v-row>
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-1" cols="5">
          <!-- Google Button -->
          <MyButton
            @click.native="googleLogin()"
            class="centered"
            t1="With"
            t2="Google"
            :icon="['fab', 'google']"
            ic="#4285F4"
            bc1="#4285F4"
            bc2="rgba(0, 255, 255, 0.81)"
          />
        </v-col>
        <v-col class="myCol pa-1" cols="5">
          <!-- Facebook Button -->
          <MyButton
            @click.native="facebookLogin()"
            class="centered"
            t1="With"
            t2="Facebook"
            :icon="['fab', 'facebook-f']"
            ic="#3b5fff"
            bc1="#311fff"
            bc2="rgba(100, 105, 255, 0.51)"
          />
        </v-col>
      </v-row>
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-0" cols="11">
          <v-divider class="ma-0 mt-1"></v-divider>
        </v-col>
      </v-row>
      <!-- Email & Password Account Create -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-1 pb-3" cols="9">
          <span class="caption">Create account with Email</span>
        </v-col>
      </v-row>
      <v-form v-model="valid" ref="form">
        <!-- Email -->
        <v-row class="myRow">
          <v-col class="myCol pa-0" offset="1" cols="10">
            <v-text-field
              autocomplete="email"
              :rules="emailRules"
              v-model="email"
              label="Email"
              outlined
              clearable
            >
              <template v-slot:prepend-inner>
                <v-icon class="mt-1 mr-3" small color="primary">email</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- Password & Confirm -->
        <v-row class="myRow mx-2">
          <v-col class="myCol pa-1 py-0 pl-0">
            <v-text-field
              counter
              :rules="passwordRules"
              v-model="password"
              label="Password"
              :type="passwordType"
              outlined
              clearable
              autocomplete="new-password"
            >
              <template v-slot:prepend-inner>
                <v-icon small color="primary" class="mr-1">lock</v-icon>
              </template>
            </v-text-field>
          </v-col>

          <!-- Confirm -->
          <v-col class="myCol pa-1 py-0 pr-0">
            <v-text-field
              :rules="confirmRules"
              v-model="passwordConfirm"
              label="Confirm "
              :type="passwordType"
              outlined
              clearable
              :error-messages="matchError()"
              autocomplete="new-password"
            >
              <template v-slot:prepend-inner>
                <v-icon small color="primary" class="mr-1">lock</v-icon>
              </template>
              <template v-slot:append>
                <v-icon small class="mt-1" :color="eyeColor" @click="showHide">{{visibility}}</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <!-- Create Account Button -->
      <v-row class="myRow pb-2" justify="center">
        <v-col class="myCol pa-1" cols="5">
          <MyButton
            @click.native="createAccount()"
            class="centered"
            t1="Create"
            t2="Account"
            icon="plus"
            ic="rgba(50, 250, 140, 1)"
            bc1="rgba(50, 250, 240, 0.71)"
            bc2="rgba(50, 250, 140, 0.91)"
          />
        </v-col>

        <v-col class="myCol pa-1" cols="5">
          <MyButton
            @click.native="changeForm()"
            class="centered"
            t1="Go"
            t2="Back"
            icon="arrow-circle-left"
            ic="rgba(255, 255, 70, 1)"
            bc1="rgba(100, 255, 100, 0.71)"
            bc2="rgba(250, 255, 00, 0.71)"
          />
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<!-- ================================================================================================================= -->
<!-- Scripts -->
<!-- ================================================================================================================= -->
<script>
import { mapState } from "vuex";
import MyButton from "@/components/General/MyButton.vue";
export default {
  // COMPONENTS
  components: {
    MyButton
  },
  //Props
  props: {
    showSignUpForm: Boolean
  },

  //Data
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordConfirm: "",
      passwordType: "password",
      visibility: "visibility",
      eyeColor: "secondary",
      loadingCreateAccount: false,
      loadingGoogle: false,
      loadingFacebook: false,
      min: 6,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v || "").length >= this.min || `Minimum ${this.min} characters `,
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      confirmRules: [v => !!v || "Please confirm your password"]
    };
  },

  //Methods
  methods: {
    async createAccount() {
      if (this.$refs.form.validate()) {
        this.loadingCreateAccount = true;
        await this.$firebasePlugin.signUp(this.email, this.password);
        this.loadingCreateAccount = false;
        if (!this.user) {
          this.$emit("msgShowSnackBar", "Login Error");
        }
      } else {
        this.$emit(
          "msgShowSnackBar",
          "Please make sure all the fields are valid"
        );
      }
    },

    async googleLogin() {
      this.loadingGoogle = true;
      await this.$firebasePlugin.googleLogin();
      this.loadingGoogle = false;
    },
    async facebookLogin() {
      this.loadingFacebook = true;
      await this.$firebasePlugin.facebookLogin();
      this.loadingFacebook = false;
    },
    showHide: function() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.visibility =
        this.visibility === "visibility" ? "visibility_off" : "visibility";
      this.eyeColor =
        this.eyeColor === "secondary" ? "lightMagenta" : "secondary";
    },
    changeForm() {
      this.$emit("msgChangeForm");
    },
    matchError() {
      if (this.passwordConfirm !== "") {
        return this.password === this.passwordConfirm
          ? ""
          : "Password must match";
      } else return "";
    }
  },

  //Computed
  computed: {
    ...mapState(["user"]),
    nextRoute() {
      return this.$route.query.redirect || "/";
    }
  },

  // WATCH
  //This changes the route
  watch: {
    // Whenever user changes, this function will run, auth is the new value of user. See example in nots.
    user(auth) {
      if (auth) {
        this.$emit("msgClosePopUp");
        this.$router.replace(this.nextRoute);
      }
    }
  }
};
</script>

<!-- STYLE -->
<!-- ================================================================================================================= -->
<style scoped>
a {
  text-decoration: none;
}
.fadeTransition-enter-active,
.fadeTransition-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fadeTransition-enter,
.fadeTransition-leave-active {
  opacity: 0;
  transform: translate(10px);
}
</style>




