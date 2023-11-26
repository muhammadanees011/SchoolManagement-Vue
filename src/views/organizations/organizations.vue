<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Organizations</h6>
              <router-link :to="{ name: 'add-organizations' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Add Organization </button>
              </router-link>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> ID </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Organization Name </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> Country/City </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> Email/Phone </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Schools </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Students </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in organizationsData" :key="index">
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0"> {{ item.id }}</p>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs font-weight-bold mb-1">{{ item.name }}</h6>
                          <p class="text-xs text-secondary mb-0"> {{ item.website }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs font-weight-bold mb-1">{{ item.country }}</h6>
                          <p class="text-xs text-secondary mb-0"> {{ item.city }}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-xs font-weight-bold mb-1">{{ item.user.email }}</h6>
                          <p class="text-xs text-secondary mb-0"> {{ item.user.phone }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0"> 0 </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">0 </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">{{ item.user.status }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span>
                        <router-link :to="{ name: 'edit-organization', params: { id: item.id } }">
                          <i class="material-icons-round opacity-10 fs-5 cursor-pointer">edit</i>
                        </router-link>
                        <i class="material-icons-round opacity-10 fs-5">info</i>
                        <i @click="deleteOrganization(item.id)" class="material-icons-round opacity-10 fs-5 cursor-pointer">delete</i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Pagination -->
              <nav aria-label="Page navigation">
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../axios'

export default {
  name: 'organizations',
  metaInfo: {
    title: 'Organizations',
  },
  mounted() {
    this.getOrganizations()
  },
  computed: {},
  data() {
    return {
      organizationsData: '',
      schools: 6,
    }
  },
  methods: {
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
