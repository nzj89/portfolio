<template>
  <div style="height:100%">
    <ProfilePictureSettings v-if="editPicture" @cancelEditPicture="abortEditPic" />
    <UserNameSettings v-if="editUserName" @cancelEditUserName="abortEditName" />
    <EmailSettings v-if="editEmail" @cancelEditEmail="abortEditEmail" />
    <DeleteAccount v-if="deleteAccount" @cancelDeleteAccount="abortDeleteAccount" />
    <div class="settingsGrid" v-if="!editing">
      <!-- Tittle -->
      <div class="tittleBackgorund"></div>
      <div class="settingsTittle">
        <font-awesome-icon class="mx-4" size="lg" icon="cog" />
        <span class="settingsTittleStyle">Settings</span>
      </div>
      <div class="tittleBorderBot"></div>
      <!-- User Picture -->
      <img class="userPicture" :src="userPhotoUrl" />
      <div class="circularAnim2"></div>
      <div class="pictureBorderBot"></div>
      <!-- User Data -->
      <div class="dataBackground"></div>
      <div class="userName">
        <font-awesome-icon class="dataIconStyle mx-4" icon="user" />
        <span class="userDataStyle">{{userName}}</span>
      </div>
      <div class="userEmail">
        <font-awesome-icon class="dataIconStyle mx-4" icon="envelope" />
        <span class="userDataStyle">{{userEmail}}</span>
      </div>
      <!-- Buttons -->
      <div class="buttonsGrid">
        <MyButton
          @click.native="editProPicFn"
          class="centered"
          t1="Edit"
          t2="Picture"
          icon="camera"
          ic="#00d9ff"
          bc1="rgba(0, 132, 255, 0.616)"
          bc2="rgba(0, 255, 221, 0.61)"
        />
        <MyButton
          @click.native="editUserNameFn"
          class="centered"
          t1="Edit"
          t2="Name"
          icon="pencil-alt"
          ic="#aeff00"
          bc1="rgba(174, 255, 0, 0.5)"
          bc2="rgba(0, 255, 221, 0.61)"
        />
        <MyButton
          @click.native="editEmailFn"
          class="centered"
          t1="Edit"
          t2="Email"
          icon="at"
          ic="#8C00FF"
          bc1="rgba(255, 40, 183, 0.55)"
          bc2="rgba(140, 0, 255, 0.54)"
        />
        <MyButton
          @click.native="deleteAccountFn"
          class="centered"
          t1="Delete"
          t2="Account"
          icon="trash-alt"
          ic="red"
          bc1="rgba(255, 180, 40, 0.54)"
          bc2="rgba(255, 40, 44, 0.64)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/General/MyButton.vue";
import ProfilePictureSettings from "@/components/Settings/ProfilePictureSettings.vue";
import UserNameSettings from "@/components/Settings/UserNameSettings.vue";
import EmailSettings from "@/components/Settings/EmailSettings.vue";
import DeleteAccount from "@/components/Settings/DeleteAccount.vue";
import { mapState } from "vuex";

export default {
  // DATA
  data() {
    return {
      //Editing
      editing: false,
      editPicture: false,
      editUserName: false,
      editEmail: false,
      deleteAccount: false,
      //User Data
      userPhotoUrl: "",
      userName: "",
      userEmail: ""
    };
  },
  //Computed
  computed: {
    ...mapState(["user", "userWasUpdated"])
  },
  //Components
  components: {
    MyButton,
    ProfilePictureSettings,
    UserNameSettings,
    EmailSettings,
    DeleteAccount
  },
  // WATCH
  watch: {
    userWasUpdated() {
      if (this.user) {
        if (this.user.photoURL == null) {
          this.userPhotoUrl = require("@/assets/user.png");
        } else {
          this.userPhotoUrl = this.user.photoURL;
        }
        this.userName =
          this.user.displayName === null ? "New User" : this.user.displayName;
        this.userEmail = this.user.email;
      }
    }
  },
  //Mounted
  mounted: function() {
    if (this.user) {
      if (this.user.photoURL == null) {
        this.userPhotoUrl = require("@/assets/user.png");
      } else {
        this.userPhotoUrl = this.user.photoURL;
      }
      this.userName =
        this.user.displayName === null ? "New User" : this.user.displayName;
      this.userEmail = this.user.email;
    }
  },
  //Methods
  methods: {
    editProPicFn() {
      this.editing = true;
      this.editPicture = true;
    },
    abortEditPic() {
      this.editing = false;
      this.editPicture = false;
    },
    editUserNameFn() {
      this.editing = true;
      this.editUserName = true;
    },
    abortEditName() {
      this.editing = false;
      this.editUserName = false;
    },
    editEmailFn() {
      this.editing = true;
      this.editEmail = true;
    },
    abortEditEmail() {
      this.editing = false;
      this.editEmail = false;
    },
    deleteAccountFn() {
      this.editing = true;
      this.deleteAccount = true;
    },
    abortDeleteAccount() {
      this.editing = false;
      this.deleteAccount = false;
    }
  }
};
</script>

<style >
/* Grid*/
.settingsGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 5px 170px 5px 5px 25px 25px 1fr 105px 1fr;
}
/* Tittle */
.tittleBackgorund {
  background-color: rgba(0, 0, 0, 0.699);
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
}
.settingsTittle {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  align-self: center;
  color: #00b7ff;
}
.settingsTittleStyle {
  font-family: "Racing Sans One", cursive;
  font-size: 25px;
  color: #ffffff;
}
.tittleBorderBot {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.733),
    rgb(255, 255, 255)
  );
}
/*Picture*/
.userPicture {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  width: 150px;
  z-index: 3;
  border: 2px solid rgba(255, 255, 255, 0.452);
}
.circularAnim2 {
  z-index: 2;
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  background-image: linear-gradient(
    0deg,
    rgb(0, 225, 255),
    rgb(136, 255, 0),
    rgb(0, 225, 255),
    rgba(0, 0, 255, 0) 80%
  );
  opacity: 0;
  clip-path: circle(78px at 50% 50%);
  animation: spin 10s cubic-bezier(0.1, 0.5, 0.3, 0.4) infinite alternate,
    animAppears 1s linear 1s 1 forwards;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(720deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.pictureBorderBot {
  grid-column: 1 / span 1;
  grid-row: 4 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.733),
    rgb(255, 255, 255)
  );
}
/* User Data*/
.dataBackground {
  grid-column: 1 / span 1;
  grid-row: 5 / span 6;
  background-image: linear-gradient(
    0deg,
    rgba(0, 2, 24, 0.726),
    rgba(0, 0, 24, 0.671)
  );
}
.userDataStyle {
  color: #ffffff;
  font-size: 15px;
  font-family: "Lexend Deca", sans-serif;
}
.dataIconStyle {
  color: #00aeff;
  font-size: 15px;
}
/* User Name */
.userName {
  grid-column: 1 / span 1;
  grid-row: 6 / span 1;
  align-self: center;
}

/* User Email */
.userEmail {
  grid-column: 1 / span 1;
  grid-row: 7 / span 1;
  align-self: center;
}
/*Buttons*/
.buttonsGrid {
  grid-column: 1 / span 1;
  grid-row: 9 / span 1;
  display: grid;
  justify-self: center;
  height: 100%;
  width: 250px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>