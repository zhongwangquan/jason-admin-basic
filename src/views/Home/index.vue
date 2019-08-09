<template>
  <el-row class="container">
    <el-col :span="24" class="header">
        <el-col :span="5" class="logo" :class="getCollapse?'logo-collapse-width':'logo-width'">
          <img :src="this.logo" /> {{getCollapse?"":sysName}}
        </el-col>
        <el-col :span="1">
            <div class="tools" @click.prevent="collapse">
                <i class="el-icon-menu"></i>
            </div>
            <!-- <i class="fa fa-align-justify"></i> -->
        </el-col>
        <el-col :span="13">
            <div class="hearNavBar">
              <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  background-color="#4b5f6e"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  mode="horizontal"
                  @select="handleSelectHearNavBar">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">消息中心</el-menu-item>
                <el-menu-item index="3">订单管理</el-menu-item>
              </el-menu>
            </div>
        </el-col>
        <el-col :span="5" class="userinfo">
            <span class='el-dropdown-link'>
              <ThemePicker></ThemePicker>
            </span>
            <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link userinfo-inner">
                  中文<i class='el-icon-arrow-right'/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='zh'>中文</el-dropdown-item>
                    <el-dropdown-item command='en'>English</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{username}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的消息</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside class="aside">
        <!--侧边栏菜单-->
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="getCollapse">
            <!-- <menu-tree v-for= 'item in  getMenuTree' :key='item.menuId' :menu="item">

            </menu-tree> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('/home/sys/user')">{{$t('sys.userMng')}}</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push('menu')">{{$t('sys.menuMng')}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <section class="content-container">
          <div class="grid-content bg-purple-light">
              <el-col :span="24" class="breadcrumb-container">
                  <el-breadcrumb separator="/" class="breadcrumb-inner">
                      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
                          {{ item.name }}
                      </el-breadcrumb-item>
                  </el-breadcrumb>
              </el-col>
              <el-col :span="24" class="content-wrapper">
                  <transition name="fade" mode="out-in">
                      <router-view></router-view>
                  </transition>
              </el-col>
          </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import MenuTree from '@/components/MenuTree'
import { mapActions, mapState, mapGetters } from 'vuex'
import { isURL } from '@/utils/validate'

export default {
  name: 'Home',
  components: {
    ThemePicker,
    MenuTree
  },
  data() {
    return {
      isCollapse: false,
      sysName: 'I like jason',
      username: 'jason',
      userAvatar: '',
      logo: '',
      activeIndex: '1'
    };
  },

  methods: {
    // addDynamicMenuRoutes (menuList = [], routes = []) {
    //     console.log('getMenuRouteLoaded', this.$store.state.app.menuRouteLoaded)
    //     if(this.$store.state.app.menuRouteLoaded) {
    //         console.log('动态路由菜单已经存在')
    //         return
    //     }
    //   var temp = []
    //   for (var i = 0; i < menuList.length; i++) {
    //     if (menuList[i].children && menuList[i].children.length >= 1) {
    //       temp = temp.concat(menuList[i].children)
    //     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
    //       menuList[i].url = menuList[i].url.replace(/^\//, '')
    //       // 创建路由配置
    //       var route = {
    //         path: menuList[i].url,
    //         component: null,
    //         name: menuList[i].name,
    //         meta: {
    //           menuId: menuList[i].menuId,
    //           title: menuList[i].name,
    //           isDynamic: true,
    //           isTab: true,
    //           iframeUrl: ''
    //         }
    //       }
    //       // url以http[s]://开头, 通过iframe展示
    //       if (isURL(menuList[i].url)) {
    //         route['path'] = menuList[i].url
    //         route['name'] = menuList[i].name
    //         route['meta']['iframeUrl'] = menuList[i].url
    //       } else {
    //         try {
    //           // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
    //           // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
    //           let array = menuList[i].url.split('/')
    //           let url = array[0].substring(0,1).toUpperCase()+array[0].substring(1) + '/' + array[1].substring(0,1).toUpperCase()+array[1]  .substring(1)
    //           route['component'] = resolve => require([`@/views/${url}`], resolve)
    //         } catch (e) {}
    //       }
    //       routes.push(route)
    //     }
    //   }
    //   if (temp.length >= 1) {
    //     this.addDynamicMenuRoutes(temp, routes)
    //   } else {
    //     console.log(routes)
    //   }
    //   return routes
    // },
    // findMentTree() {
    //     this.$api.menu.findMenuTree()
    //     .then(res=>{
    //         // this.menuTree(res.data)
    //         this.menuTree(res.data)
    //         this.menuRouteLoaded(true)
    //         // 添加动态路由
    //         let routes = this.addDynamicMenuRoutes(res.data)
    //         for(var i = 0; i < routes.length; i++) {
    //             this.$router.options.routes[1].children.push(routes[i])
    //         }
    //         this.$router.addRoutes(this.$router.options.routes);
    //         console.log('$router', this.$router)
    //     }).catch(err=>{
    //         console.log('res', err)
    //     })
    // },
    ...mapActions('app', ['collapse', 'menuTree', 'menuRouteLoaded']),
    handleopen(index, indexPath) {
      console.log('handleopen', index, indexPath);
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect(a, b) {
      console.log('handleselect');
    },
    handleSelectHearNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 语言切换
    handleCommand(command) {
      const lang = command === '' ? 'zh' : command
      this.$i18n.locale = lang
      console.log('语言切换为', lang)

    },
    // 折叠导航栏
    // 退出登录
    logout: function() {
      // var _this = this;
      console.log(this)
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => {});
    }

  },
  computed: {
    // ...mapState({
    //     getCollapse: state => state.app.collapse
    // })
    // getCollapse(){
    //     return this.$store.getters['app/getCollapse']
    // }
    ...mapGetters('app',
        [
            'getCollapse', 
            'getMenuTree',
            'getMenuRouteLoaded'
        ])
  },
  mounted() {
    console.log(this.$route)
    console.log('this', this)
    // this.findMentTree()
    // this.sysName = 'I like jason';
    this.logo = require('@/assets/logo.png');
    var user = sessionStorage.getItem('user');
    if (user) {
      this.userName = user;
      this.userAvatar = require('@/assets/user.png');
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #4b5f6e;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 30px;
      float: right;
      .userinfo-inner {
        font-size: 20px;
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 0px;
      padding-right: 0px;
      border-color: rgba(238, 241, 146, 0.5);
      border-right-width: 1px;
      border-right-style: solid;
      background: #4b5f6e;
      text-align: left;
      img {
          width: 40px;
          height: 40px;
          border-radius: 0px;
          margin: 10px 10px 10px 10px;
          float: left;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 65px;
    }
    .tools {
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      width: 40px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .hearNavBar {
      background: #4b5f6e;
      padding: 0px 0px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 29px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        text-align: left;
      }
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // overflow-y: scroll;
      padding: 0px;
      .breadcrumb-container {
        height: 28px;
        background: #fff;
        border-color: rgba(38, 86, 114, 0.2);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        background: rgba(99, 138, 161, 0.2);
        .breadcrumb-inner {
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 5px;
          text-align: left;
          font-size: 18px;
          width: 100%;
          height: 100%;
          float: left;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
