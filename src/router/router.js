import Vue from 'vue'
import Router from 'vue-router'
import signup from '@/components/signup'
import signin from '@/components/signin'
import profile from "@/components/profile";


Vue.use(Router);

let router= new Router ({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: signin
        },
        {
            path: '/signup',
            component: signup
        },
        {
            path: '/profile',
            component: profile
        },

        { path: '*', redirect: '/' },
    ]
})

export default router;