<template>
  <div
    class="avue-sidebar"
    v-if="showNavBar"
  >
    <logo></logo>
    <template v-if="isLayout == 1">
      <el-scrollbar
        style="height: 100%"
        @mouseleave.native="leaveNav"
      >
        <div
          v-if="validatenull(menu)"
          class="avue-sidebar--tip"
        > {{ $t("menuTip") }} </div>
        <el-menu
          @select="selectMenu"
          :default-active="nowTagValue"
          mode="vertical"
          :show-timeout="200"
          :collapse="keyCollapse"
          :default-openeds="defaultOpeneds"
        >
          <sidebar-item
            :menu="menu"
            :screen="screen"
            first
            :props="website.menu.props"
            :collapse="keyCollapse"
          ></sidebar-item>
        </el-menu>
      </el-scrollbar>
    </template>
    <div
      v-if="isLayout == 2 "
      class="verticalMenu"
    >
      <el-scrollbar>
        <div
          v-if="validatenull(menu)"
          class="avue-sidebar--tip"
        > {{ $t("menuTip") }} </div>
        <!-- <div class="handle-btn">
          <img
            :src="icon"
            @click="handleEvent"
          >
        </div> -->
        <el-menu
          :default-active="nowTagValue"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened="true"
        >
          <Sidebar
            :menu="menu"
            :screen="screen"
            first
            :props="website.menu.props"
            :collapse="keyCollapse"
            :isLayout="isLayout"
          ></Sidebar>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '../logo'
import sidebarItem from './sidebarItem'
import Sidebar from './sidebar'

export default {
  name: 'sidebar',
  components: { sidebarItem, logo, Sidebar },
  inject: ['index'],
  props: {
    showNavBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultOpeneds: [],
      isLayout: 1,
      icon: require('../../../../public/img/menu/收缩.png')
    }
  },
  watch: {
    showNavBar() {
      // console.log(this.showNavBar)
    },
    menu() {
      this.setDefaultOpeneds()
    }
  },
  created() {
    this.isLayout = localStorage.getItem('isLayout')
    // console.log(this.menu, "=======");
    this.setDefaultOpeneds()
  },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen', 'menuId']),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  methods: {
    handleEvent() {
      this.$emit('isLayoutEvent', false)
    },
    leaveNav() {
      this.$emit('update:showNavBar', false)
    },
    selectMenu() {
      this.$emit('update:showNavBar', false)
    },
    setDefaultOpeneds() {
      this.defaultOpeneds = []
      let loop = arr => {
        arr.forEach(item => {
          if (item.children && item.children.length) {
            this.defaultOpeneds.push(item.path)
            loop(item.children)
          }
        })
      }
      loop(this.menu)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  width: 1406px;
  height: 300px;
  padding: 20px;
  background-image: url('../../../../public/img/bg/tk.png');
  background-size: 100% 100%;
}
.verticalMenu {
  /deep/ .el-submenu__title {
    background: none !important;
  }
  /deep/ .el-submenu .titleStyle {
    // background-image: url('../../../../public/img/menu/menu-bg.png') !important;
    background: #3bb6ae;
    background-size: 106% 100% !important;
    // width: 220px;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
    height: 45px;
    line-height: 45px;
    position: relative;
    background-position: center;
    border-bottom: 1px solid #109592;
    border-top: 1px solid #77cbc4;
  }
  /deep/ .el-submenu.is-opened > .el-submenu__title .arrows {
    transform: rotate(90deg);
  }
}
.handle-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
}

.zhxj_global {
  .avue-sidebar--tip {
    background: none !important;
  }
}
</style>
