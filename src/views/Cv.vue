<template>
  <div class="cvGrid">
    <div class="div1">Nicolas Zamorano</div>
    <div class="div2">Trilingual Computer Science Graduate</div>
    <div class="borderWhiteMain"></div>
    <div class="div3">
      <span class="titleStyle">SKILLS</span>
      <br />
      <font-awesome-icon
        class="mr-2"
        size="1x"
        icon="globe-americas"
        :style="{ color: 'rgb(0, 174, 255)' }"
      />English French Spanish
      <br />
      <font-awesome-icon
        class="mr-2"
        size="1x"
        icon="toolbox"
        :style="{ color: 'rgb(157, 255, 0)' }"
      />Skills : Programing & Customer Serivce
    </div>
    <div class="bWhiteSmall1"></div>
    <div class="div4">
      <font-awesome-icon
        class="mr-1"
        size="1x"
        :icon="['fab', 'vuejs']"
        :style="{ color: '#41B883' }"
      />Vuejs
      <font-awesome-icon class="mx-1" size="1x" icon="fire-alt" :style="{ color: '#F57C00' }" />Firebase
      <font-awesome-icon
        class="mx-1"
        size="1x"
        :icon="['fab', 'css3-alt']"
        :style="{ color: '#00BFFF' }"
      />CSS
      <font-awesome-icon
        class="mx-1"
        size="1x"
        :icon="['fab', 'html5']"
        :style="{ color: '#e34f26' }"
      />HTML
      <br />
      <font-awesome-icon
        class="mr-1"
        size="1x"
        :icon="['fab', 'js-square']"
        :style="{ color: '#f7df1e' }"
      />JavaScript
      <font-awesome-icon class="mx-1" :icon="['fab', 'java']" :style="{ color: 'white'}" />Java
      <font-awesome-icon class="mx-1" icon="code" :style="{ color: '#2db928'}" />C
    </div>
    <div class="division2"></div>
    <div class="div5">
      <span class="titleStyle">STUDIES</span>
      <br />
      <font-awesome-icon class="mr-2" size="1x" icon="university" :style="{ color: '#00aaff' }" />Paris University : UPMC
      <br />
      <font-awesome-icon
        class="mr-1"
        size="1x"
        icon="graduation-cap"
        :style="{ color: 'rgb(157, 255, 0)' }"
      />Computer Science Degree
    </div>
    <div class="division3"></div>
    <div class="div6">
      <span class="titleStyle">WORK EXPERIENCE</span>
      <br />
      <font-awesome-icon class="mr-1" size="1x" icon="phone" :style="{ color: '#00aaff' }" />Customer Service @ Charter Inc.
      <br />
      <font-awesome-icon
        class="mr-2"
        size="1x"
        icon="utensils"
        :style="{ color: 'rgb(157, 255, 0)' }"
      />Cooking & Selling, Self Employed
    </div>
    <div class="division4"></div>
    <div class="div7">
      <span class="titleStyle">CONTACT LINKS</span>
      <br />
      <a href="https://www.linkedin.com/in/nzj89/" :style="{ color: '#05ffff' }">
        <font-awesome-icon
          class="mr-1"
          size="1x"
          :icon="['fab', 'linkedin']"
          :style="{ color: '#00afff' }"
        />LinkedIn:
        <span :style="{ color: 'white' }">nzj89 👈</span>
      </a>
      <br />
      <font-awesome-icon class="mr-1" size="1x" icon="at" :style="{ color: 'rgb(157, 255, 0)' }" />nicolas.zamorano@outlook.com
    </div>
    <div class="division5"></div>
    <div class="div8">
      <a href="https://github.com/nzj89/portfolio" :style="{ color: '#05ffff' }">
      <span class="titleStyle mr-1">
        <font-awesome-icon
          class="mr-1 gitIconSize"
          size="1x"
          :icon="['fab', 'github']"
          :style="{ color: '#000' }"
        />THIS WEBSITE'S CODE
      </span></a> 👈
    </div>
  </div>
</template>


<style>
.cvGrid {
  display: grid;
  height: 100%;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 25px 25px 8px 4px 65px 1px 45px 3px 65px 3px 65px 3px 63px 3px 30px 1fr;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.582),
    rgba(0, 0, 0, 0.808),
    rgba(0, 0, 0, 0.918)
  );
}
.div1 {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  font-family: "Audiowide", sans-serif;
  justify-self: center;
  align-self: center;
  font-size: 20px;
}
.div2 {
  grid-column: 1 / span 3;
  grid-row: 3 / span 1;
  font-family: "Lexend Deca", cursive;
  justify-self: center;
  align-self: center;
  font-size: 14px;
}
.borderWhiteMain {
  grid-column: 1 / span 3;
  grid-row: 5 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.295),
    rgb(255, 255, 255)
  );
}
.div3 {
  grid-column: 2 / span 1;
  grid-row: 6 / span 1;
  padding: 4px;
  font-size: 13px;
  align-self: center;
}
.titleStyle {
  font-family: "Lexend Deca", cursive;
  font-size: 12px;
  background-color: white;
  color: black;
  border-radius: 3px;
  padding-right: 3px;
  padding-left: 3px;
  font-weight: bold;
}
.bWhiteSmall1 {
  grid-column: 2 / span 1;
  grid-row: 7 / span 1;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(255, 255, 255));
  border-radius: 15px;
}
.div4 {
  grid-column: 2 / span 1;
  grid-row: 8 / span 1;
  font-size: 13px;
  padding: 4px;
  align-self: center;
}
.division2 {
  grid-column: 1 / span 3;
  grid-row: 9 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.281),
    rgba(255, 255, 255, 0.575)
  );
}
.div5 {
  grid-column: 2 / span 1;
  grid-row: 10 / span 1;
  padding: 4px;
  font-size: 13px;
  align-self: center;
}
.division3 {
  grid-column: 1 / span 3;
  grid-row: 11 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.281),
    rgba(255, 255, 255, 0.575)
  );
}
.div6 {
  grid-column: 2 / span 1;
  grid-row: 12 / span 1;
  padding: 4px;
  font-size: 13px;
  align-self: center;
}
.division4 {
  grid-column: 1 / span 3;
  grid-row: 13 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.281),
    rgba(255, 255, 255, 0.575)
  );
}
.div7 {
  grid-column: 2 / span 1;
  grid-row: 14 / span 1;
  padding: 4px;
  font-size: 13px;
  align-self: center;
}
.division5 {
  grid-column: 1 / span 3;
  grid-row: 15 / span 1;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.281),
    rgba(255, 255, 255, 0.575)
  );
}
.div8 {
  grid-column: 2 / span 1;
  grid-row: 16 / span 1;
  padding: 4px;
  font-size: 13px;
  align-self: center;
}
.gitIconSize{
  font-size: 12px;
}
</style>