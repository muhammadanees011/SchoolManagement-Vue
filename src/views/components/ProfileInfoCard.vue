<template>
  <div class="h-100">
    <div class="p-3 pb-0 card-header">
      <div class="row">
        <div class="col-md-8 d-flex align-items-center">
          <h6 class="mb-0">{{ title }}</h6>
        </div>
        <!-- <div class="col-md-4 text-end">
          <a :href="action.route">
            <i
              class="text-sm fas fa-user-edit text-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="action.tooltip"
            ></i>
          </a>
        </div> -->
      </div>
    </div>
    <div class="p-3 card-body">
      <p class="text-sm">
        {{ description }}
      </p>
      <hr class="my-4 horizontal gray-light" />
      <ul class="list-group">
        <li class="profile-item pt-0 text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Full Name:</strong> &nbsp;
          {{ info.fullName }}
        </li>
        <!-- <hr class="profile-line"> -->
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Email:</strong> &nbsp; {{ info.email }}
        </li>
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Mobile:</strong> &nbsp; {{ info.mobile }}
        </li>
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Address:</strong> &nbsp;
          {{ info.location }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfoCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    info: {
      type: Object,
      fullName: String,
      mobile: String,
      email: String,
      location: String,
      default: () => {},
    },
    social: {
      type: Array,
      link: String,
      icon: String,
      default: () => [],
    },
    action: {
      type: Object,
      route: String,
      tooltip: String,
      default: () => ({
        route: "javascript:;",
      }),
    },
  },
};
</script>
<style>
.profile-line{
margin-top: 0px !important;
margin-bottom: 0px !important;
}
</style>