<template>
  <transition name="fadeTransition">
    <v-container class="myContainer" v-if="showSignInForm" fluid pa-0>
      <!-- Title -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol text-center pa-1" cols="8">
          <span class="display-1 lightBlue1--text">Sign In</span>
        </v-col>
      </v-row>
      <!-- Log in with Social Media -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-1" cols="9">
          <span class="caption">Sign in with Social Media</span>
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
          <v-divider class="my-1"></v-divider>
        </v-col>
      </v-row>

      <!-- Email & Password Login -->
      <v-row class="myRow" justify="center">
        <v-col class="myCol pa-1 pb-3" cols="9">
          <span class="caption">Sign in with Email</span>
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

        <!-- Password -->
        <v-row class="myRow">
          <v-col class="myCol pa-0" offset="1" cols="10">
            <v-text-field
              :rules="passwordRules"
              v-model="password"
              label="Password"
              :type="passwordType"
              outlined
              clearable
              autocomplete="current-password"
            >
              <template v-slot:prepend-inner>
                <v-icon small color="primary" class="mr-3">lock</v-icon>
              </template>

              <template v-slot:append>
                <v-icon :color="eyeColor" @click="showHide">{{visibility}}</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="myRow pb-2" justify="center">
        <v-col class="myCol pa-0" cols="5">
          <MyButton
            @click.native="login()"
            class="centered"
            t1="SIGN"
            t2="IN"
            icon="sign-in-alt"
            ic="rgba(50, 250, 140, 1)"
            bc1="rgba(50, 250, 240, 0.71)"
            bc2="rgba(50, 250, 140, 0.91)"
          />
        </v-col>
        <v-col class="myCol pa-0" cols="5">
          <MyButton
            @click.native="changeForm()"
            class="centered"
            t1="Create"
            t2="Account"
            icon="plus"
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
  //Props
  props: {
    showSignInForm: Boolean
  },
  // COMPONENTS
  components: {
    MyButton
  },
  //Data
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordType: "password",
      visibility: "visibility",
      eyeColor: "secondary",
      loadingLogIn: false,
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
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ]
    };
  },

  //Methods
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.loadingLogIn = true;
        await this.$firebasePlugin.login(this.email, this.password);
        this.loadingLogIn = false;
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
    // Whenever user changes, this function will run, auth is the new value of user. See example in notes.
    user(auth) {
      if (auth) {
        this.$emit("msgClosePopUp");
        this.$router.replace(this.nextRoute);
      }
    }
  }
};
</script>


<!-- ================================================================================================================= -->
<!-- STYLE -->
<!-- ================================================================================================================= -->
<style >
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0) inset;
}
</style>

<!-- 

.myContainer {
  border: 2px rgb(145, 255, 0) solid;
}
.myRow {
  border: 2px rgb(255, 0, 0) solid;
}
.myCol {
  border: 2px rgb(0, 174, 255) solid;
}


-->
