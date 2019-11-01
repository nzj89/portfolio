<template>
  <v-app>
    <div class="appStyle">
      <!-- Main Grid                    -->
      <div class="myGrid" :class="bottomBarAnimations">
        <div class="backgroundImg"></div>
        <!-- TOP Bar -->
        <div class="myHeaderGrid">
          <div class="blackZone"></div>
          <!-- Logo -->
          <div class="whiteCircle"></div>
          <div @click="goTo('/')" class="websiteLogo clickableClass"></div>
          <!-- Polygon End Of NavBar -->
          <div></div>
          <div class="whitePolygon"></div>
          <div class="blackPolygon"></div>
          <div class="myUserMenu clickableClass">
            <FormPopUp />
            <UserMenu v-if="user" />
          </div>
          <div class="headerContent">
            <div class="menuIcon clickableClass" :class="menuAnimation" @click="menuFunction()">
              <font-awesome-icon size="lg" icon="bars" />
            </div>
            <div class="loginMsg" v-if="plsLogin">PLEASE LOG IN HERE 👉</div>
          </div>
        </div>

        <!--Content-->
        <div class="myContent">
          <router-view></router-view>
        </div>

        <!--Bottom Menu-->
        <div class="bottomMenu" v-if="bMenuExists">
          <!--Home-->
          <div
            class="homeIcon centeredIcon"
            :style="[(myCurrentLink==2) ? {'color': 'black'} : {'color': '#494949'}]"
          >
            <font-awesome-icon size="lg" icon="home" />
          </div>
          <div
            class="homeText centeredText"
            :style="[(myCurrentLink==2) ? {'color': 'black'} : {'color': '#494949'}]"
          >Home</div>
          <div class="clickHome clickableClass" @click="goTo('/')"></div>
          <!--Chat-->
          <div
            class="chatIcon centeredIcon"
            :style="[(myCurrentLink==4) ? {'color': 'black'} : {'color': '#494949'}]"
          >
            <font-awesome-icon size="lg" icon="comments" />
          </div>
          <div
            class="chatText centeredText"
            :style="[(myCurrentLink==4) ? {'color': 'black'} : {'color': '#494949'}]"
          >Chat</div>
          <div class="clickChat clickableClass" @click="goTo('/chat')"></div>
          <!--Settings-->
          <div
            class="settingsIcon centeredIcon"
            :style="[(myCurrentLink==5) ? {'color': 'black'} : {'color': '#494949'}]"
          >
            <font-awesome-icon size="lg" icon="cog" />
          </div>
          <div
            class="settingsText centeredText"
            :style="[(myCurrentLink==5) ? {'color': 'black'} : {'color': '#494949'}]"
          >Settings</div>
          <div class="clickSettings clickableClass" @click="goTo('/settings')"></div>
          <!-- CV -->
          <div
            class="cvIcon centeredIcon"
            :style="[(myCurrentLink==3) ? {'color': 'black'} : {'color': '#494949'}]"
          >
            <font-awesome-icon size="lg" icon="briefcase" />
          </div>
          <div
            class="cvText centeredText"
            :style="[(myCurrentLink==3) ? {'color': 'black'} : {'color': '#494949'}]"
          >CV</div>
          <div class="clickCv clickableClass" @click="goTo('/cv')"></div>
          <!-- CurrentLink Blue Bar-->
          <div class="currentLink" :style="{'grid-column': myCurrentLink}"></div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import UserMenu from "./components/NavBar/UserMenu.vue";
import FormPopUp from "./components/NavBar/SignInFolder/FormPopUp.vue";
//Vuex
import store from "./store";
import { mapState } from "vuex";

