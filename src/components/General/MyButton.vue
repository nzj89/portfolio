<template>
  <div class="buttonGrid clickableClass">
    <div class="myButtonBorder" :style="{'background-image': 'linear-gradient(-45deg,'+bc1+','+bc2+')'}"></div>
    <div class="myButtonBackgroundColor"></div>
    <div class="buttonText1 buttonTextStyle"> {{t1}}</div>
    <div class="buttonText2 buttonTextStyle">{{t2}}</div>
    <div class="myButtonIconInGrid"   :style="{'color': ic}">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>


<script>
export default {
  //Props
  props: {
    t1: String,
    t2: String,
    icon: String,
    ic: String,
    bc1: String,
    bc2: String
  }
};
</script>
<style>
.buttonGrid {
  display: grid;
  width: 115px;
  grid-template-columns: 3px 3fr 8fr 3px;
  grid-template-rows: 2px 17px 6px 17px 2px;
}
.myButtonBackgroundColor {
  grid-column: 2 / span 2;
  grid-row: 2 / span 3;
  background-image: linear-gradient(110deg, rgb(0, 0, 0), rgb(0, 0, 0));
  border-radius: 5px;
  z-index: 1;
}
.myButtonBorder {
  grid-column: 1 / span 4;
  grid-row: 1 / span 5;
  border-radius: 10px;
  z-index: 0;
}

.buttonText1 {
  z-index: 2;
  grid-column: 3;
  grid-row: 2;
  align-self: start;
}
.buttonText2 {
  z-index: 2;
  grid-column: 3;
  grid-row: 4;
  align-self: end;
}
.buttonTextStyle {
  color: rgb(255, 255, 255);
  font-family: "Racing Sans One", cursive;
  justify-self: center;

  
}
.myButtonIconInGrid {
  z-index: 2;
  grid-column: 2;
  grid-row: 2 / span 3;
  justify-self: center;
  align-self: center;
}
</style>