<template>
  <div class="noOverflow msgZoneStyle" ref="container" id="scrollBarStyle">
    <v-card
      class="ma-1 myDarkBlue--text"
      color="white black"
      v-for="message in msgs"
      :key="message.docId"
    >
      <v-card-title class="overline pa-0 pt-1 px-1 blue--text">
        <v-avatar size="30" class="mr-1">
          <v-img :src="`${message.profilePic}`" alt="resized image"></v-img>
        </v-avatar>
        {{message.userName}}
        <v-spacer></v-spacer>
        <span class="myTime grey--text">{{message.time}} {{message.day}}/{{message.month}}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <button
              v-if="message.imgURL"
              @click="downloadImg(`${message.imgURL}`)"
              v-on="on"
              class="myPhoneButtons3 blackButton pb-4 ml-2 mr-1"
            >
              <font-awesome-icon size="sm" icon="download" class="blackIcon" />
            </button>
          </template>
          <span class="caption">Download Image</span>
        </v-tooltip>
      </v-card-title>

      <!-- ROW 1: Small Img When there is Text ------------------------------- -->
      <v-row
        class="myRow ma-0"
        align="center"
        v-if="!(message.id == editId) && message.msg && !(expandId == message.id)"
      >
        <!-- Small Img When there is Text Big Img if not -->
        <!-- Msg -->
        <v-col class="myCol body-2 pl-2 py-1">{{message.msg}}</v-col>
        <!-- Img + Buttons if there is Img -->
        <v-col v-if="message.imgURL" class="myCol body-2 pa-0 pr-1 pb-1 text-center" cols="3">
          <v-img
            alt="resized image"
            @click="expandImage(`${message.id}`)"
            class="myMsgImg clickableImg ml-2"
            :src="`${message.imgURL}`"
            max-width="125"
            max-height="100"
          ></v-img>
          <!-- Only showing buttons for the owner of the msg-->
          <div v-if="message.uid == user.uid" class="mt-1">
            <!-- Edit Image -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons blueButton px-2 pt-1 mr-1"
                  @click="prepImgEdit(`${message.id}`)"
                >
                  <font-awesome-icon size="sm" icon="images" class="blueIcon" />
                </button>
              </template>
              <span class="caption">Edit Image</span>
            </v-tooltip>
            <!-- Edit Text -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons greenButton px-2 pt-1 mr-1"
                  @click="prepEdit(`${message.id}`)"
                >
                  <font-awesome-icon size="sm" icon="pencil-alt" class="greenIcon" />
                </button>
              </template>
              <span class="caption">Edit Text</span>
            </v-tooltip>
            <!-- Delete Msg -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons redButton px-2 pt-1"
                  @click="deleteMsg(`${message.id}`,`${message.imgURL}`)"
                >
                  <font-awesome-icon size="sm" icon="trash-alt" class="redIcon" />
                </button>
              </template>
              <span class="caption">Delete</span>
            </v-tooltip>
          </div>
        </v-col>
        <!-- Buttons When there is no Img --------------- -->
        <v-col
          class="myCol text-center pa-0 pb-1"
          cols="3"
          v-if="(message.uid == user.uid) && !message.imgURL"
        >
          <!-- Add Image -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons2 blueButton mr-1"
                @click="addImg2TextMsg(`${message.id}`)"
              >
                <font-awesome-icon size="sm" :icon="['far', 'file-image']" class="blueIcon" />
              </button>
            </template>
            <span class="caption">Add Image</span>
          </v-tooltip>

          <!-- Edit Text -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons2 greenButton mr-1"
                @click="prepEdit(`${message.id}`)"
              >
                <font-awesome-icon size="sm" icon="pencil-alt" class="greenIcon" />
              </button>
            </template>
            <span class="caption">Edit Text</span>
          </v-tooltip>
          <!-- Delete Msg -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons2 redButton"
                @click="deleteMsg(`${message.id}`)"
              >
                <font-awesome-icon size="sm" icon="trash-alt" class="redIcon" />
              </button>
            </template>
            <span class="caption">Delete</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <!-- ROW 2: Big Img no Text ------------------------------- -->
      <v-row
        class="myRow ma-0"
        align="center"
        v-if="(!(message.id == editId) && !message.msg) || expandId == message.id "
      >
        <v-col class="myCol body-2 pl-2 py-1" cols="11">
          <v-img
            alt="resized image"
            @click="unExpand()"
            class="myMsgImg clickableImg"
            :src="`${message.imgURL}`"
            max-width="650"
            max-height="650"
          ></v-img>
        </v-col>
        <v-col class="myCol pa-0 pr-1" cols="1" v-if="message.uid == user.uid">
          <!-- Edit Image -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons blueButton px-1 mb-1"
                @click="prepImgEdit(`${message.id}`)"
              >
                <font-awesome-icon size="sm" icon="images" class="blueIcon" />
              </button>
            </template>
            <span class="caption">Edit Image</span>
          </v-tooltip>
          <!-- Edit Text -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons greenButton px-1 mb-1"
                @click="prepEdit(`${message.id}`)"
              >
                <font-awesome-icon size="sm" icon="pencil-alt" class="greenIcon" />
              </button>
            </template>
            <span class="caption">Add Text</span>
          </v-tooltip>
          <!-- Delete Msg -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                class="myPhoneButtons redButton px-1"
                @click="deleteMsg(`${message.id}`,`${message.imgURL}`)"
              >
                <font-awesome-icon size="sm" icon="trash-alt" class="redIcon" />
              </button>
            </template>
            <span class="caption">Delete</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <!-- ROW 3: for editing the Text Area + Cancel & Save Buttons  -------------------------------------- -->
      <v-row class="myRow ma-0" align="center" v-if="message.id == editId && !editingImg">
        <v-col class="myCol body-2 pl-2 py-2">
          <b-form-textarea
            ref="myTextArea"
            no-resize
            id="textarea"
            :value="message.msg"
            @input="onInput($event)"
            placeholder="Edit the content"
            rows="1"
            max-rows="4"
          ></b-form-textarea>
        </v-col>
        <v-col class="myCol pa-0 pr-1" cols="1" v-if="message.uid == user.uid">
          <!-- Save Edited Msg -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button v-on="on" class="myPhoneButtons blueButton mb-1" @click="saveEditMsg()">
                <font-awesome-icon size="sm" icon="save" class="blueIcon" />
              </button>
            </template>
            <span class="caption">Save</span>
          </v-tooltip>
          <!-- Cancel -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button v-on="on" class="myPhoneButtons redButton" @click="editId=''">
                <font-awesome-icon size="sm" icon="window-close" class="redIcon" />
              </button>
            </template>
            <span class="caption">Cancel</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <!-- ROW 4: for changing or deleting the Img  -------------------------------------- -->
      <v-row
        class="myRow ma-0"
        align="center"
        v-if="message.id == editId && editingImg && !msgWithoutImg"
      >
        <v-col class="myCol pa-1 pr-1" cols="11">
          <v-img
            alt="resized image"
            v-if="!filePicked"
            class="myMsgImg ml-2"
            :src="`${message.imgURL}`"
            max-width="650"
            max-height="650"
          ></v-img>
          <v-img
            alt="resized image"
            v-if="filePicked"
            class="myMsgImg ml-2"
            :src="myPreview"
            max-width="650"
            max-height="650"
          ></v-img>
        </v-col>
        <v-col class="myCol text-center pa-0" cols="1">
          <div v-if="!filePicked">
            <!-- Upload New Image -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button v-on="on" class="myPhoneButtons2 blueButton mb-1" @click="previewImage()">
                  <font-awesome-icon size="sm" icon="cloud-upload-alt" class="blueIcon" />
                </button>
              </template>
              <span class="caption">Upload New Image</span>
            </v-tooltip>
            <input
              type="file"
              ref="myFile"
              @change="createImgUrl($event.target.files)"
              accept="image/*"
              style="display:none"
              :key="resetFileInput"
            />
            <!-- Delete Image -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons2 yellowButton mb-1"
                  @click="deleteImage(`${message.id}`)"
                >
                  <font-awesome-icon size="sm" icon="trash-alt" class="yellowIcon" />
                </button>
              </template>
              <span class="caption">Delete Image</span>
            </v-tooltip>
            <!-- Cancel -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button v-on="on" class="myPhoneButtons2 redButton mb-1" @click="cancelEditImg()">
                  <font-awesome-icon size="sm" icon="window-close" class="redIcon" />
                </button>
              </template>
              <span class="caption">Cancel</span>
            </v-tooltip>
          </div>
          <!-- Buttons when uploading a new Img -->
          <div v-if="filePicked">
            <!-- Save New Img -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons2 blueButton mb-1"
                  @click="saveNewImg(`${message.id}`)"
                >
                  <font-awesome-icon size="sm" icon="save" class="blueIcon" />
                </button>
              </template>
              <span class="caption">Save New Image</span>
            </v-tooltip>
            <!-- Cancel -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button v-on="on" class="myPhoneButtons2 redButton" @click="cancelUploadImg()">
                  <font-awesome-icon size="sm" icon="window-close" class="redIcon" />
                </button>
              </template>
              <span class="caption">Cancel</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
      <!-- ROW 5: for adding Img to pure text msg  -------------------------------------- -->
      <v-row
        class="myRow ma-0"
        align="center"
        v-if="message.id == editId && editingImg && msgWithoutImg"
      >
        <v-col class="myCol pa-1 pr-1" cols="11">
          <v-img
            alt="resized image"
            v-if="filePicked"
            class="myMsgImg ml-2"
            :src="myPreview"
            max-width="650"
            max-height="650"
          ></v-img>
          <input
            type="file"
            ref="myFile"
            @change="createImgUrl($event.target.files)"
            accept="image/*"
            style="display:none"
            :key="resetFileInput"
          />
        </v-col>
        <v-col class="myCol text-center pa-0" cols="1">
          <!-- Buttons when uploading a new Img -->
          <div>
            <!-- Save New Img -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button
                  v-on="on"
                  class="myPhoneButtons2 blueButton mb-1"
                  @click="saveNewImg(`${message.id}`,true)"
                >
                  <font-awesome-icon size="sm" icon="save" class="blueIcon" />
                </button>
              </template>
              <span class="caption">Save New Image</span>
            </v-tooltip>
            <!-- Upload dif Img -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button v-on="on" class="myPhoneButtons2 greenButton mb-1" @click="previewImage()">
                  <font-awesome-icon size="sm" icon="cloud-upload-alt" class="greenIcon" />
                </button>
              </template>
              <span class="caption">Upload Another</span>
            </v-tooltip>
            <!-- Cancel -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <button v-on="on" class="myPhoneButtons2 redButton" @click="cancelUploadImg2()">
                  <font-awesome-icon size="sm" icon="window-close" class="redIcon" />
                </button>
              </template>
              <span class="caption">Cancel</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