export default {
  name: "App",

  // Components
  // eslint-disable-next-line
  components: { FormPopUp, UserMenu },

  // DATA
  data() {
    return {
      // Menu
      menuColorToggle: false,
      allowAnimation: true,
      toggleBar: false,
      myCurrentLink: "1",
      plsLogin: false,
      bMenuExists: true
    };
  },

  // COMPUTED
  computed: {
    ...mapState(["user", "myPath"]),
    menuAnimation: function() {
      return {
        menuColor: this.menuColorToggle
      };
    },
    bottomBarAnimations: function() {
      return {
        hideBottomAnim: this.toggleBar,
        showBottomAnim: !this.toggleBar
      };
    }
  },
  methods: {
    goTo(page) {
      if (!this.user && (page == "/chat" || page == "/settings")) {
        this.plsLogin = true;
        setTimeout(() => (this.plsLogin = false), 5000);
      }
      this.$router.replace(page);
    },
    menuFunction() {
      if (this.allowAnimation) {
        //Don't allow menu clicks till animation is over
        this.allowAnimation = false;
        // Change menu icon color
        this.menuColorToggle = true;
        this.toggleBar = !this.toggleBar;
        setTimeout(() => this.allowAnimations(), 500);
        if (!this.toggleBar) {
          this.bMenuExists = !this.bMenuExists;
        }else{
          setTimeout(() => this.bMenuExists = !this.bMenuExists, 500);
        }
      }
    },
    allowAnimations() {
      this.menuColorToggle = false;
      this.allowAnimation = true;
    },
    checkCurrentLink() {
      switch (store.getters.currentPath.path) {
        case "/":
          this.myCurrentLink = 2;
          break;
        case "/chat":
          this.myCurrentLink = 4;
          break;
        case "/settings":
          this.myCurrentLink = 5;
          break;
        case "/cv":
          this.myCurrentLink = 3;
          break;
      }
    }
  },
  mounted() {
    this.checkCurrentLink();
  },
  watch: {
    myPath() {
      this.checkCurrentLink();
    }
  }
};
</script>


<style >
/*  Main  Grid         =============================================== */
.myGrid {
  display: grid;
  height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    "t"
    "m"
    "b";
  background-color: white;
}
.backgroundImg {
  background-image: url("./assets/leaves.webp");
  background-position: center;
  background-size: cover;
  grid-column: 1 / span 1;
  grid-row: 2 / span 2;
}

