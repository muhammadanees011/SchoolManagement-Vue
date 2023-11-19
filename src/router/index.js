import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Schools from '../views/schools/Schools.vue'
import AddSchool from '../views/schools/add.vue'
import Students from '../views/students/Students.vue'
import AddStudent from '../views/students/add.vue'
import DefaultLayout from '../views/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/schools',
    name: 'schools',
    component: DefaultLayout,
    meta: {
      title: 'Schools',
    },
    children: [
      { path: '/schools', name: 'list-schools', component: Schools },
      { path: '/add', name: 'add-school', component: AddSchool },
    ],
  },
  {
    path: '/students',
    name: 'students',
    component: DefaultLayout,
    meta: {
      title: 'Students',
    },
    children: [
      { path: '/students', name: 'list-students', component: Students },
      { path: '/add', name: 'add-student', component: AddStudent },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'StudentPay'
  next()
})

export default router
