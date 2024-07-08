<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Organizations</h6>
              <router-link :to="{ name: 'add-organizations' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Add Organization </button>
              </router-link>
            </div>
          </div> -->
          <div class="d-flex justify-content-between border-radius-lg pt-4 ">
              <h6 class="text-dark text-capitalize ps-3">Organizations</h6>
              <router-link :to="{ name: 'add-organizations' }">
                <button style="font-size: 12px;background-color: #573078;" class="btn me-3 justify-content-between text-white fw-5 border-0 py-2 px-3 border-radius-lg"> Add Organization </button>
              </router-link>
            </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-xxs font-weight-bolder"> ID </th>
                    <th class="text-uppercase text-xxs font-weight-bolder"> Organization Name </th>
                    <th class="text-uppercase text-xxs font-weight-bolder ps-2"> Email </th>
                    <th class="text-uppercase text-xxs font-weight-bolder ps-2"> Country </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder"> Status </th>
                    <th class="text-center text-uppercase text-xxs font-weight-bolder">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in organizationsData" :key="index">
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0"> {{ item.id }}</p>
                    </td>
                    <td>
                      <div class="d-flex px-2">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs text-secondary mb-0">{{ item.name }}</h6>
                          <!-- <p class="text-xs text-secondary mb-0"> {{ item.website }}</p> -->
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 ">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs text-secondary mb-0 ">{{ item.email }}</h6>
                          <!-- <p class="text-xs text-secondary mb-0"> {{ item.user.phone }}</p> -->
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs text-secondary  mb-0">{{ item.country }}</h6>
                          <!-- <p class="text-xs text-secondary mb-0"> {{ item.city }}</p> -->
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{ item.status }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span>
                        <router-link :to="{ name: 'edit-organization', params: { id: item.id } }">
                          <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                        </router-link>
                        <!-- <i class="material-icons-round opacity-10 fs-5">info</i> -->
                        <i @click="confirmDelete(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Pagination -->
              <!-- <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center mt-4">
                  <li class="page-item disabled">
                    <i class="page-link material-icons-round opacity-10 fs-5" href="#" tabindex="-1" aria-disabled="true">arrow_back</i>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <i class="page-link material-icons-round opacity-10 fs-5" href="#" tabindex="-1" aria-disabled="true">arrow_forward</i>
                  </li>
                </ul>
              </nav> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../axios'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2';

export default {
  name: 'organizations',
  metaInfo: {
    title: 'Organizations',
  },
  mounted() {
    this.setColor()
    this.getOrganizations()
  },
  computed: {
    ...mapGetters(['getBrandingSetting']),
  },
  data() {
    return {
      organizationsData: '',
      schools: 6,
    }
  },
  methods: {
      confirmDelete(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Item will be deleted permanently and you will not be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          customClass: {
            popup: 'custom-swal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteOrganization(id)
          }
        });
      },
   
    setColor() {
      let bgColor=this.getBrandingSetting.primary_color ?
      this.getBrandingSetting.primary_color : '#573078';
      document.querySelector('thead').style.setProperty('--navheader-bg-color', bgColor);
    },
    setListData() {
      this.updateOrganizationList(this.organizationsData)
    },
    snackbarMsg(message) {
      this.$snackbar.add({
        type: 'success',
        text: message,
        background: 'white',
      })
    },
    //------------GET ALL THE ORGANIZATIONS-----------
    async getOrganizations() {
      try {
        const response = await axiosClient.get('/getAllOrganizations')
        this.organizationsData = response.data
      } catch (error) {
        console.log(error)
      }
    },
    //------------DELETE ORGANIZATION-----------
    async deleteOrganization(id) {
      try {
        await axiosClient.delete('/deleteOrganization/' + id)
        this.removeOrganizationFromList(id)
        this.snackbarMsg('Organization Deleted')
      } catch (error) {
        console.log(error)
      }
    },
    //------------REMOVE ORGANIZATION FROM LIST-----------
    removeOrganizationFromList(id) {
      const indexToRemove = this.organizationsData.findIndex((item) => item.id === id)
      this.organizationsData.splice(indexToRemove, 1)
    },
  },
}
</script>
<style>
thead{
  background-color: var(--navheader-bg-color) !important;
}
tbody > tr:hover{
  background-color: #F0F2F5 !important;
}
thead tr:hover{
  background-color: var(--navheader-bg-color) !important;
}
</style>