/* Show Hide Bottom Bar*/
.hideBottomAnim {
  animation-name: hideB;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
@keyframes hideB {
  0% {
    grid-template-rows: 50px 1fr 50px;
  }
  100% {
    grid-template-rows: 50px 1fr 0px;
  }
}
.showBottomAnim {
  animation-name: showB;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
@keyframes showB {
  0% {
    grid-template-rows: 50px 1fr 0px;
  }
  100% {
    grid-template-rows: 50px 1fr 50px;
  }
}
/*    Header         =============================================== */
.myHeaderGrid {
  grid-area: t;
  display: grid;
  height: 100%;
  background-image: linear-gradient(200deg, #ffffff 5%, #ffffff 95%);
  grid-template-columns: 25px 25px 1fr 6px 45px 6px;
  grid-template-rows: 10% 1fr 10%;
}
.blackZone {
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  background-image: linear-gradient(100deg, #000000, #000000);
}
/*Logo*/
.whiteCircle {
  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
  background-image: linear-gradient(0deg, #ffffff, #ffffff);
  z-index: 2;
  clip-path: circle(23px);
}
.websiteLogo {
  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
  background-image: url(./assets/website-logo.png);
  background-size: 35px 35px;
  background-position: center;
  margin-top: 1px;
  z-index: 3;
}
/*Right Polygon & User Menu*/
.whitePolygon {
  grid-column: 4 / span 1;
  grid-row: 2 / span 1;
  background-image: linear-gradient(0deg, #ffffff, #ffffff);
  z-index: 1;
  clip-path: polygon(100% 0%, 100% 100%, 0 80%, 0 20%);
}
.blackPolygon {
  grid-column: 5 / span 1;
  grid-row: 2 / span 1;
  background-color: black;
  z-index: 2;
  clip-path: polygon(
    25% 0%,
    75% 0%,
    100% 30%,
    100% 70%,
    75% 100%,
    25% 100%,
    0% 70%,
    0% 30%
  );
  animation-name: userMenuParty;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes userMenuParty {
  0% {
    clip-path: polygon(
      25% 0%,
      75% 0%,
      100% 30%,
      100% 70%,
      75% 100%,
      25% 100%,
      0% 70%,
      0% 30%
    );
  }
  100% {
    clip-path: polygon(
      20% 0%,
      80% 0%,
      100% 25%,
      100% 75%,
      80% 100%,
      20% 100%,
      0% 75%,
      0% 25%
    );
  }
}
.myUserMenu {
  grid-column: 5 / span 1;
  grid-row: 2 / span 1;
  z-index: 3;
  align-self: center;
  justify-self: center;
}
/*Header Content*/
.headerContent {
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;

  display: grid;
  grid-template-columns: 40px 35px 35px 35px 1fr;
  grid-template-rows: 1fr;
}
/*Menu*/
.menuIcon {
  align-self: center;
  justify-self: center;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  color: #00ffea;
}
.loginMsg {
  align-self: center;
  justify-self: center;
  grid-column: 2 / span 4;
  grid-row: 1 / span 1;
  color: #ff0000;
  font-size: 11px;
  font-family: "Racing Sans One", cursive;
  letter-spacing: 1px;
}
.menuColor {
  animation-name: menuAnimation;
  animation-duration: 0.5s;
}
@keyframes menuAnimation {
  0% {
    color: #00ffea;
  }
  50% {
    color: #4400ff;
  }
  100% {
    color: #00ffea;
  }
}
/*Content*/
.myContent {
  grid-area: m;
  overflow: hidden;
}
/*Bottom Menu*/
.bottomMenu {
  grid-area: b;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 50px 50px 53px 50px 1fr;
  grid-template-rows: 27px 18px 5px;
  grid-gap: 0px 7px;
}
/*Home*/
.homeIcon {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
.homeText {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}
.clickHome {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
}
/*Chat*/
.chatIcon {
  grid-column: 4 / span 1;
  grid-row: 1 / span 1;
}
.chatText {
  grid-column: 4 / span 1;
  grid-row: 2 / span 1;
}
.clickChat {
  grid-column: 4 / span 1;
  grid-row: 1 / span 2;
}
/*Settings*/
.settingsIcon {
  grid-column: 5 / span 1;
  grid-row: 1 / span 1;
}
.settingsText {
  grid-column: 5 / span 1;
  grid-row: 2 / span 1;
}
.clickSettings {
  grid-column: 5 / span 1;
  grid-row: 1 / span 2;
}
/*CV*/
.cvIcon {
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
}
.cvText {
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
}
.clickCv {
  grid-column: 3 / span 1;
  grid-row: 1 / span 2;
}
/*CurrentLink*/
.currentLink {
  grid-row: 3 / span 1;
  background-color: #00b7ff;
  z-index: 0;
  border-radius: 15px 15px 5px 5px;
}
/*Bottom General*/
.centeredText {
  justify-self: center;
  align-self: start;
  font-weight: 800;
  font-size: 13px;
}
.centeredIcon {
  align-self: end;
  justify-self: center;
}
/*General CSS*/
.clickableClass:hover {
  cursor: pointer;
}
.centered {
  align-self: center;
  justify-self: center;
}

/*    Scrollbar   =============================================== */
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background-color: #0004ff;
  -webkit-box-shadow: inset 7px 0px 8px rgb(0, 204, 255);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 16px rgba(119, 0, 255, 0.329);
  background-color: rgb(0, 64, 83);
}
html {
  scrollbar-color: rgba(0, 132, 255, 0) rgba(2, 0, 109, 0);
  scrollbar-width: none;
}
.appStyle {
  background-color: black;
  height: 100vh;
}
@media only screen and (min-width: 600px) {
  .myGrid {
    width: 40vh;
    height: 70vh;
    margin: auto;
    margin-top: 5%;
  }
}
</style>

