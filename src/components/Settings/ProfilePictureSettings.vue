<template>
  <div class="proPictureGrid">
    <div class="settingsProPicBorder"></div>
    <div class="profilePictureZone">
      <v-progress-circular size="138" width="4" rotate="360" :value="value" color="primary">
        <!-- Cropped Result -->
        <v-avatar v-if="showCropper && image2!=null" size="125px">
          <img :src="image2" />
        </v-avatar>
        <!-- Gif -->
        <v-avatar v-else-if="gifImage" size="125px">
          <img :src="gifImage" />
        </v-avatar>
        <!-- User Photo -->
        <v-avatar size="125px" v-else>
          <img :src="userPhotoUrl" />
        </v-avatar>
      </v-progress-circular>
    </div>
    <div class="cropperZone">
      <Cropper
        v-if="showCropper"
        :key="resetCropper"
        class="myCropper"
        @change="onChange"
        :src="image"
        :stencilComponent="$options.components.CircleStencil"
        :stencilProps="{
		previewClassname: 'preview'
	}"
      />
    </div>
    <div class="cropperButtonsDivider"></div>
    <div class="proPicButtonsbackground"></div>
    <div class="buttonsZone">
      <MyButton
        @click.native="uploadImageButton()"
        class="centered"
        t1="Upload"
        t2="Image"
        icon="image"
        ic="#aeff00"
        bc1="rgba(174, 255, 0, 0.5)"
        bc2="rgba(0, 255, 221, 0.61)"
      />
      <input
        type="file"
        ref="file"
        @change="uploadImage($event.target.files)"
        accept="image/*"
        style="display:none"
        :key="resetFileInput"
      />
      <MyButton
        @click.native="uploadGifButton()"
        class="centered"
        t1="Upload"
        t2="Gif"
        icon="film"
        ic="#00d9ff"
        bc1="rgba(0, 132, 255, 0.616)"
        bc2="rgba(0, 255, 221, 0.61)"
      />
      <input
        type="file"
        ref="gifFile"
        @change="uploadGif($event.target.files)"
        accept=".gif"
        style="display:none"
        :key="resetGifFileInput"
      />
      <MyButton
        v-if="this.user && this.user.photoURL && !showCropper && !gifImage"
        @click.native="deleteUserPhoto()"
        class="centered"
        t1="Delete"
        t2="Picture"
        icon="trash-alt"
        ic="red"
        bc1="rgba(255, 180, 40, 0.54)"
        bc2="rgba(255, 40, 44, 0.64)"
      />
      <MyButton
        v-if=" !showCropper && !gifImage"
        @click.native="emitCancel()"
        class="centered"
        t1="Return to"
        t2="Settings"
        icon="arrow-circle-left"
        ic="#8C00FF"
        bc1="rgba(255, 40, 183, 0.55)"
        bc2="rgba(140, 0, 255, 0.54)"
      />
      <!-- Save & Cancel Button for Image Upload -->
      <MyButton
        v-if="showCropper && image2!=null"
        @click.native="uploadToFireBase()"
        class="centered"
        t1="Save New  "
        t2="Image"
        icon="save"
        ic="#8C00FF"
        bc1="rgba(255, 40, 183, 0.55)"
        bc2="rgba(140, 0, 255, 0.54)"
      />
      <MyButton
        v-if="showCropper && image2!=null"
        @click.native="cancelButton()"
        class="centered"
        t1="Cancel"
        t2="Upload"
        icon="trash-alt"
        ic="red"
        bc1="rgba(255, 180, 40, 0.54)"
        bc2="rgba(255, 40, 44, 0.64)"
      />

      <!-- Save & Cancel Button for Gif Upload -->
      <MyButton
        v-if="gifImage"
        @click.native="uploadGIFToFireBase()"
        class="centered"
        t1="Save New  "
        t2="Gif"
        icon="save"
        ic="#8C00FF"
        bc1="rgba(255, 40, 183, 0.55)"
        bc2="rgba(140, 0, 255, 0.54)"
      />
      <MyButton
        v-if="gifImage"
        @click.native="cancelGifButton()"
        class="centered"
        t1="Cancel"
        t2="Upload"
        icon="trash-alt"
        ic="red"
        bc1="rgba(255, 180, 40, 0.54)"
        bc2="rgba(255, 40, 44, 0.64)"
      />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/General/MyButton.vue";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
