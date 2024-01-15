<template>
  <div
    class="avue-contail"
    :class="{ 'avue--collapse': isCollapse }"
  >
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top
        ref="top"
        @showNavBar="showNavBarEvents"
      />
      <div class="hander-handle">
        <tags />
        <logOut />
      </div>
    </div>
    <div :class="['avue-layout',isLayout == 2 ? 'sideLayout' : '' ,isLayoutShow ? '':'isLayoutShow',]">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar
          :showNavBar.sync="showNavBar"
          @isLayoutEvent="isLayoutEvent"
        />
      </div>
      <div class="avue-main">
        <transition name="fade-scale">
          <search
            class="avue-view"
            v-show="isSearch"
          ></search>
        </transition>
        <!-- 主体视图层 -->
        <div
          id="avue-view"
          v-show="!isSearch"
        >
          <!-- <keep-alive>
            <router-view
              class="avue-view"
              v-if="$route.meta.keepAlive"
            />
          </keep-alive>
          <router-view
            class="avue-view"
            v-if="!$route.meta.keepAlive"
          /> -->
          <!-- <keep-alive exclude="airLIneTms,airLIneDms,airLIneSms,spbDeviceModule,singleLineModule,gridInspectionModule">
            <router-view
              class="avue-view"
              v-if="isLayout == 2"
            />
          </keep-alive> -->
          <router-view class="avue-view" />
        </div>
      </div>
    </div>
    <div
      class="avue-shade"
      @click="showCollapse"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tags from './tags'
import search from './search'
import top from './top/'
import sidebar from './sidebar/'
import logOut from './top/top-logout.vue'
import admin from '@/util/admin'
import { validatenull } from '@/util/validate'
import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'

export default {
  components: {
    top,
    tags,
    search,
    sidebar,
    logOut
  },
  name: 'index',
  provide() {
    return {
      index: this
    }
  },
  data() {
    return {
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      showNavBar: false,
      //刷新token的时间
      refreshTime: '',
      isLayout: 1,
      isLayoutShow: true
    }
  },
  created() {
    //实时检测刷新token
    this.refreshToken()
    this.isLayout = localStorage.getItem('isLayout')
  },
  mounted() {
    this.init()
  },
  computed: mapGetters(['isMenu', 'isLock', 'isCollapse', 'website', 'menu']),
  methods: {
    isLayoutEvent() {
      this.isLayoutShow = !this.isLayoutShow
    },
    showNavBarEvents() {
      this.showNavBar = true
    },
    showCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    // 初始化
    init() {
      this.$store.commit('SET_SCREEN', admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', admin.getScreen())
        }, 0)
      }
      this.$store.dispatch('FlowRoutes').then(() => {})
    },
    //打开菜单
    openMenu(item = {}) {
      this.$store.dispatch('GetMenu', item.id).then(data => {
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
    // 定时检测token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token =
          getStore({
            name: 'token',
            debug: true
          }) || {}
        const date = calcDate(token.datetime, new Date().getTime())
        if (validatenull(date)) return
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true
          this.$store
            .dispatch('refreshToken')
            .then(() => {
              this.refreshLock = false
            })
            .catch(() => {
              this.refreshLock = false
            })
        }
      }, 10000)
    }
  }
}
</script>
<style lang="scss" scoped>
.hander-handle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;
}
.sideLayout {
  display: flex;
  justify-content: flex-start;
  height: calc(100% - 114px);
  /deep/ .avue-left {
    position: static;
    height: calc(100% - 114px);
    width: 240px;
    left: 0;
    top: 0;
    flex: 1;
    transform: none;
    box-sizing: border-box;
    height: calc(100% - 22px);
    z-index: 10;
  }
  /deep/ .avue-sidebar {
    width: 100%;
    padding-top: 10px;
  }
  // 子集菜单
  /deep/ div.menu-wrapper > li.el-menu-item {
    // background: transparent url('../../../public/img/menu/矩形 10-灰.png') no-repeat !important;
    background: #ffffff !important;
    background-size: 100% 100% !important;
    text-align: center;
    text-align: left;
    text-indent: 20px;
    &::before {
      content: '\eb9e';
      display: inline-block;
      width: 16px;
      height: 16px;
      font-family: 'iconfont' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      vertical-align: sub;
      margin-right: 30px;
      color: rgba(255, 255, 255, 0.7) !important;
    }
    &.is-active {
      color: #fff !important;
      // background: transparent url('../../../public/img/menu/矩形 10.png') no-repeat !important;
      background: #e6faf9 !important;
      background-size: 100% 100% !important;
      &::before {
        color: #fff !important;
      }
    }
  }
  // 子集菜单
  /deep/ div.menu-wrapper > li.el-submenu > ul > li.el-menu-item {
    // background: transparent url('../../../public/img/menu/矩形 10-灰.png') no-repeat !important;
    background: #ffffff !important;
    background-size: 100% 100% !important;
    text-align: left;
    text-indent: 30px;

    &.is-active {
      color: #fff !important;
      background: #e6faf9 !important;
      // background: transparent url('../../../public/img/menu/矩形 10.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
  }
  // 三级菜单
  /deep/ div.menu-wrapper > li.el-submenu > ul > div > li > div.el-submenu__title {
    background: transparent url('../../../public/img/menu/titleBG.png') no-repeat !important;
    background-size: 100% 100% !important;
    text-align: left;
    text-indent: 30px;
  }
  /deep/ .el-scrollbar {
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
  }
  /deep/ .avue-main {
    position: relative;
    width: calc(100% - 240px);
    height: calc(100% - 22px);
  }
  .avue-left {
    overflow: auto;
  }
  &.isLayoutShow {
    /deep/ .avue-left {
      width: 50px;
    }
    /deep/ .avue-main {
      width: calc(100% - 50px);
    }
  }
}
</style>
