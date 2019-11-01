<template>
  <div class="userNameSettingsGrid">
    <div class="UNSnameAndIcon">
      <font-awesome-icon class="mr-4" icon="user" style="color:#00aeff"/>
      <span >{{userName}}</span>
    </div>
    <div class="theNameForm">
      <v-form v-model="valid" ref="form">
        <v-text-field
          class="mx-2"
          outlined
          v-model="newUserName"
          clearable
          label="New User Name"
          :rules="newUserNameRules"
        >
          <template v-slot:prepend-inner>
            <v-icon class="ml-1 mt-1 mr-2" small color="primary">create</v-icon>
          </template>
        </v-text-field>
      </v-form>
    </div>
    <div class="UNSbuttons">
      <MyButton
        @click.native="saveChange()"
        class="centered"
        t1="Save"
        t2="Name"
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
      userName: "",
      newUserName: "",
      max: 20,
      min: 5,
      newUserNameRules: [
        v => !!v || "Cannot save empty User Name",
        v => (v || "").length <= this.max || `Maximum ${this.max} characters `,
        v => (v || "").length >= this.min || `Minimum ${this.min} characters `,
        v => (v || "").indexOf("@") < 0 || "@ is not allowed"
      ],
      valid: false,
      lockButton: false
    };
  },
  // COMPONENTS
  components: {
    MyButton
  },
  //Computed
  computed: {
    ...mapState(["user", "userWasUpdated"])
  },
  // Methods
  methods: {
    emitCancel() {
      this.$emit("cancelEditUserName");
    },
    async saveChange() {
      if (this.$refs.form.validate() && !this.lockButton) {
        this.lockButton = true;
        await this.$firebasePlugin.updateDisplayName(this.newUserName);
        this.lockButton = false;
      }
    }
  },
  // WATCH
  watch: {
    userWasUpdated() {
      if (this.user) {
        this.userName =
          this.user.displayName === null ? "New User" : this.user.displayName;
      }
    }
  },
  //Mounted
  mounted: function() {
    this.userName =
      this.user.displayName === null ? "New User" : this.user.displayName;
  }
};
</script>

<style >
.userNameSettingsGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr 1fr 1fr;
  background-image: linear-gradient(
    0deg,
    rgba(0, 2, 24, 0.726),
    rgba(0, 0, 24, 0.671)
  );
}
.UNSnameAndIcon {
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  font-size: 25px;
  font-family: "Lexend Deca", sans-serif;
}
.theNameForm {
  grid-column: 1 ;
  grid-row: 2;
}
.UNSbuttons{
 grid-column: 1 ;
  grid-row: 3;
   display: grid;
   align-self: start;
   grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr ;
}
</style>