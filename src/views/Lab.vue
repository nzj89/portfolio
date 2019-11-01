<template>
  <div class="myGridTest">
    <MyButton class="testb" t1="Delete" t2="Account" icon="envelope" ic="rgb(0, 217, 255)" bc1="rgba(0, 132, 255, 0.616)" bc2="rgba(0, 255, 221, 0.61)"/>
    
  </div>
</template>

<script>
import MyButton from "@/components/General/MyButton.vue";
export default {
  //Components
  components: {
    MyButton
  },
  // DATA
  data() {
    return {};
  }
};
</script>


<style >
/*    GRID    */
.myGridTest {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-areas:
    "t1 t2 t3"
    "m1 m2 m3"
    "b1 b2 b3";
 
}

/*    Viewport    */
@media screen and (max-width: 576px) {
  /*   This CSS only fires when width < 576    */
}
.testb {
  grid-area: m2;
  align-self: center;
  justify-self: center;
}
</style>