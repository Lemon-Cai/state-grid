<template>
  <div
    class="avue-top"
    :class="isLayout == 2 && 'zhxj'"
    :style="!isPRD && 'background-image:none;'"
  >
    <template v-if="isLayout == 1">
      <div class="top-tags">
        <div class="top-left">
          <p
            @mouseenter="handleNav(item.id)"
            :class="activeNav == item.id ? 'nav_tag_left_active' : 'nav_tag'"
            v-for="item in leftNav"
            :key="item.id"
          >
            {{ item.name }}
          </p>
        </div>
        <div class="top-right">
          <p
            @mouseenter="handleNav(item.id)"
            :class="activeNav == item.id ? 'nav_tag_right_active' : 'nav_tag'"
            v-for="item in rightNav"
            :key="item.id"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isLayout == 2">
      <div class="top-tags">
        <div v-if="isPRD" class="zhxj_logo"></div>
        <div class="zhxj_txt" :style="!isPRD && 'margin-left: 65px;margin-right: 75px;'">
          {{ !isPRD ? 'QYWPT' : '无人机全业务管控微应用' }}
        </div>
        <div class="top-left">
          <p
            @click="handleNav(item.id)"
            :class="activeNav == item.id ? 'nav_tag_left_active' : 'nav_tag'"
            v-for="item in leftNav"
            :key="item.id"
          >
            {{ item.name }}
          </p>
          <div class="bg_animation" :style="`left:${animationNum * 140}px;`"></div>
        </div>
        <div class="top-right">
          <p
            @click="handleNav(item.id)"
            :class="activeNav == item.id ? 'nav_tag_right_active' : 'nav_tag'"
            v-for="item in rightNav"
            :key="item.id"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </template>
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
import { setStore } from '@/util/store'
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
      activeNav: '', // 一级菜单点击
      isLayout: 1,
      isPRD: false,
      animationNum: 0
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
    ...mapGetters(['tagWel', 'tagList', 'tag', 'website', 'topTagId']),
    ...mapState({
      showTag: state => state.common.showTag
    })
  },
  watch: {
    topTagId(id) {
      this.isLayout == 2 && this.handleNav(id) // 前选中的一级菜单当id
    }
  },
  created() {
    this.isPRD = window.isPRD
    this.isLayout = localStorage.getItem('isLayout')
    this.getMenu()
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
      this.$router.push('/info/index')
    },
    /**
     * 退出登录
     */
    logout() {
      // console.log('sssssssssssss')
      this.$confirm(this.$t('logoutTip'), this.$t('Tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        iconClass: 'danger'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          resetRouter()
          this.$router.push({ path: '/login' })
        })
      })
    },
    // 点击一级菜单
    handleNav(value) {
      this.$emit('showNavBar')
      this.activeNav = value
      sessionStorage.setItem('navKey', value)
      this.$store.commit('SET_SHOW_COLLAPES', true)

      // 智慧巡检 临时菜单流程
      const tempData = this.leftNav.find(item => item.id == value) || {}
      if (this.isLayout == 2 && tempData.children) {
        this.$router.$avueRouter.formatRoutes(tempData.children, true)
        this.$store.dispatch('SetTempMenu', tempData.children)
      }
      // 正常菜单流程
      else {
        this.$store.dispatch('GetMenu', value).then(data => {
          if (data.length !== 0) {
            if (this.isLayout == 2) {
              const func = arr => {
                arr.forEach(o => {
                  o.tempTopId = value // 添加一级菜单id，用于点击面包屑的时候进行一级菜单跟踪
                  o.children.length && func(o.children)
                })
              }
              func(data)
            }

            this.$router.$avueRouter.formatRoutes(data, true)
          }
        })
      }

      if (this.isLayout == 2) {
        const num = this.leftNav.findIndex(o => o.id == value)
        this.animationNum = num
      }
    },
    /**
     * 获取菜单
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

        // 智慧巡检 的 菜单逻辑
        if (this.isLayout == 2) {
          this.leftNav = [...this.leftNav, ...this.rightNav]
          this.rightNav = []

          if (sessionStorage.getItem('navKey')) {
            this.handleNav(sessionStorage.getItem('navKey'))
          } else {
            this.leftNav.length > 0 && this.handleNav(this.leftNav[0].id)
          }
        }
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
.loginOut {
  height: 30px;
  margin-right: 10px;
  position: absolute;
  right: 0;
  top: 78px;
  z-index: 1027;
  .user_Name {
    color: #1ddff6;
    font-size: 18px;
  }
  .el-dropdown {
    float: left;
  }
  .user_Name {
    float: left;
    display: block;
    height: 30px;
    line-height: 30px;
    margin-left: 5px;
  }
  .logout {
    float: right;
  }
  img {
    cursor: pointer;
  }
}
</style>
