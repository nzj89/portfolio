<template>
  <div>
    <b-container class="myContainer myMsgInput py-0">
      <!-- TEXT AREA   ============================================================== -->
      <b-row class="myRow" align-v="center" align-h="center">
        <b-col class="myCol pa-0 pt-1 pl-1">
          <b-form-textarea
            no-resize
            id="textarea"
            v-model="message"
            placeholder="Write a message"
            rows="1"
            max-rows="4"
          ></b-form-textarea>
        </b-col>
        <!-- Send Button -->
        <b-col class="myCol pa-0 text-center" cols="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                :loading="sendingMsg"
                v-on="on"
                small
                icon
                class="pr-1 sendButton"
                @click="saveMessage()"
              >
                <font-awesome-icon size="lg" icon="paper-plane" class="paperPlane" />
              </v-btn>
            </template>
            <span class="caption">Send</span>
          </v-tooltip>
        </b-col>
      </b-row>

      <!-- MESSAGE PLUS   ============================================================== -->
      <b-row class="myRow" align-h="end">
        <b-col class="myCol pa-0 py-1 pl-1" cols="2">
          <!-- Add Image BUTTON -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" small class="addImgBtn mr-2" @click="previewImage()">
                <font-awesome-icon
                  size="lg"
                  :icon="['far', 'file-image']"
                  :style="{ color: 'white' }"
                />
              </v-btn>
            </template>
            <span class="caption">Add an Image</span>
          </v-tooltip>
          <input
            type="file"
            ref="file"
            @change="createImgUrl($event.target.files)"
            accept="image/*"
            style="display:none"
            :key="resetFileInput"
          />

          <!-- Cancel Image BUTTON -->
          <v-tooltip bottom v-if="filePicked">
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="filePicked"
                v-on="on"
                small
                class="cancelImgBtn mr-2"
                @click="removePreview()"
              >
                <font-awesome-icon size="1x" icon="window-close" :style="{ color: 'white' }" />
              </v-btn>
            </template>
            <span class="caption">Cancel Image</span>
          </v-tooltip>
        </b-col>

        <!-- Image PREVIEW -->
        <b-col v-if="filePicked" class="myCol pa-0 py-1 text-end" cols="5">
          <v-img class="previewStyle" :src="myPreview" max-width="100" max-height="100"></v-img>
        </b-col>
      </b-row>
    </b-container>
    <div class="px-1">
      <v-progress-linear v-if="uploading" color="primary" :value="value" rounded height="2"></v-progress-linear>
    </div>
  </div>
</template>

<script>
//Vuex
import store from "@/store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // Msg
      message: "",
      myMsgArray: [],
      sendingMsg: false,
      // Image
      resetFileInput: 0,
      myPreview: null,
      filePicked: false,
      imageFile: null,
      // Firebase Upload
      uploadTask: null,
      // Progress Bar
      uploading: false,
      value: 0,
      max: 100
    };
  },
  // COMPUTED
  computed: {
    ...mapState(["msgRdyFlag"])
  },
  // WATCH
  watch: {
    // Waiting for the msg Tracker to be updated with the Doc ID
    // This happens after the msg has been uploaded succesfully
    msgRdyFlag() {
      if (this.filePicked) {
        this.uploading = true;
        this.saveImgInStorage();
      }
    },
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
            var msgDocID = store.getters.getMsgTracker;
            // Update the msg with the download URL
            this.$firebasePlugin.addImg2Msg(msgDocID, downloadURL);
            this.clearUploadingData();
          });
        }
      );
    }
  },
  methods: {
    saveMessage() {
      if (this.message || this.filePicked) {
        this.sendingMsg = true;
        // Storing the msg so i can track the ID in my firebase plugin
        store.commit("updateMsgTracker", this.message);
        this.$firebasePlugin.saveMsg(this.message);
        this.message = "";
        this.sendingMsg = false;
      }
    },
    saveImgInStorage() {
      // Create a root reference
      var storageRef = this.$firebasePlugin.myStorage.ref();
      // Create destination ref with the msg Doc ID
      var msgDocID = store.getters.getMsgTracker;
      var imgTestRef = storageRef.child("chatPictures/" + msgDocID);
      // Upload file
      this.uploadTask = imgTestRef.put(this.myFile);
    },
    getMsgId() {
      var msgId = this.myMsgArray.find(function(element) {
        if (element.msg == this.message) {
          alert(element.msg);
          return true;
        }
      });
      alert(msgId);
    },
    previewImage() {
      this.resetFileInput += 1;
      setTimeout(() => this.$refs.file.click(), 50);
    },
    createImgUrl(files) {
      // Ensure that you have a file
      if (files && files[0]) {
        let imageFile = files[0];
        // Check whether the upload is an image
        if (!imageFile.type.match("image.*")) {
          alert("Please choose an image file");
        } else {
          this.myPreview = URL.createObjectURL(imageFile);
          this.filePicked = true;
          this.myFile = imageFile;
        }
      }
    },
    removePreview() {
      this.filePicked = false;
      this.myFile = null;
    },
    clearUploadingData() {
      store.commit("updateMsgTracker", "");
      setTimeout(() => (this.value = 0), 1015);
      setTimeout(() => (this.uploading = false), 1550);
      setTimeout(() => this.removePreview(), 1550);
    }
  }
};
</script>

<style >
.myMsgInput {
  border-radius: 6px 6px 0 0;
  background-image: linear-gradient(
    0deg,
    rgba(13, 0, 126, 0.295),
    rgba(0, 0, 0, 0.651)
  );
  background-size: cover;
  border: none;
}
.sendButton {
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.664);
}
.sendButton:hover {
  background-color: rgba(0, 110, 255, 0.842);
  
}

#textarea::-webkit-scrollbar {
  width: 8px;
}
#textarea::-webkit-scrollbar-thumb {
  background-color: #0004ff;
  -webkit-box-shadow: inset 7px 0px 8px rgb(0, 204, 255);
  border-radius: 30px;
}
#textarea::-webkit-scrollbar-track {
  display: none;
}
#textarea {
  color: #06002b;
}
html {
  overflow-y: hidden;
}
.addImgBtn {
  min-width: 4px !important;
  background-color: rgba(0, 119, 255, 0.733) !important;
  border: 1px solid white;
}
.addImgBtn:hover {
  background-color: rgba(0, 162, 255, 0.795) !important;
}

.cancelImgBtn {
  min-width: 5px !important;
  background-color: rgba(255, 0, 0, 0.774) !important;
  border-right: 2px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
}
.cancelImgBtn:hover {
  background-color: rgb(255, 102, 0) !important;
}
.previewStyle {
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.678);
  border-top: none;
  border-left: none;
}
</style>

  <!--     ----------------------------------------------------------------------------------
   Add this to style if u wanna see the layout borders

/*--------------------------*/
.myContainer {
  border: 2px rgb(145, 255, 0) solid;
}
.myRow {
  border: 2px rgb(255, 0, 0) solid;
}
.myCol {
  border: 2px rgb(0, 174, 255) solid;
}


.myTestBorder{
border: 2px rgb(119, 0, 255) solid;
}
.myForm {
  border: 2px rgb(119, 0, 255) solid;
}

 ------------------------------------------------------------------------------------ --> 