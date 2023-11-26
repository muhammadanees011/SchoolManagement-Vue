<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="dashboard" navText="Dashboard">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">dashboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse :to="{ name: 'list-organizations' }" :aria-controls="''" v-bind:collapse="false" collapseRef="organizations" navText="Organizations">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">business</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/schools" :aria-controls="''" v-bind:collapse="false" collapseRef="schools" navText="Schools">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">account_balance</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="students" navText="Students">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">people</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="bills" navText="Bills">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">receipt</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="trips" navText="Trips">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">directions_bus</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="reports" navText="Reports">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">description</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="shops" navText="Shops">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">store</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="/students" :aria-controls="''" v-bind:collapse="false" collapseRef="meals" navText="Meals">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">restaurant</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from './SidenavCollapse.vue'

export default {
  name: 'SidenavList',
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: 'Soft UI Dashboard PRO',
      controls: 'dashboardsExamples',
      isActive: 'active',
    }
  },
  components: {
    SidenavCollapse,
  },
}
</script>