//Vuex
import store from "@/store";
import { mapState } from "vuex";

export default {
  // COMPONENTS
  components: {
    MyButton,
    Cropper,
    // eslint-disable-next-line
    CircleStencil
  },

  // COMPUTED
  computed: {
    ...mapState(["user", "userWasUpdated"])
  },

  // DATA
  data() {
    return {
      //User Data
      userPhotoUrl: "",
      // Cropper
      image: null,
      image2: null,
      canvas: null,
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      showCropper: false,
      resetCropper: 200,
      //Buttons
      buttonsLocked: false,
      //Firebase Upload
      uploadTask: null,
      // Progress Bar
      value: 0,
      // File Input
      resetFileInput: 0,
      resetGifFileInput: 50,
      //Gif
      gifImage: null,
      gifFile: null,
    };
  },

  // METHODS
  methods: {
    emitCancel() {
      this.$emit("cancelEditPicture");
    },
    uploadImageButton() {
      this.cancelGifButton();
      this.cancelButton();
      this.resetFileInput += 1;
      this.resetCropper += 1;
      setTimeout(() => this.$refs.file.click(), 50);
    },
    uploadGifButton() {
      this.cancelButton();
      this.resetGifFileInput += 1;
      setTimeout(() => this.$refs.gifFile.click(), 50);
    },
    uploadImage(files) {
      // Ensure that you have a file
      if (files && files[0]) {
        let imageFile = files[0];
        // Check whether the upload is an image
        if (!imageFile.type.match("image.*")) {
          alert("Please choose an image file");
        } else {
          if (imageFile.type.match("image/gif")) {
            alert("Please use the UPLOAD GIF Button for this type of file");
            return;
          }
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = e => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.image = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(imageFile);

          this.showCropper = true;
        }
      }
    },
    uploadGif(files) {
      // Ensure that you have a file
      if (files && files[0]) {
        let gifFile = files[0];
        // Check whether the upload is a GIF
        if (!gifFile.type.match("image/gif")) {
          alert("Please choose a GIF");
        } else {
          // eslint-disable-next-line
          this.gifImage = URL.createObjectURL(gifFile);
          this.gifFile = gifFile;
        }
      }
    },
    //This Function is part of the Image Cropper
    onChange({ coordinates, canvas }) {
      this.coordinates = coordinates;
      this.image2 = canvas.toDataURL();
      this.canvas = canvas;
    },
    uploadToFireBase() {
      if (!this.buttonsLocked) {
        this.buttonsLocked = true;
        //Transform the canvas to blob for FireBase Storage Upload
        this.canvas.toBlob(blob => {
          // Create a root reference
          var storageRef = this.$firebasePlugin.myStorage.ref();
          // Create destination ref
          var imgRef = storageRef.child("profilePictures/" + this.user.uid);
          // Upload file
          this.uploadTask = imgRef.put(blob);
        });
      }
    },
    uploadGIFToFireBase() {
      if (!this.buttonsLocked) {
        this.buttonsLocked = true;
        // Create a root reference
        var storageRef = this.$firebasePlugin.myStorage.ref();
        // Create destination ref
        var imgTestRef = storageRef.child("profilePictures/" + this.user.uid);
        // Upload file
        this.uploadTask = imgTestRef.put(this.gifFile);
      }
    },
    async deleteUserPhoto() {
      if (!this.buttonsLocked) {
        this.buttonsLocked = true;
        var userNow = this.$firebasePlugin.getCurrentUser();
        //Delete the img Link in User
        userNow
          .updateProfile({ photoURL: null })
          .then(
            // This function fires when the update was successful
            () => {
              // See Comment Note n°1 at the end of this file
              store.commit("updateUser2", userNow);
              //Alert Other components of the update
              store.commit("changeUpdateFlag", !this.userWasUpdated);
            }
          )
          .catch(function(error) {
            // An error happened.
            alert(error);
          });
        //Must check if picture here before folowing code
        if (await this.$firebasePlugin.checkProfileImgInStorage()) {
          //Delete img in Storage
          // Create a root reference
          var storageRef = this.$firebasePlugin.myStorage.ref();
          // Create destination ref
          var imgRef = storageRef.child("profilePictures/" + this.user.uid);
          // Delete the file
          imgRef
            .delete()
            .then(function() {
              // File deleted successfully
            })
            .catch(function(error) {
              // Uh-oh, an error occurred!
              alert("Error while dileting picture " + error);
            });
        }
      }
    },
    cancelButton() {
      this.showCropper = false;
      this.image2 = null;
      this.image = null;
    },
    cancelGifButton() {
      this.gifImage = null;
      this.gifFile = null;
    }
  },

  // WATCH
  watch: {
    //Function fires while tracking the progress of the Upload
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        // Function for State Changed
        // sp stands for snapshot
        sp => {
          this.value = Math.floor(sp.bytesTransferred / sp.totalBytes) * 100;
        },
        // Function for error
        function error(err) {
          alert(err);
        },
        // Function for Complete
        // If u need to change values in data, u need to use the promise syntax
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            //Update User Data in Firebase and Vuex
            var userNow = this.$firebasePlugin.getCurrentUser();
            userNow
              .updateProfile({ photoURL: downloadURL })
              .then(
                // This function fires when the update is successful
                () => {
                  // See Comment Note n°1 at the end of this file
                  store.commit("updateUser2", userNow);
                  //Alert Other components of the update
                  store.commit("changeUpdateFlag", !this.userWasUpdated);
                }
              )
              .catch(function(error) {
                // An error happened.
                alert(error);
              });
          });
        }
      );
    },
    userWasUpdated() {
      this.buttonsLocked = false;
      if (this.user) {
        if (this.user.photoURL == null) {
          this.userPhotoUrl = require("@/assets/user.png");
        } else {
          this.userPhotoUrl = this.user.photoURL;
        }
        this.showCropper = false;
        setTimeout(() => (this.value = 0), 1015);
        this.gifImage = null;
        store.commit("callSnackBar", {
          icon: "done_outline",
          color: "info",
          msg: "Change successful!"
        });
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
    }
  }
};
</script>

