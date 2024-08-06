<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <template v-if="user.role=='student'">
            <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text:'Current Balance', value: '£'+formattedPrice(studentHistory.current_balance ?? 0) }"
              detail="Current Balance"
              :icon="{
                name: 'credit_card',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Monthly Transactions', value: '£'+formattedPrice(studentHistory.last_month ?? 0)  }"
              detail="This Month Transactions"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Weekly Transactions', value: '£'+formattedPrice(studentHistory.last_week ?? 0) }"
              detail="This Week Transactions"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          </template>
          <template v-if="user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff'">
            <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text:isAdmin ? 'Total Figures':'Total Balance', value: '£'+formattedPrice(userBallance ? userBallance : 0) }"
              :detail="(isAdmin ? 'Total Figures' : 'Total Balance')"
              :icon="{
                name: 'credit_card',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Total Schools', value: totalSchool ? totalSchool:0 }"
              detail="Total Schools"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Total Students', value: totalStudents ? totalStudents: 0 }"
              detail="Total Students"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          </template>
          <div v-if="user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff' || user.role=='student'" class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Transactions', value: '£'+formattedPrice(totalTransactions ? totalTransactions :0)  }"
              detail="Total Transactions"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>
        <div v-if="user.role=='parent'" class="row mt-4">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <img src="../assets/img/dashboard2.jpg" style="width: 100%;height:95% ; border-radius: 20px; box-shadow: 0px 0px 2px #CCCCCC;">
          </div>
        </div>
        <UserShop v-if="user.role=='super_admin' || user.role=='organization_admin' || user.role=='staff' || user.role=='student'"/>
      </div>
    </div>
  </div>
</template>
<script>
// import ChartHolderCard from './components/ChartHolderCard.vue'
// import ReportsBarChart from '@/examples/Charts/ReportsBarChart.vue'
// import ReportsLineChart from '@/examples/Charts/ReportsLineChart.vue'
import MiniStatisticsCard from './components/MiniStatisticsCard.vue'
import logoXD from '@/assets/img/small-logos/logo-xd.svg'
import logoAtlassian from '@/assets/img/small-logos/logo-atlassian.svg'
import logoSlack from '@/assets/img/small-logos/logo-slack.svg'
import logoSpotify from '@/assets/img/small-logos/logo-spotify.svg'
import logoJira from '@/assets/img/small-logos/logo-jira.svg'
import logoInvision from '@/assets/img/small-logos/logo-invision.svg'
import team1 from '@/assets/img/team-1.jpg'
import team2 from '@/assets/img/team-2.jpg'
import team3 from '@/assets/img/team-3.jpg'
import team4 from '@/assets/img/team-4.jpg'
import UserShop from './shop/user_shop.vue'
import axiosClient from '../axios'

export default {
  name: 'dashboard-default',
  data() {
    return {
      studentHistory:'',
      totalTransactions:'',
      totalSchool:'',
      totalStudents:'',
      user:'',
      userBallance:'',
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
    }
  },
  mounted(){
    this.getUser();
    this.getStudentBalance();
    this.getTotalSchools();
    this.getTotalStudents();
    this.getTotalTransactions();
    this.getStudentHistory();
  },
  computed:{
    isAdmin(){
      return this.user.role === 'organization_admin' || this.user.role === 'super_admin';
    }
  },
  methods:{
  formattedPrice(value){
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
   },
  //------------GET USER----------------
  getUser(){
    let user=localStorage.getItem('user')
    user= JSON.parse(user)
    this.user=user
    },
   //--------------GET BALANCE---------------
   async getStudentBalance(){
    let user=localStorage.getItem('user')
    user= JSON.parse(user)
    this.user=user
      try {
          let response= await axiosClient.get('/getStudentBalance/'+user.id)
          response=response.data
          this.userBallance=response
      } catch (error) {
          console.log(error)
      }
    },
    //--------------GET STUDENTS HISTORY---------------
    async getStudentHistory(){
      if(this.user.role!='student'){
        return
      }
      try {
          let response= await axiosClient.get('/studentDashboard')
          response=response.data
          this.studentHistory=response
      } catch (error) {
          console.log(error)
      }
    },
    //--------------GET TOTAL SCHOOLS---------------
    async getTotalSchools(){
      try {
          let response= await axiosClient.get('/totalSchools')
          response=response.data
          this.totalSchool=response
      } catch (error) {
          console.log(error)
      }
    },
    //--------------GET TOTAL STUDENTS---------------
    async getTotalStudents(){
      try {
          let response= await axiosClient.get('/getTotalStudents')
          response=response.data
          this.totalStudents=response
      } catch (error) {
          console.log(error)
      }
    },
    //--------------GET TOTAL Transactions---------------
    async getTotalTransactions(){
      try {
          let response= await axiosClient.get('/getTotalTransactions')
          response=response.data
          this.totalTransactions=response
      } catch (error) {
          console.log(error)
      }
    },
  },
  components: {
    // ChartHolderCard,
    // ReportsBarChart,
    // ReportsLineChart,
    MiniStatisticsCard,
    UserShop,
  },
}
</script>
