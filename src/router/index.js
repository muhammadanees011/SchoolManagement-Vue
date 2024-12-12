import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import AuthCallback from '../views/auth_callback.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import SignUp from '../views/SignUp.vue'
import Schools from '../views/schools/Schools.vue'
import ArchivedSchools from '../views/schools/archived_schools.vue'
import AddSchool from '../views/schools/add.vue'
import EditSchool from '../views/schools/edit.vue'
import SchoolSettings from '../views/schools/settings.vue'
import SchoolCard from '../views/schools/add_card.vue'
import Students from '../views/students/Students.vue'
import ArchivedStudents from '../views/students/archived_students.vue'
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
import TripParticipants from '../views/trips/participants.vue'
import TransactionHistory from '../views/transaction_history/transaction_history.vue'
import PurchaseHistory from '../views/my_purchases/my_purchases.vue'
import PurchaseAdmin from '../views/my_purchases/purchases_admin.vue'
import Installments from '../views/installments/my_installments.vue'
import PayInstallment from '../views/installments/pay_installment.vue'
import PaidInstallments from '../views/installments/paid_installments.vue'
import Refund from '../views/my_purchases/refund.vue'
import Support from '../views/support/support.vue'
import Shop from '../views/shop/shop.vue'
import ArchivedShopItems from '../views/shop/archived_shop.vue'
import AddShopItem from '../views/shop/add.vue'
import EditShopItem from '../views/shop/edit.vue'
import Checkout from '../views/shop/checkout.vue'
import Meals from '../views/meals/meals.vue'
import AddMenu from '../views/meals/addMenu.vue'
import PaymentAccount from '../views/payment_account/payment_account.vue'
import PaymentMethod from '../views/payment_account/PaymentMethod.vue'
import AddPaymentCard from '../views/payment_account/add_card.vue'
import Courses from '../views/courses/coursesList.vue'
import AddCourse from '../views/courses/add.vue'
import EditCourse from '../views/courses/edit.vue'
import EnrolledStudents from '../views/courses/EnrolledStudents.vue'
import OrganizationAdmins from '../views/organization_admins/admins.vue'
import AddAdmin from '../views/organization_admins/addAdmin.vue'
import EditAdmin from '../views/organization_admins/editAdmin.vue'
import Staff from '../views/staff/staff.vue'
import ArchivedStaff from '../views/staff/archived_staff.vue'
import AddStaff from '../views/staff/add.vue'
import EditStaff from '../views/staff/edit.vue'
import StaffDetail from '../views/staff/details.vue'
import Parents from '../views/parent/parents.vue'
import AddParents from '../views/parent/add.vue'
import EditParents from '../views/parent/edit.vue'
import AddChildren from '../views/parent/children.vue'
import Childrens from '../views/childrens/childrens.vue'
import Attributes from '../views/student_attributes/attributes.vue'
import AddAttribute from '../views/student_attributes/add.vue'
import EditAttribute from '../views/student_attributes/edit.vue'
import Roles from '../views/roles_permissions/roles.vue'
import DefaultLayout from '../views/DefaultLayout.vue'
import ProductTypes from '../views/ProductTypes/index.vue'
import AddProductTypes from '../views/ProductTypes/create.vue'
import EditProductTypes from '../views/ProductTypes/edit.vue'
import Configurations from '../views/configurations/configurations.vue'

