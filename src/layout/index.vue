<template>
    <div class="app-wrapper">
        <!--左侧导航-->
        <Sidebar class="sidebar-container" />
    </div>
</template>

<script>
import { Sidebar } from './components'
export default {
  name: 'Layout',
  components: {
    Sidebar
  },
  data() {
    return {

    }
  }
}
</script>
