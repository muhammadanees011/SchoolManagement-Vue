import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Schools from '../views/schools/Schools.vue'
import AddSchool from '../views/schools/add.vue'
import EditSchool from '../views/schools/edit.vue'
import Students from '../views/students/Students.vue'
import AddStudent from '../views/students/add.vue'
import EditStudent from '../views/students/edit.vue'
import StudentBilling from '../views/students/billing.vue'
import StudentBallance from '../views/students/ballance.vue'
import Organizations from '../views/organizations/organizations.vue'
import AddOrganizations from '../views/organizations/add.vue'
import EditOrganization from '../views/organizations/edit.vue'
import Trips from '../views/trips/trips.vue'
import AddTrips from '../views/trips/add.vue'
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
      { path: '/:id', name: 'edit-organization', component: EditOrganization },
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
      { path: '/:id', name: 'edit-school', component: EditSchool },
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
      { path: '/:id', name: 'edit-student', component: EditStudent },
      { path: '/student-billing', name: 'student-billing', component: StudentBilling },
      { path: '/student-balance', name: 'student-balance', component: StudentBallance },
    ],
  },
  {
    path: '/trips',
    name: 'trips',
    component: DefaultLayout,
    meta: {
      title: 'Trips',
      requiresAuth: true,
    },
    children: [
      { path: '/trips', name: 'list-trips', component: Trips },
      { path: '/add-trips', name: 'add-trips', component: AddTrips },
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