//Vuex
import { mapState } from "vuex";
export default {
  data() {
    return {
      msgs: [],
      editId: "",
      myEditedMsg: "",
      editingImg: false,
      // Expand Img
      expandId: "",
      // New Image
      resetFileInput: 300,
      myPreview: null,
      filePicked: false,
      imageFile: null,
      // msgWithoutImg
      msgWithoutImg: false,
      // Firebase Upload
      uploadTask: null,
      msgId: ""
    };
  },
  // COMPUTED
  computed: {
    ...mapState(["user", "msgRdyFlag"])
  },
  // Created
  created() {
    this.msgs = this.$firebasePlugin.loadMsgs();
  },
  // Mounted
  mounted() {
    var container = this.$refs.container;
    setTimeout(() => (container.scrollTop = container.scrollHeight), 500);
  },
  // Methods
  methods: {
    deleteMsg(msgId, msgImg) {
      this.$firebasePlugin.delMsg(msgId, msgImg);
    },
    prepEdit(msgID) {
      this.editId = msgID;
      this.editingImg = false;
      setTimeout(() => (this.myEditedMsg = this.$refs.myTextArea[0].value), 50);
    },
    prepImgEdit(msgID) {
      this.editId = msgID;
      this.editingImg = true;
    },
    cancelEditImg() {
      this.editId = "";
      this.editingImg = false;
    },
    saveEditMsg() {
      this.$firebasePlugin.editMessage(this.editId, this.myEditedMsg);
      this.editId = "";
      this.myEditedMsg = "";
    },
    onInput(editedMsg) {
      this.myEditedMsg = editedMsg;
    },
    deleteImage(msgID) {
      this.$firebasePlugin.deleteImage(msgID);
      this.editId = "";
      this.myEditedMsg = "";
    },
    previewImage() {
      this.resetFileInput += 1;
      // Since there are lots of msgs my ref creates an array
      setTimeout(() => this.$refs.myFile[0].click(), 50);
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
    cancelUploadImg() {
      this.myPreview = null;
      this.filePicked = false;
      this.myFile = null;
    },
    saveNewImg(msgId, flag) {
      this.msgId = msgId;
      if (!flag) {
        this.$firebasePlugin.justDeleteImg(msgId);
      }
      this.saveImgInStorage(msgId);
    },
    saveImgInStorage(msgId) {
      // Create a root reference
      var storageRef = this.$firebasePlugin.myStorage.ref();
      // Create destination ref with the msg Doc ID
      var imgTestRef = storageRef.child("chatPictures/" + msgId);
      // Upload file
      this.uploadTask = imgTestRef.put(this.myFile);
    },
    addImg2TextMsg(msgID) {
      this.msgWithoutImg = true;
      this.prepImgEdit(msgID);
      this.previewImage();
    },
    cancelUploadImg2() {
      this.myPreview = null;
      this.filePicked = false;
      this.myFile = null;
      this.msgWithoutImg = false;
      this.cancelEditImg();
    },
    expandImage(msgId) {
      this.expandId = msgId;
    },
    unExpand() {
      this.expandId = "";
    },
    downloadImg(imgUrl) {
      window.open(imgUrl);
    }
  },
  // WATCH
  watch: {
    msgRdyFlag() {
      var container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
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
            // Update the msg with the download URL
            this.$firebasePlugin.addImg2Msg(this.msgId, downloadURL);
            this.msgId = "";
            this.cancelUploadImg();
            this.cancelEditImg();
            this.msgWithoutImg = false;
          });
        }
      );
    }
  }
};
</script>

