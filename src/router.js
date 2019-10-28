import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Firebase from './views/Firebase.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {title: 'Home'},
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            meta: {title: 'Login'},
            component: Firebase
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;

    if (!window.uid && to.name !== 'login')
        next({ name: 'login' });
    else
        next()
});

export default router
