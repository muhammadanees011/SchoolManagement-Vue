<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
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
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
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
        <div class="row mt-4">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <img src="../assets/img/dashboard2.jpg" style="width: 100%;height:95% ; border-radius: 20px; box-shadow: 0px 0px 2px #CCCCCC;">
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Trips', value: '3' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'My Balance', value: '£300' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Last Month Transactions', value: '£25,380' }"
              detail="<span class='text-danger text-sm font-weight-bolder'></span> Last Month Transactions"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Last 7 days Transactions', value: '£1030' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div> -->
        <!-- <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card title="Website Views" subtitle="Last Campaign Performance" update="campaign sent 2 days ago">
              <reports-bar-chart
                :chart="{
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  datasets: {
                    label: 'Sales',
                    data: [50, 20, 10, 22, 50, 10, 40],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card title="Daily Sales" subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in today sales." update="updated 4 min ago" color="success">
              <reports-line-chart
                :chart="{
                  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 mt-4">
            <chart-holder-card title="Completed Tasks" subtitle="Last Campaign Performance" update="just updated" color="dark">
              <reports-line-chart
                id="tasks-chart"
                :chart="{
                  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
        </div> -->
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
import axiosClient from '../axios'

export default {
  name: 'dashboard-default',
  data() {
    return {
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
    this.getStudentBalance();
    this.getTotalSchools();
    this.getTotalStudents();
    this.getTotalTransactions();
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
  },
}
</script>