<!-- Style -->
<style>
.proPictureGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 150px 150px 5px 5px 7px 1fr;
}
.settingsProPicBorder {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  opacity: 0;
  background-image: linear-gradient(
    110deg,
    rgba(0, 217, 255, 0.644),
    rgba(217, 255, 0, 0.664)
  );
  clip-path: circle(65px at 50% 50%);
  animation: backAppear 0.1s linear 1s 1 normal forwards;
}
@keyframes backAppear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.profilePictureZone {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  justify-self: center;
  align-self: center;
}
.cropperZone {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  justify-self: center;
  align-self: center;
}
.cropperButtonsDivider {
  grid-column: 1 / span 1;
  grid-row: 4 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.733),
    rgb(255, 255, 255)
  );
}
.proPicButtonsbackground {
  grid-column: 1;
  grid-row: 5 / span 2;
  background-image: linear-gradient(
    0deg,
    rgba(0, 2, 24, 0.726),
    rgba(0, 0, 24, 0.671)
  );
}
.buttonsZone {
  grid-column: 1;
  grid-row: 6;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 7px;
}
.b1 {
  grid-column: 1;
  grid-row: 2;
}
.preview {
  border: dashed 2px rgb(255, 255, 255);
}
.myCropper {
  background-color: rgba(0, 0, 0, 0.87);
  border: 2px solid rgba(0, 217, 255, 0.568);
  border-radius: 5px;
  max-width: 280px;
  max-height: 140px;
}
</style>




<!--     ----------------------------------------------------------------------------------
                              Comment Note n°1
                              -----------------  
                //  There is no change detected in Vuex store,
                //  user seems to remain the same even tho its property
                //  photoUrl was updated

                //  Therefor we use an update flag to inform the UserMenu
                //  and the avatar preview to update
 ------------------------------------------------------------------------------------ -->   