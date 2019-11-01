import Vue from 'vue'
import Router from 'vue-router'

//Views
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Chat from './views/Chat.vue'
import Cv from './views/Cv.vue'
import Lab from './views/Lab.vue'


//Vuex
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home

    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
        //Auth Required Test
        meta: {
            authRequired: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        //Auth Required Test
        meta: {
            authRequired: true
        }
    },
    {
        path: '/cv',
        name: 'cv',
        component: Cv,
    },
    {
        path: '/lab',
        name: 'lab',
        component: Lab,
    }
    ]
})


router.beforeEach((to, from, next) => {
    store.commit("updateCurrentPath", to);
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.user) {
            next({
                //Used to send to login so we no longer have that maybe use store to open dialog with
                path: '/',
                //This kinda saves the place u wanted to visit but had auth required
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;