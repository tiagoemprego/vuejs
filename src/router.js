import auth from './middleware/auth'
import checkAuth from './middleware/checkAuth'

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: 'Home',
                middleware: [auth]
            },
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login',
                middleware: [checkAuth]
            },
            component: Login
        }
    ]
});
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];

    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    // document.title = to.meta.title;
    //
    // if (window.uid === '' && to.name !== 'login')
    //     next({ name: 'login' });
    // else
    //     next()
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

export default router
