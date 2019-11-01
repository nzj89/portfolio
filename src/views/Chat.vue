<template>
  <!-- Structure The Page -->

   <div class="chatGrid">
          <MsgZone />
      
          <ChatMsgInput />
  </div>
</template>

<script>
import ChatMsgInput from "@/components/Chat/ChatMsgInput";
import MsgZone from "@/components/Chat/MsgZone";
export default {
  // Components
  components: { ChatMsgInput, MsgZone }
};
</script>


<style>
.chatGrid{
    display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 102px;
 
}
</style>


