<template>
  <div class="emailSettingsGrid">
    <div class="emailAndIcon">
      <font-awesome-icon class="mr-4" icon="envelope" style="color:#00aeff" />
      <span>{{userEmail}}</span>
    </div>
    <div class="theEmailForm">
      <v-form v-model="valid" ref="form">
        <!-- New Email -->
        <v-text-field
          class="mx-2"
          outlined
          v-model="newEmail"
          clearable
          label="New Email"
          :rules="newEmailRules"
          autocomplete="new-email"
        >
          <template v-slot:prepend-inner>
            <v-icon class="ml-1 mt-1 mr-2" small color="primary">create</v-icon>
          </template>
        </v-text-field>
        <!-- Password needed for Change -->
        <v-text-field
          v-if="authProvider"
          class="mx-2"
          v-model="currentPassword"
          label="Current Password"
          outlined
          clearable
          autocomplete="current-password"
          :type="passwordType"
          :rules="passwordRules"
        >
          <template v-slot:prepend-inner>
            <v-icon small color="primary " class="mr-2 mt-1">lock</v-icon>
          </template>
          <template v-slot:append>
            <v-icon class="ml-1" :color="eyeColor" @click="showHide">{{visibility}}</v-icon>
          </template>
        </v-text-field>
      </v-form>
    </div>
    <div class="ESbuttons">
        <MyButton
        @click.native="saveChange()"
        class="centered"
        t1="Save"
        t2="New Email"
        icon="save"
        ic="#00d9ff"
        bc1="rgba(0, 132, 255, 0.616)"
        bc2="rgba(0, 255, 221, 0.61)"
      />
      <MyButton
        @click.native="emitCancel()"
        class="centered"
        t1="Return to"
        t2="Settings"
        icon="arrow-circle-left"
        ic="#8C00FF"
        bc1="rgba(255, 40, 183, 0.55)"
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
      userEmail: "",
      valid: false,
      newEmail: "",
      newEmailRules: [
        v => !!v || " New E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
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
  // WATCH
  watch: {
    userWasUpdated() {
      if (this.user) {
        this.userEmail = this.user.email;
      }
    }
  },
  //Mounted
  mounted: function() {
    this.userEmail = this.user.email;
  },
  // Methods
  methods: {
    emitCancel() {
      this.$emit("cancelEditEmail");
    },
    showHide: function() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.visibility =
        this.visibility === "visibility" ? "visibility_off" : "visibility";
      this.eyeColor =
        this.eyeColor === "secondary" ? "lightMagenta" : "secondary";
    },
    async saveChange() {
      if (this.$refs.form.validate() && !this.lockButton) {
        this.lockButton = true;
        await this.$firebasePlugin.updateEmail(
              this.newEmail,
              this.currentPassword
            );
        this.lockButton = false;
      }
    }
  }
};
</script>

<style >
.emailSettingsGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background-image: linear-gradient(
    0deg,
    rgba(0, 1, 15, 0.863),
    rgba(0, 0, 24, 0.671)
  );
}
.emailAndIcon {
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  font-size: 18px;
  font-family: "Lexend Deca", sans-serif;
}
.theEmailForm {
  grid-column: 1;
  grid-row: 2;
}
.ESbuttons{
 grid-column: 1 ;
  grid-row: 3;
   display: grid;
   align-self: start;
   grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr ;
}
</style>