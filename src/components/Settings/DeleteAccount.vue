<template>
  <div class="delAccountGrid">
    <div class="alertTitle">
      <font-awesome-icon class="mr-4" icon="exclamation-triangle" style="color:white" />
      <span>DANGER</span>
    </div>
    <div class="alertMsg text-center">
      <span>Your Account and all your information is about to be PERMANENTLY DELETED.</span>
    </div>
    <div class="DAForm">
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-if="authProvider"
          filled
          v-model="currentPassword"
          label="Current Password"
          outlined
          clearable
          autocomplete="current-password"
          :type="passwordType"
          :rules="passwordRules"
        >
          <template v-slot:prepend-inner>
            <v-icon small color="white" class="mr-2 mt-1">lock</v-icon>
          </template>
          <template v-slot:append>
            <v-icon class="ml-1" :color="eyeColor" @click="showHide">{{visibility}}</v-icon>
          </template>
        </v-text-field>
      </v-form>
    </div>
    <div class="DAbuttons">
      <MyButton
        @click.native="deleteAccountFunction()"
        class="centered"
        t1="DELETE"
        t2="ACCOUNT"
        icon="exclamation-triangle"
        ic="white"
        bc1="rgba(244, 0, 0, 0.89)"
        bc2="rgba(244, 220, 0, 0.59)"
      />
      <MyButton
        @click.native="emitCancel()"
        class="centered"
        t1="Return to"
        t2="Settings"
        icon="arrow-circle-left"
        ic="#8C00FF"
        bc1="rgba(255, 255, 255, 0.59)"
        bc2="rgba(140, 0, 255, 0.54)"
      />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/General/MyButton.vue";
import { mapState } from "vuex";
export default {
  // DATA
  data() {
    return {
      valid: false,
      lockButton: false,
      //Current Password
      currentPassword: "",
      passwordRules: [
        v => !!v || "Current Password is required",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      //Show Hide Password
      passwordType: "password",
      visibility: "visibility",
      eyeColor: "secondary"
    };
  },
  // COMPONENTS
  components: {
    MyButton
  },
  //Computed
  computed: {
    ...mapState(["user", "userWasUpdated"]),
    authProvider() {
      if (this.user) {
        return this.user.providerData[0].providerId == "password";
      } else {
        return false;
      }
    }
  },

  // Methods
  methods: {
    emitCancel() {
      this.$emit("cancelDeleteAccount");
    },
    showHide: function() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.visibility =
        this.visibility === "visibility" ? "visibility_off" : "visibility";
      this.eyeColor =
        this.eyeColor === "secondary" ? "lightMagenta" : "secondary";
    },
    async deleteAccountFunction() {
      if (this.$refs.form.validate() && !this.lockButton) {
        this.lockButton = true;
        //Delete Profile Image in Storage
        await this.$firebasePlugin.deleteProfileImgInStorage(this.user.uid);
        // Delete the User
        await this.$firebasePlugin.deleteUser(this.currentPassword);
        this.lockButton = false;
        this.$router.replace("/");
      }
    }
  }
};
</script>
<style >
.delAccountGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 15px 1fr 15px;
  grid-template-rows: 35px 83px 1fr 1fr;
  background-image: linear-gradient(
    0deg,
    rgba(97, 0, 0, 0.863),
    rgba(5, 0, 0, 0.863),
    rgba(255, 0, 0, 0.76)
  );
}
.alertTitle {
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  font-size: 18px;
  font-family: "Lexend Deca", sans-serif;
}
.alertMsg {
  grid-column: 2;
  grid-row: 2;
  align-self: start;
  font-size: 18px;
  font-family: "Lexend Deca", sans-serif;
}
.DAbuttons {
  grid-column: 1 / span 3;
  grid-row: 4;
  display: grid;
  align-self: start;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}
.DAForm {
  grid-column: 2;
  grid-row: 3;
  align-self: center;
}
</style>