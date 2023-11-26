import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Schools from '../views/schools/Schools.vue'
import AddSchool from '../views/schools/add.vue'
import Students from '../views/students/Students.vue'
import AddStudent from '../views/students/add.vue'
import Organizations from '../views/organizations/organizations.vue'
import AddOrganizations from '../views/organizations/add.vue'
import EditOrganization from '../views/organizations/edit.vue'
import DefaultLayout from '../views/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: DefaultLayout,
    meta: {
      title: 'Organizations',
      requiresAuth: true,
    },
    children: [
      { path: '/organizations', name: 'list-organizations', component: Organizations },
      { path: '/add', name: 'add-organizations', component: AddOrganizations },
      { path: '/edit/:id', name: 'edit-organization', component: EditOrganization },
    ],
  },
  {
    path: '/schools',
    name: 'schools',
    component: DefaultLayout,
    meta: {
      title: 'Schools',
      requiresAuth: true,
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
      requiresAuth: true,
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
    meta: { requiresAuth: true },
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
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({ name: 'SignIn' })
  } else if (localStorage.getItem('token') && (to.name === 'SignIn' || to.name === 'Register')) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
