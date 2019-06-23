import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Dispatch from './views/Dispatch.vue'
import RegisterBear from './views/RegisterBear.vue'
import Transfer from './views/Transfer.vue'
import CouponExchange from './views/CouponExchange.vue'
import VouncherBeer from './views/VoucherBeer'
import Perfil from './views/Perfil'
import AddAndress from './views/AddAndress'
import Faq from './views/Faq'
import ContactUs from './views/ContactUs'
import HistoricNF from './views/HistoricNF'
import Index from './views/Index'
import RegisterSocial from './views/RegisterSocial'
import Pedagio from './views/Pedagio'

Vue.use(Router)

function checkToken()
{
    return localStorage.getItem('_token');
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if( checkToken() ) {
                    next('/');
                    return false;
                }
                next();
            }
        },
        {
            path: '/dispatch',
            name: 'dispatch',
            component: Dispatch
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/entrar-com-redes',
            name: 'RegisterSocial',
            component: RegisterSocial
        },
        {
            path: '/register-bear',
            name: 'RegisterBear',
            component: RegisterBear
        },
        {
            path: '/transferencia',
            name: 'Transfer',
            component: Transfer
        },
        {
            path: '/troca-de-cupons',
            name: 'CouponExchange',
            component: CouponExchange
        },
        {
            path: '/vouncher',
            name: 'VouncherBeer',
            component: VouncherBeer
        },
        {
            path: '/perfil',
            name: 'Perfil',
            component: Perfil
        },
        {
            path: '/adicionar-endereco',
            name: 'AddAndress',
            component: AddAndress
        },
        {
            path: '/Faq',
            name: 'Faq',
            component: Faq
        },
        {
            path: '/fale-conosco',
            name: 'ContactUs',
            component: ContactUs
        },
        {
            path: '/historico-de-nf',
            name: 'HistoricNF',
            component: HistoricNF
        },
        {
            path: '/pedagio',
            name: 'Pedagio',
            component: Pedagio
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
