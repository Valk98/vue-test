import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import layout from "@/layout/layout";


export const  constantRoutes =[
    {
        path: '/',
        component:layout,
        hidden: true
    },
    {
        path: '/login',
        hidden:true,
        component: () => import('@/page/Login'),
    },
    {
        path: '/401',
        hidden:true,
        component: () => import('@/page/error-page/401'),
    },
    {
        path: '/404',
        hidden:true,
        component: () => import('@/page/error-page/404'),

    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path:'/table',
        component:layout,
        redirect: '/table/complex-table',
        name:'table',
        meta:{
            title:'table',
            roles:['admin']
        },
        children:[
            {
                path: 'complex-table',
                component: () => import('@/page/Table/ComplexTable'),
                name: 'ComplexTable',
                meta: {
                    title: 'ComplexTable',
                    roles:['admin']
                }
            }
        ]
    },
    {
        path: '/excel',
        component: layout,
        name:'Excel',
        redirect: '/excel/upload-excel',
        meta: {
            title: 'excel',
            roles:['admin']
        },
        children: [
            {
                path: 'upload-excel',
                component: () => import('@/page/Excel/upload'),
                name: 'UploadExcel',
                meta: {
                    title: 'uploadExcel',
                    roles:['admin']
                }
            }
        ]
    },
    {
        path: '/error',
        component: layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: 'errorPages',
        },
        children: [
            {
                path: '401',
                component: () => import('@/page/error-page/401'),
                name: 'Page401',
                meta: { title: 'page401', noCache: true }
            },
            {
                path: '404',
                component: () => import('@/page/error-page/404'),
                name: 'Page404',
                meta: { title: 'page404', noCache: true }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

