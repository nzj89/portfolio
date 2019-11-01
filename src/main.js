// Main
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Vuetify
import vuetify from '@/plugins/vuetify'
import './plugins/vuetify'

// Bootsrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
    // Components Used
import { BFormTextarea } from 'bootstrap-vue'
Vue.component('b-form-textarea', BFormTextarea)
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// Icons
// https://fontawesome.com/icons?d=gallery&q=send&m=free
// https://www.npmjs.com/package/@fortawesome/vue-fontawesome
// https://blog.logrocket.com/full-guide-to-using-font-awesome-icons-in-vue-js-apps-5574c74d9b2d/
// https://github.com/FortAwesome/vue-fontawesome
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils, faPhone, faGraduationCap, faUniversity, faCode, faFireAlt, faToolbox, faGlobeAmericas, faBriefcase, faPlus, faSignInAlt, faExclamationTriangle, faArrowCircleLeft, faPaperPlane, faTrashAlt, faPencilAlt, faWindowClose, faSave, faImage, faImages, faFilm, faCloudUploadAlt, faDownload, faHome, faComments, faCog, faBars, faUser, faEnvelope, faCamera, faAt } from '@fortawesome/free-solid-svg-icons'
import { faFileImage as farFileImage } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faLinkedin, faJava, faJsSquare, faCss3Alt, faHtml5, faVuejs, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
library.add(faUtensils)
library.add(faGithub)
library.add(faLinkedin)
library.add(faPhone)
library.add(faGraduationCap)
library.add(faUniversity)
library.add(faPaperPlane)
library.add(faTrashAlt)
library.add(faPencilAlt)
library.add(faWindowClose)
library.add(faSave)
library.add(farFileImage)
library.add(faImages)
library.add(faCloudUploadAlt)
library.add(faDownload)
library.add(faHome)
library.add(faComments)
library.add(faCog)
library.add(faBars)
library.add(faUser)
library.add(faEnvelope)
library.add(faCamera)
library.add(faAt)
library.add(faImage)
library.add(faFilm)
library.add(faArrowCircleLeft)
library.add(faExclamationTriangle)
library.add(faGoogle)
library.add(faFacebookF)
library.add(faPlus)
library.add(faSignInAlt)
library.add(faBriefcase)
library.add(faGlobeAmericas)
library.add(faToolbox)
library.add(faVuejs)
library.add(faFireAlt)
library.add(faHtml5)
library.add(faCss3Alt)
library.add(faJsSquare)
library.add(faJava)
library.add(faCode)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

//My fireBase plugin
import fb_plugin from './plugins/fb_plugin'
Vue.use(fb_plugin)

//Firebase for Router auth required
import firebase from 'firebase/app'
import 'firebase/auth'

//Sync vue-router's current $route as part of vuex store's state.
import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.config.productionTip = false

var vue = null;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.commit('updateUser', { user })
    }

    if (!vue) {
        vue = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App),
        }).$mount('#app')
    }
})