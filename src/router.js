import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import NotFound from './components/NotFound.vue'
import Main from './views/Main.vue'
import Manage from './views/Manage.vue'
import ErrorPage from './components/Error.vue'
import TripDetails from './components/TripDetails.vue'
import MyInfo from './components/MyInfo.vue'
import MyOrder from './components/MyOrder.vue'
import TripManage from './components/manage/TripManage.vue'
import Test from './components/test.vue'
import Overview from './components/manage/Overview.vue'
import UserManage from './components/manage/UserManage.vue';
import TripsSaleStatistics from './components/manage/TripsSaleStatistics.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '',
                    name: "Main",
                    component: Main
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register,
                }, {
                    path: 'login',
                    name: 'Login',
                    component: Login,
                }, {
                    path: 'trip_details',
                    name: 'TripDetails',
                    component: TripDetails,
                }, {
                    path: 'my_info',
                    name: 'MyInfo',
                    component: MyInfo,
                }, {
                    path: 'my_order',
                    name: 'MyOrder',
                    component: MyOrder
                }, {
                    path: 'manage',
                    name: 'Manage',
                    component: Manage,
                    children: [
                        {
                            path: 'overview',
                            name: 'Overview',
                            component: Overview,
                        }, {
                            path: 'trip_manage',
                            name: 'TripManage',
                            component: TripManage,
                        }, {
                            path: 'user_manage',
                            name: 'UserManage',
                            component: UserManage,
                        }, {
                            path: 'trips_sale_statistics',
                            name: 'TripsSaleStatistics',
                            component: TripsSaleStatistics,
                        }
                    ]
                },
            ]
        }, {
            path: '/test',
            name: 'test',
            component: Test
        }, {
            path: '/error',
            name: 'Error',
            component: ErrorPage,
        }, {
            path: '*',
            name: 'NotFound',
            component: NotFound,
        }
    ]
})