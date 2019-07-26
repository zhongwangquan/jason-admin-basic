<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <!--菜单容器-->
        <el-scrollbar wrap-class="scrollbar-wrapper" native='false'>
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            <!--单个菜单项-->
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
  },
  computed: {
    showLogo() {
      console.log('store', this.$store)
      return this.$store.state.setting.sidebarLogo
    }
  }
}
</script>

