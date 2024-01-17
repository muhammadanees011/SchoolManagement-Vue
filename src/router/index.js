import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
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
import EditTrips from '../views/trips/edit.vue'
import TransactionHistory from '../views/transaction_history/transaction_history.vue'
import Shop from '../views/shop/shop.vue'
import AddShopItem from '../views/shop/add.vue'
import EditShopItem from '../views/shop/edit.vue'
import Checkout from '../views/shop/checkout.vue'
import Meals from '../views/meals/meals.vue'
import AddMenu from '../views/meals/addMenu.vue'
import PaymentAccount from '../views/payment_account/payment_account.vue'
import AddPaymentCard from '../views/payment_account/add_card.vue'
import CoursesList from '../views/courses/coursesList.vue'
import OrganizationAdmins from '../views/organization_admins/admins.vue'
import AddAdmin from '../views/organization_admins/addAdmin.vue'
import EditAdmin from '../views/organization_admins/editAdmin.vue'
import Staff from '../views/staff/staff.vue'
import AddStaff from '../views/staff/add.vue'
import EditStaff from '../views/staff/edit.vue'
import Parents from '../views/parent/parents.vue'
import AddParents from '../views/parent/add.vue'
import EditParents from '../views/parent/edit.vue'
import Childrens from '../views/childrens/childrens.vue'
import Attributes from '../views/student_attributes/attributes.vue'
import AddAttribute from '../views/student_attributes/add.vue'
import EditAttribute from '../views/student_attributes/edit.vue'
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
  //------------ORGANIZATION-----------------
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
  //------------ORGANIZATION ADMINS---------------
  {
    path: '/organizations-admins',
    name: 'organizations-admins',
    component: DefaultLayout,
    meta: {
      title: 'Organizations Admins',
      requiresAuth: true,
    },
    children: [
      { path: '/organizations-admins', name: 'list-organization-admins', component: OrganizationAdmins },
      { path: '/add-organizations-admins', name: 'add-organization-admins', component: AddAdmin },
      { path: '/edit-organizations-admin/:id', name: 'edit-organization-admin', component: EditAdmin },
    ],
  },
  //------------SCHOOLS---------------
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
      { path: '/edit-schools/:id', name: 'edit-school', component: EditSchool },
    ],
  },
  //------------STUDENTS---------------
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
      { path: '/add/student', name: 'add-student', component: AddStudent },
      { path: '/:id', name: 'edit-student', component: EditStudent },
      { path: '/student-billing/:id', name: 'student-billing', component: StudentBilling },
      { path: '/student-balance/:id?', name: 'student-balance', component: StudentBallance },
    ],
  },
  //----------STUDENT ATTRIBUTES------------
  {
    path: '/attributes',
    name: 'attributes',
    component: DefaultLayout,
    meta: {
      title: 'Student Attributes',
      requiresAuth: true,
    },
    children: [
      { path: '/attributes', name: 'list-attributes', component: Attributes },
      { path: '/attributes/add', name: 'add-attribute', component: AddAttribute },
      { path: '/attributes/edit/:id', name: 'edit-attribute', component: EditAttribute },
    ],
  },
  //------------STAFF---------------
  {
    path: '/staff',
    name: 'staff',
    component: DefaultLayout,
    meta: {
      title: 'Staff',
      requiresAuth: true,
    },
    children: [
      { path: '/staff', name: 'list-staff', component: Staff },
      { path: '/staff/add', name: 'add-staff', component: AddStaff },
      { path: '/staff/edit/:id', name: 'edit-staff', component: EditStaff },
    ],
  },
  //------------PARENT---------------
  {
    path: '/parent',
    name: 'parent',
    component: DefaultLayout,
    meta: {
      title: 'Parent',
      requiresAuth: true,
    },
    children: [
      { path: '/parents', name: 'list-parent', component: Parents },
      { path: '/parents/add', name: 'add-parent', component: AddParents },
      { path: '/parents/edit/:id', name: 'edit-parent', component: EditParents },
    ],
  },
  //------------PAYMENTS---------------
  {
    path: '/payment',
    name: 'payment',
    component: DefaultLayout,
    meta: {
      title: 'Payment Account',
      requiresAuth: true,
    },
    children: [
      { path: '/payment_account/:id?', name: 'payment_account', component: PaymentAccount },
      { path: '/add_card', name: 'add_card', component: AddPaymentCard },
    ],
  },
  //------------TRANSACTION HISTORY----------
  {
    path: '/transactions-history',
    name: 'transactions',
    component: DefaultLayout,
    meta: {
      title: 'Transactions',
      requiresAuth: true,
    },
    children: [
      { path: '/transaction-history', name: 'transaction-history', component: TransactionHistory },
    ],
  },
  //-------------SHOP----------------
  {
    path: '/shop-items',
    name: 'shop',
    component: DefaultLayout,
    meta: {
      title: 'Shop',
      requiresAuth: true,
    },
    children: [
      { path: '/shop-items', name: 'shop-items', component: Shop },
      { path: '/add-shop-items', name: 'add-items', component: AddShopItem },
      { path: '/edit-shop-items/:id', name: 'edit-shop-items', component: EditShopItem },
      { path: '/shop-checkout/:id', name: 'shop-checkout', component: Checkout },
    ],
  },
  //--------------TRIPS-----------------
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
      { path: '/edit-trips/:id', name: 'edit-trips', component: EditTrips },
    ],
  },
  //---------------COURSES---------------
  {
    path: '/courses',
    name: 'courses',
    component: DefaultLayout,
    meta: {
      title: 'Courses',
      requiresAuth: true,
    },
    children: [
      { path: '/courses', name: 'list-courses', component: CoursesList },
    ],
  },
  //----------------MEALS-------------------
  {
    path: '/meals',
    name: 'meals',
    component: DefaultLayout,
    meta: {
      title: 'Meals',
      requiresAuth: true,
    },
    children: [
      { path: '/meals', name: 'list-meals', component: Meals },
      { path: '/add-menu', name: 'add-menu', component: AddMenu },
    ],
  },
  //----------------Childrens-------------------
  {
    path: '/childrens',
    name: 'childrens',
    component: DefaultLayout,
    meta: {
      title: 'Childrens',
      requiresAuth: true,
    },
    children: [
      { path: '/childrens', name: 'list-childrens', component: Childrens },
    ],
  },
  //----------------Payment Items-------------------
  {
    path: '/payments',
    name: 'payments',
    component: DefaultLayout,
    meta: {
      title: 'Payments',
      requiresAuth: true,
    },
    children: [
      { path: '/active-payments', name: 'list-active-payments', component: '' },
      { path: '/historical-payments', name: 'list-historical-payments', component: '' },
    ],
  },
  //----------------PROFILE-----------------
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset-password/:email/:otp',
    name: 'ResetPassword',
    component: ResetPassword,
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
