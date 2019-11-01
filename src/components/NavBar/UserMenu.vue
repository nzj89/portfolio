<template>
  <v-menu offset-y class="mt-5">
    <!-- Button Activator -->
    <template v-slot:activator="{ on }">
      <v-avatar  size="35" v-on="on">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <img  v-on="on" :src="avatarImg" />
          </template>
          <v-icon left>account_box</v-icon>
          <span>User Menu</span>
        </v-tooltip>
      </v-avatar>
    </template>
    <!-- User Info -->

    <v-card outlined class="mt-1">
      <v-list class="pa-0">
        <v-img :src="require('@/assets/tech4.jpg')" width="350px" alt="resized image" >
          <v-list-item class="px-5 pt-2">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{userName}}</v-list-item-title>
              <v-list-item-subtitle>{{userEmail}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="80" color="grey">
              <img :src="avatarImg" contain />
            </v-list-item-avatar>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item-group class="pb-3 pl-3">
            <!-- Profile Link -->
            <v-list-item to="/settings">
              <v-list-item-action>
                <v-icon class="lightBlue1--text" left>settings</v-icon>
              </v-list-item-action>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <!-- Logout -->
            <v-list-item @click="logout" >
              <v-list-item-action>
                <v-icon class="lightBlue1--text" left>exit_to_app</v-icon>
              </v-list-item-action>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-img>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  // Name
  name: "UserMenu",

  // DATA
  data() {
    return {
      avatarImg: "",
      userName: "",
      userEmail: ""
    };
  },
  // COMPUTED
  computed: {
    ...mapState(["user", "userWasUpdated"])
  },
  // METHODS
  methods: {
    async logout() {
      await this.$firebasePlugin.logout();
      this.$router.replace("/");
    }
  },

  //Mounted
  mounted: function() {
    if (this.user) {
      if (this.user.photoURL == null) {
        this.avatarImg = require("@/assets/user.png");
      } else {
        this.avatarImg = this.user.photoURL;
      }
      this.userName =
        this.user.displayName === null ? "New User" : this.user.displayName;
      this.userEmail = this.user.email;
    }
  },

  // WATCH
  watch: {
    user() {
      if (this.user) {
        if (this.user.photoURL == null) {
          this.avatarImg = require("@/assets/user.png");
        } else {
          this.avatarImg = this.user.photoURL;
        }
        this.userName =
          this.user.displayName === null ? "New User" : this.user.displayName;

        this.userEmail = this.user.email;
      }
    },

    userWasUpdated() {
      if (this.user) {
        if (this.user.photoURL == null) {
          this.avatarImg = require("@/assets/user.png");
        } else {
          this.avatarImg = this.user.photoURL;
        }
        this.userName =
          this.user.displayName === null ? "New User" : this.user.displayName;
        this.userEmail = this.user.email;
      }
    }
  }
};
</script>
