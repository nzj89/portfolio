import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
      iconfont: 'md',
  },
  theme: {
      dark: true,
      themes: {
          light: {
              //Theme
              primary: '#c4ff00',
              secondary: '#05deff',
              success: '#00a2ff',
              info: '#4405ff',
              error: '#ff1900',
              warning: '#ffbc03',

              //My Colors
              lightBlue1: '#00ffff',
              lightBlue2: '#18FFFF',
              darkBlue: '#000140',
              lightMagenta: '#ff00ea',
              myYellow: '#e5ff00',
              googleBlue: '#4285F4',
              facebookBlue: '#3b5998',
              myOrange: '#FF6000'
          },
          dark: {
              //Theme
              primary: '#c4ff00',
              secondary: '#05deff',
              success: '#00a2ff',
              info: '#4405ff',
              error: '#ff1900',
              warning: '#ffbc03',

              //My Colors
              lightBlue1: '#00ffff',
              lightBlue2: '#18FFFF',
              darkBlue: '#000140',
              lightMagenta: '#ff00ea',
              myYellow: '#e5ff00',
              googleBlue: '#4285F4',
              facebookBlue: '#3b5998',
              myOrange: '#FF6000',
              myDarkBlue: '#06002b'
          },
      },
  },
  options: {
      customProperties: true,
  }

})