const routes = [
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback
  },
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
      { path: '/organizations/add', name: 'add-organizations', component: AddOrganizations },
      { path: '/organizations/:id', name: 'edit-organization', component: EditOrganization },
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
      { path: '/schools/add', name: 'add-school', component: AddSchool },
      { path: '/schools/edit-schools/:id', name: 'edit-school', component: EditSchool },
      { path: '/archived/schools', name: 'archived-schools', component: ArchivedSchools },
      { path: '/schools/settings/:id', name: 'settings-school', component: SchoolSettings },
      { path: '/school/addCard/:id', name: 'card-school', component: SchoolCard },
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
      { path: '/student/add', name: 'add-student', component: AddStudent },
      { path: '/student/:id', name: 'edit-student', component: EditStudent },
      { path: '/students/archived', name: 'archived-students', component: ArchivedStudents },
      { path: '/student-billing/:id', name: 'student-billing', component: StudentBilling },
    ],
  },
  { path: '/balance/:id?', name: 'balance', component: StudentBallance },
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
      { path: '/staff/archived', name: 'archived-staff', component: ArchivedStaff },
      { path: '/staff/details/:id', name: 'detail-staff', component: StaffDetail },
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
      { path: '/childrens/:id', name: 'add-childrens', component: AddChildren },
    ],
  },
    //------------PARENT---------------
    {
      path: '/course',
      name: 'course',
      component: DefaultLayout,
      meta: {
        title: 'Course',
        requiresAuth: true,
      },
      children: [
        { path: '/courses', name: 'list-courses', component: Courses },
        { path: '/course/add', name: 'add-course', component: AddCourse },
        { path: '/course/edit/:id', name: 'edit-course', component: EditCourse },
        { path: '/course/enrolled-students/:id', name: 'enrolled-students', component: EnrolledStudents },
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
      { path: '/payment_method/:id?', name: 'payment_method', component: PaymentMethod },
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
      title: 'Purchase',
      requiresAuth: true,
    },
    children: [
      { path: '/transaction-history', name: 'transaction-history', component: TransactionHistory },
      { path: '/purchase-history', name: 'purchase-history', component: PurchaseHistory },
      { path: '/purchases', name: 'purchases-admin', component: PurchaseAdmin },
      { path: '/refunds', name: 'refund', component: Refund },
      { path: '/installments', name: 'installments', component: Installments },
      { path: '/pay-installment/:id', name: 'pay-installment', component: PayInstallment },
      { path: '/paidinstallments', name: 'paid-installments', component: PaidInstallments },
    ],
  },
  //------------SUPPORT----------
  {
    path: '/support',
    component: DefaultLayout,
    meta: {
      title: 'Support',
      requiresAuth: true,
    },
    children: [
      { path: '', name: 'support', component: Support },
    ],
  },
  //------------CONFIGURATIONS----------
  {
    path: '/configurations',
    component: DefaultLayout,
    meta: {
      title: 'Configurations',
      requiresAuth: true,
    },
    children: [
      { path: '/configurations', name: 'configurations', component: Configurations },
    ],
  },
  //-------------PRODUCT TYPES----------------
  {
    path: '/product-types',
    name: 'ProductTypes',
    component: DefaultLayout,
    meta: {
      title: 'ProductTypes',
      requiresAuth: true,
    },
    children: [
      { path: '/product-types', name: 'product-types', component: ProductTypes },
      { path: '/product-types/add', name: 'add-product-types', component: AddProductTypes },
      { path: '/product-types/edit/:id', name: 'edit-product-types', component: EditProductTypes },
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
      { path: '/shop-items/add', name: 'add-items', component: AddShopItem },
      { path: '/shop-items/edit/:id', name: 'edit-shop-items', component: EditShopItem },
      { path: '/shop-items/archived', name: 'archived-shop-items', component: ArchivedShopItems },
    ],
  },
  //-------------CHECKOUT----------------
  {
    path: '/checkout',
    name: 'checkout',
    component: DefaultLayout,
    meta: {
      title: 'Checkout',
      requiresAuth: true,
    },
    children: [
      { path: '/cart-checkout', name: 'cart-checkout', component: Checkout },
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
      { path: '/participants-trips/:id', name: 'participants-trips', component: TripParticipants },
    ],
  },
  //--------------Roles And Permissions-----------------
  {
    path: '/roles',
    name: 'roles',
    component: DefaultLayout,
    meta: {
      title: 'Roles',
      requiresAuth: true,
    },
    children: [
      { path: '/roles', name: 'list-roles', component: Roles },
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
