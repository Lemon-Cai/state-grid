<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)" :index="item[pathKey]" @click="open(item)" :key="item[labelKey]" :class="{ 'is-active': vaildActive(item) }">
        <!-- <i :class="item[iconKey]"></i> -->
        <span slot="title" :alt="item[pathKey]">{{ generateTitle(item) }}</span>
      </el-menu-item>
      <!--  -->
      <el-submenu v-else-if="!validatenull(item[childrenKey]) && vaildRoles(item)" :index="item[pathKey]" :key="item[labelKey]">
        <template slot="title">
          <span slot="title" :class="item.parentId == '0' ? 'titleStyle' : ''"
            >{{ generateTitle(item) }} <i class="el-icon-arrow-right arrows" v-if="isLayout == 2"></i>
            <!-- <img
              :src="arrows"
              v-if="isLayout == 2"
              class="arrows"
            /> -->
          </span>
        </template>
        <template v-for="(child, cindex) in item[childrenKey]">
          <el-menu-item :index="child[pathKey]" @click="open(child)" v-if="validatenull(child[childrenKey])" :key="child[labelKey]">
            <span slot="title"> <i :class="child[iconKey]" class="menu-icon"></i> {{ generateTitle(child) }}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :props="props" :screen="screen" :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { isURL, validatenull } from '@/util/validate'
import config from './config.js'

export default {
  name: 'sidebarItem',
  data() {
    return {
      config: config,
      arrows: require('../../../../public/img/menu/多边形 2 拷贝 3.png')
    }
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    collapse: {
      type: Boolean
    },
    isLayout: {
      type: Number
    }
  },
  created() {
    // console.log(this.pathKey, '=====')
  },
  mounted() {
    // 默认跳到当前页了
    // console.log(JSON.parse(localStorage.getItem('saber-userInfo')).content.dept_id)
    const role = JSON.parse(localStorage.getItem('saber-userInfo')).content.role_id.trim()
    if (
      role === '1701118459199291393' ||
      role === '1686614206103617538' ||
      role === '1691286363862732802' ||
      role === '1692525218658123778' ||
      role === '1692525335058448386' ||
      role === '1686614206103617538'
    ) {
      setTimeout(() => {
        this.$router.push({ path: this.$store.state.user.firstUrl })
        this.open(this.menu[0][this.childrenKey][0])
      }, 800)
    }
  },
  computed: {
    ...mapGetters(['roles']),
    labelKey() {
      return this.props.label || this.config.propsDefault.label
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children
    },
    isOpenKey() {
      return this.props.isOpen || this.config.propsDefault.isOpen
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  methods: {
    generateTitle(item) {
      // console.log(item);

      return this.$router.$avueRouter.generateTitle(item[this.labelKey], (item.meta || {}).i18n)
    },
    vaildActive(item) {
      if (this.validIsOpen(item)) {
        return false
      }
      const groupFlag = (item['group'] || []).some(ele => this.$route.path.includes(ele))
      return this.nowTagValue === item[this.pathKey] || groupFlag
    },
    vaildRoles(item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull(val) {
      return validatenull(val)
    },
    validIsOpen(item) {
      if (item[this.isOpenKey] === 2 && isURL(item[this.pathKey])) {
        return true
      }
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit('SET_COLLAPSE')
      if (this.validIsOpen(item)) {
        window.open(item[this.pathKey])
      } else {
        // 打开新的网页
        if (item.path.includes('http')) {
          window.open(item.path)
        } else {
          this.$router.$avueRouter.group = item.group
          this.$router.$avueRouter.meta = item.meta

          if (this.isLayout == 2) {
            if (item.query) {
              item.query['tempTopId'] = item.tempTopId
            } else {
              item.query = { tempTopId: item.tempTopId }
            }
          }
          // 解决偶尔删除tag标签 上面不跟着变的bug
          this.isLayout == 2 && item.query.tempTopId && this.$store.dispatch('SetTopTagId', item.query.tempTopId)

          // 判断是否是全业务  zhxj
          if (this.isLayout == 2) {
            this.$router.push({
              name: item[this.labelKey],
              params: item.query
            })
          } else {
            // 全生命周期
            this.$router.push({
              path: this.$router.$avueRouter.getPath(
                {
                  name: item[this.labelKey],
                  src: item[this.pathKey]
                },
                item.meta
              ),
              query: item.query
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  margin-top: 10px;
  overflow: hidden;
}
.el-submenu {
  text-align: center;
  // width: 200px;
  .titleStyle {
    display: block;
    height: 40px;
    width: 100%;
    line-height: 36px;
    background-image: url('../../../../public/img/bg/bk.png');
    background-size: 100% 100%;
    // background-color: #fff !important;
  }
}
.arrows {
  transform: rotate(0deg);
  position: absolute;
  top: 12px;
  right: 10px;
}
.menu-icon {
  margin-right: 5px;
}
</style>
