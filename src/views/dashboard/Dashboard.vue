<template>
  <div class="dashboard-container">
  </div>
</template>

<script lang="ts">
import { USER_NAMESPACE } from '@/store/user/action.type'
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend( {
  name: 'Dashboard',
  computed: {
    ...mapGetters(USER_NAMESPACE,  ['name', 'roles'])
  }
})
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>

