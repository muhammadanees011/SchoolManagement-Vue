import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import SignUp from '../views/SignUp.vue'
import Schools from '../views/schools/Schools.vue'
import ArchivedSchools from '../views/schools/archived_schools.vue'
import AddSchool from '../views/schools/add.vue'
import EditSchool from '../views/schools/edit.vue'
import SchoolSettings from '../views/schools/settings.vue'
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
import CoursesList from '../views/courses/coursesList.vue'
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
      { path: '/archived/schools', name: 'archived-schools', component: ArchivedSchools },
      { path: '/settings/:id', name: 'settings-school', component: SchoolSettings },
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
      { path: '/archived/students', name: 'archived-students', component: ArchivedStudents },
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
      { path: '/archived/staff', name: 'archived-staff', component: ArchivedStaff },
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
      title: 'Transactions',
      requiresAuth: true,
    },
    children: [
      { path: '/transaction-history', name: 'transaction-history', component: TransactionHistory },
      { path: '/purchase-history', name: 'purchase-history', component: PurchaseHistory },
      { path: '/purchases', name: 'purchases-admin', component: PurchaseAdmin },
      { path: '/refunds', name: 'refund', component: Refund },
      { path: '/installments', name: 'installments', component: Installments },
      { path: '/pay-installment/:id', name: 'pay-installment', component: PayInstallment },
    ],
  },
  //------------SUPPORT----------
  {
    path: '/support',
    component: DefaultLayout,
    children: [
      { path: '', name: 'support', component: Support },
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
      { path: '/archived-shop-items', name: 'archived-shop-items', component: ArchivedShopItems },
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

// export default {
//   install(app, options) {
//     console.log(options)
//     router.install(app)
    
    router.beforeEach((to, from, next) => {
          // let  permissions=''
          //   permissions = app.config.globalProperties.$permissions;
          //   if (permissions) {
          document.title = to.meta.title || 'StudentPay'
          if (to.meta.requiresAuth && !localStorage.getItem('token')) {
            next({ name: 'SignIn' })
          } else if (localStorage.getItem('token') && (to.name === 'SignIn' || to.name === 'Register')) {
            next({ name: 'Dashboard' })
          } else {
              // if (containsKeywords(to.path, ['edit'])) {
              //   if(permissions.userPermissions.value.edit){
                  // next()
                // }else{
                //   console.log(permissions.userPermissions.value.edit)
                //   console.log(`you don't have permission for Route ${to.path}`);
                // }
                // alert(`Route ${to.path} contains keywords`);
                next()
          }
    })
//   }
// }

// function containsKeywords(str, keywords) {
//   return keywords.some(keyword => str.includes(keyword));
// }

export default router