<style >
.noOverflow {
  word-wrap: break-word;
  overflow-y: auto;
}
.myTime {
  font-size: 8px;
  font-weight: 900;
}
.msgZoneStyle {
  border-radius: 7px;
  background-image: linear-gradient(
    0deg,
    rgba(187, 255, 0, 0.151),
    rgba(0, 0, 0, 0.425)
  );
  background-size: cover;
}
#scrollBarStyle::-webkit-scrollbar {
  width: 8px;
}
#scrollBarStyle::-webkit-scrollbar-thumb {
  background-color: #0004ff;
  -webkit-box-shadow: inset 7px 0px 8px rgb(0, 204, 255);
  border-radius: 10px;
}
#scrollBarStyle::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 16px rgba(119, 0, 255, 0.329);
  background-color: rgb(0, 64, 83);
  border-radius: 10px;
}

.myBorder {
  max-height: 47vh;
  border-radius: 7px;
}
.myMsgImg {
  border-radius: 5px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}
.delImage {
  color: #8f6a27;
}
/* BUTTONS -----------------------------      */
.buttonsDiv {
  width: 80px;
}
.myPhoneButtons {
  border-radius: 5px;
  width: inherit;
}
.myPhoneButtons2 {
  border-radius: 5px;
  width: 32px;
}
.myPhoneButtons3 {
  border-radius: 70%;
  width: 18px;
  height: 11px;
}
.blackButton {
  background-image: linear-gradient(
    to right,
    rgb(255, 255, 255),
    rgb(0, 225, 255)
  );
  border-left: 1px solid rgba(0, 0, 0, 0.808);
}
.blackIcon {
  color: #000000;
}
.blueButton {
  border: 1px solid rgba(39, 0, 83, 0.808);
  border-top: none;
  border-left: none;
  background-color: #1e7af3;
}
.blueIcon {
  background-color: #1e7af3;
  color: #ffffff;
}
.greenButton {
  border: 1px solid rgba(0, 11, 73, 0.842);
  border-top: none;
  border-left: none;
  background-color: #005d69;
}
.greenIcon {
  background-color: #005d69;
  color: #ffffff;
}
.redButton {
  border: 1px solid rgba(33, 0, 65, 0.808);
  border-top: none;
  border-left: none;
  background-color: #f31e1e;
}
.redIcon {
  background-color: #f31e1e;
  color: #ffffff;
}
.yellowButton {
  border: 1px solid rgba(94, 0, 0, 0.808);
  border-top: none;
  border-left: none;
  background-color: #b1b400c4;
}
.yellowIcon {
  background-color: #b1b400c4;
  color: #990000;
}
.clickableImg:hover {
  cursor: pointer !important;
  border-right: 2px solid rgba(217, 255, 0, 0.808);
  border-bottom: 2px solid rgba(0, 195, 255, 0.808);
}
</style>

