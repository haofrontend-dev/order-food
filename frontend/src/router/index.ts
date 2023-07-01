import { createRouter, createWebHistory } from "vue-router"

import Layout from "@/layout/index.vue"
import LayoutLogin from '@/layout/login.vue'
const route = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: () => import("../views/index.vue")
            }
        ],
    },
   {
    path: '/login',
    component: LayoutLogin,
    name: 'Login',
    children: [
        {
            path: '/login',
            component: () => import("../views/login/index.vue")
        }
    ]
   }
]

const router = createRouter({
    history: createWebHistory(),
    routes: route,
    strict: true
})

export default router