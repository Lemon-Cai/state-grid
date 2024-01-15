<template>
  <div class="loginOut">
    <topMore @showSearch="showSearch"></topMore>
    <el-dropdown
      trigger="hover"
      placement="bottom"
    >
      <img
        width='35'
        @click="goUserInfo"
        class="user"
        :src="userImg"
        alt=""
      />
      <el-dropdown-menu
        class="more_dialog user_dialog"
        slot="dropdown"
      >
        <el-dropdown-item>账号：{{ $store.getters.userInfo.account }}</el-dropdown-item>
        <el-dropdown-item>用户名：{{ $store.getters.userInfo.nick_name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="user_Name">{{ userName }}</div>
    <el-tooltip
      class="logoutDom"
      content="退出登录"
      placement="bottom"
      effect="light"
    >
      <img
        width='34'
        class="logout"
        @click="logout"
        :src="outImg"
        alt=""
      />
    </el-tooltip>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

import { fullscreenToggel } from '@/util/util'
import topLock from './top-lock'
import topMenu from './top-menu'
import topSearch from './top-search'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topColor from './top-color'
import topNotice from './top-notice'
import topLang from './top-lang'
import { resetRouter } from '@/router/router'
import topMore from './top-more'
import config from '@/config/website'
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topNotice,
    topLang,
    topMore
  },
  name: 'top',
  data() {
    return {
      userName: this.$store.getters.userInfo.real_name,
      leftNav: [],
      rightNav: [],
      userImg: require('../../../../public/img/bg/userName.png'),
      outImg: require('../../../../public/img/bg/logout.png'),
      activeNav: '', // 一级菜单点击
      isLayout: window.localStorage.getItem('isLayout')
    }
  },
  setCollapse() {
    this.$store.commit('SET_COLLAPSE')
  },
  setScreen() {
    this.$store.commit('SET_FULLSCREN')
  },
  switchDept() {
    const userId = this.userInfo.user_id
    const deptColumn = this.findObject(this.userOption.column, 'deptId')
    deptColumn.dicUrl = `/api/blade-system/dept/select?userId=${userId}`
    deptColumn.display = true
    const roleColumn = this.findObject(this.userOption.column, 'roleId')
    roleColumn.dicUrl = `/api/blade-system/role/select?userId=${userId}`
    roleColumn.display = true
    this.userBox = true
  },
  computed: {
    ...mapGetters(['tagWel', 'tagList', 'tag', 'website']),
    ...mapState({
      showTag: state => state.common.showTag
    })
  },
  created() {
    // this.getMenu()
  },
  mounted() {
    if (localStorage.getItem('isLayout') && localStorage.getItem('isLayout') == 1) {
      this.userImg = require('../../../../public/img/bg/userName.png')
      this.outImg = require('../../../../public/img/bg/logout.png')
    } else {
      this.userImg = require('../../../../public/img/zhxj/top_user.png')
      this.outImg = require('../../../../public/img/zhxj/top_out.png')
    }
  },
  methods: {
    /**
     * 显示搜索界面
     */
    showSearch() {
      this.$parent.isSearch = true
    },
    /**
     * 用户信息
     */
    goUserInfo() {
      this.isLayout != 2 && this.$router.push('/info/index')
    },
    /**
     * 退出登录
     */
    logout() {
      this.$confirm(this.$t('logoutTip'), this.$t('Tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        iconClass: 'danger'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          resetRouter()
          if (localStorage.getItem('isLayout') == 1) {
            this.$router.push({ path: config.defaultLogin })
          } else {
            this.$router.push({ path: config.login })
          }
        })
      }).catch(()=>{})
    },
    // 点击一级菜单
    handleNav(value) {
      this.$emit('showNavBar')
      this.activeNav = value
      sessionStorage.setItem('navKey', value)
      this.$store.commit('SET_SHOW_COLLAPES', true)
      this.$store.dispatch('GetMenu', value).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true)
        }

        //当点击顶部菜单后默认打开第一个菜单
        /*if (!this.validatenull(item)) {
            let itemActive = {},
              childItemActive = 0;
            if (item.path) {
              itemActive = item;
            } else {
              if (this.menu[childItemActive].length === 0) {
                itemActive = this.menu[childItemActive];
              } else {
                itemActive = this.menu[childItemActive].children[childItemActive];
              }
            }
            this.$store.commit('SET_MENU_ID', item);
            this.$router.push({
              path: this.$router.$avueRouter.getPath({
                name: (itemActive.label || itemActive.name),
                src: itemActive.path
              }, itemActive.meta)
            });
          }*/
      })
    },
    /**
     *
     */
    getMenu() {
      this.$store.dispatch('GetTopMenu').then(res => {
        if (sessionStorage.getItem('navKey')) {
          // this.handleNav(sessionStorage.getItem("navKey"));
        } else {
          // this.handleNav(res[0].id)
        }
        this.items = res
        const half = Math.ceil(res.length / 2)
        this.leftNav = res.splice(0, half)
        this.rightNav = res.splice(-half)
      })
    },
    handleScreen() {
      fullscreenToggel()
    },
    setCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREN')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tags {
  // position: relative;
}
.loginOut {
  height: 30px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // position: absolute;
  // right: 0;
  // top: 0;
  // z-index: 1027;
  .user_Name {
    color: #1ddff6;
    font-size: 18px;
    flex: 2;
  }
  // .el-dropdown {
  //   float: left;
  // }
  .user_Name {
    // float: left;
    display: block;
    height: 30px;
    line-height: 30px;
    margin-left: 5px;
  }
  .logout {
    // float: right;
  }
  img {
    cursor: pointer;
    z-index: 9;
  }
}
</style>
