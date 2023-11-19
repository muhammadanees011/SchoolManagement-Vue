<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="d-flex justify-content-between bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Students</h6>
              <router-link :to="{ name: 'add-student' }">
                <button style="font-size: 12px" class="me-3 bg-gradient-white shadow-white text-dark fw-5 border-0 p-2 border-radius-lg"> Add Student </button>
              </router-link>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> School Name </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"> Country/City </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Status </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> Registered On </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in schools" :key="index">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="@/assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Stockton</h6>
                          <p class="text-xs text-secondary mb-0"> Stockton@example.com </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0"> United Kingdom </p>
                      <p class="text-xs text-secondary mb-0">Bristol</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">Active</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                    </td>
                    <td class="align-middle">
                      <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user"> Edit </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tables',
  metaInfo: {
    title: 'Students',
  },
  data() {
    return {
      schools: 6,
    }
  },
}
</script>
