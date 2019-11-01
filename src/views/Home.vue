<template>
  <div class="homeGrid">
    <div class="myBigLogo"></div>
    <div class="circularAnim"></div>
    <div class="backgroundMidElements"></div>
    <div class="midElements">
      <div class="nicolas text-center">Nicolas</div>
      <div class="zamorano text-center">Zamorano</div>
      <div class="titles text-center mr-2"></div>
    </div>
    <img class="photo" src="../assets/nicoId.webp" alt />
    <div class="photoBorder"></div>
  </div>
</template>

<script>
export default {
  // DATA
  data() {
    return {};
  }
};
</script>

<style >
.homeGrid {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 140px 1fr 1fr;
}

.myBigLogo {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  background-image: url("../assets/website-logo.png");
  background-position: center;
  background-size: contain;
  width: 125px;
  justify-self: center;
  z-index: 1;
}
.circularAnim {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  z-index: 0;
  background-image: linear-gradient(
    0deg,
    rgb(0, 225, 255),
    rgb(136, 255, 0),
    rgb(0, 225, 255),
    rgba(0, 0, 255, 0) 80%
  );
  opacity: 0;
  clip-path: circle(65px at 50% 50%);
  animation: spin 10s cubic-bezier(0.1, 0.5, 0.3, 0.4) infinite alternate,
    animAppears 1s linear 2s 1 forwards;
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
@keyframes animAppears {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.midElements {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  display: grid;
  height: 125px;
  align-self: center;
  grid-template-columns: 1fr;
  grid-template-rows: 10px 30% 30% auto 15px;
}
.backgroundMidElements {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  height: 125px;
  align-self: center;
  background-image: linear-gradient(
    0deg,
    rgba(0, 128, 0, 0),
    rgba(0, 0, 0, 0.822) 5%,
    rgba(0, 12, 34, 0.781) 95%,
    rgba(255, 255, 0, 0)
  );
}
.nicolas {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  justify-self: center;
  align-self: center;
  font-family: "Orbitron", sans-serif;
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 2px;
}
.zamorano {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  justify-self: center;
  align-self: center;
  font-family: "Orbitron", sans-serif;
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 2px;
}
.titles {
  grid-column: 1 / span 1;
  grid-row: 4 / span 1;
  justify-self: center;
  align-self: center;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 900;
  font-size: 17px;
  z-index: 4;
  width: 100%;
  height: 100%;
  color: rgb(0, 183, 255);
}
.titles::after {
  content: "";
  animation: changeTitle 10s  infinite forwards;
}
@keyframes changeTitle {
  0% {
    opacity: 0;
    content: " Programmer";
  }
  5% {
    opacity: 1;
    content: " Programmer";
  }
   35% {
    opacity: 1;
    content: " Programmer";
  }
   40% {
    opacity: 0;
    content: " Programmer";
  }
    50% {
    opacity: 0;
    content: " Trilingual";
  }
   55% {
    opacity: 1;
     content: " Trilingual";
  }
  85%
  {
    opacity: 1;
     content: " Trilingual";
  }
  90% {
    opacity: 0;
     content: " Trilingual";
  }
  100%{
    opacity: 0;
    content: " Programmer";
  }
}

.photo {
  border-radius: 30px;
  width: 85px;
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  justify-self: center;
  align-self: center;
  z-index: 5;
}
.photoBorder {
  border-radius: 35px;
  justify-self: center;
  align-self: center;
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  width: 93px;
  height: 130px;
  
  z-index: 4;
  background-image: linear-gradient(
    0deg,
    rgba(179, 255, 0, 0.274) 20%,
    rgba(0, 255, 242, 0.849) 50%,
    rgba(157, 255, 0, 0.37) 75%
  );
}
</style>