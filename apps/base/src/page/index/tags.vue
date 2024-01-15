<template>
  <div class="avue-tags zhxjTag" v-if="showTag">
    <div v-if="isLayout != 2">
      <el-tabs v-model="active" type="card" @contextmenu.native="handleContextmenu" @tab-click="openTag">
        <el-tab-pane :key="item.value" v-for="(item, index) in tagList" :name="item.value">
          <div slot="label" v-if="index == 0" class="tag_index_bg">
            <!-- <span class="tag-content"></span> -->
          </div>
          <div slot="label" v-else :class="active == item.value ? 'tag_click' : 'tag_no_click'" class="tag_page_bg">
            <span class="tag-content"> {{ generateTitle(item) }} </span>
            <i @click.stop="menuTag(item.value)" class="el-icon-close"></i>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="isLayout == 2">
      <el-tabs ref="myTabs" v-if="indexShow" v-model="active" type="card" @contextmenu.native="handleContextmenu" @tab-click="openTag">
        <el-tab-pane :key="item.value" v-for="(item, index) in tagList" :name="item.value">
          <div slot="label" v-if="index == 0 && isLayout == 2"><span class="tag_index_home" style="display: none"> </span></div>
          <div slot="label" v-else :class="active == item.value ? 'tag_click' : 'tag_no_click'" class="tag_page_bg">
            <span class="tag-content"> {{ generateTitle(item) }} </span>
            <i @click.stop="menuTag1(item.value)" class="el-icon-close" v-show="index > 1"></i>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-if="!indexShow" v-model="active" type="card" @contextmenu.native="handleContextmenu" @tab-click="openTag">
        <el-tab-pane :key="item.value" v-for="(item, index) in tagList" :name="item.value">
          <div slot="label" v-if="index == 0 && isLayout == 2"><span class="tag_index_home">首页</span></div>
          <div slot="label" v-else :class="active == item.value ? 'tag_click' : 'tag_no_click'" class="tag_page_bg">
            <span class="tag-content"> {{ generateTitle(item) }} </span>
            <i @click.stop="menuTag(item.value)" class="el-icon-close"></i>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'tags',
  data() {
    return {
      active: '',
      contentmenuX: '',
      contentmenuY: '',
      contextmenuFlag: false,
      isLayout: window.localStorage.getItem('isLayout'),
      dept_type: '',
      indexShow: true
    }
  },
  created() {},
  mounted() {
    this.dept_type = JSON.parse(localStorage.getItem('saber-userInfo')).content.role_id.trim()
    if (
      this.dept_type === '1701118459199291393' ||
      this.dept_type === '1686614206103617538' ||
      this.dept_type === '1691286363862732802' ||
      this.dept_type === '1692525218658123778' ||
      this.dept_type === '1692525335058448386' ||
      this.dept_type === '1686614206103617538'
    ) {
      this.indexShow = true
    } else {
      this.indexShow = false
    }
    console.log(this.dept_type, 'this.dept_type')
    this.setActive()

    if (this.tagList.length == 1 && this.isLayout == 2) {
      setTimeout(() => $('.zhxjTag .el-tabs__item.is-top').eq(0).addClass('is-active'), 100)
    }
  },
  watch: {
    tag() {
      if (this.tagList.length == 1 && this.isLayout == 2) {
        setTimeout(() => $('.zhxjTag .el-tabs__item.is-top').eq(0).addClass('is-active'), 100)
      } else if (this.isLayout == 2) {
        $('.zhxjTag .el-tabs__item.is-top').eq(0).removeClass('is-active')
      }

      this.setActive()
    },
    contextmenuFlag() {
      window.addEventListener('mousedown', this.watchContextmenu)
    }
  },
  computed: {
    ...mapGetters(['tagWel', 'tagList', 'tag', 'website']),
    ...mapState({
      showTag: state => state.common.showTag
    }),
    tagLen() {
      return this.tagList.length || 0
    }
  },
  methods: {
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(item.label, (item.meta || {}).i18n)
    },
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0) {
        this.contextmenuFlag = false
      }
      window.removeEventListener('mousedown', this.watchContextmenu)
    },
    handleContextmenu(event) {
      let target = event.target
      // 解决 https://github.com/d2-projects/d2-admin/issues/54
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    //激活当前选项
    setActive() {
      this.active = this.tag.value
    },
    // 关闭菜单
    menuTag1(value) {
      console.log(this.tagList, 'this.tagList')
      let { tag, key } = this.findTag(value)
      this.$store.commit('DEL_TAG', tag)
      if (tag.value === this.tag.value) {
        this.isLayout == 2 && (this.tagList[0].value = '/uavControl/top/index')
        tag = this.tagList[key === 1 ? key : key - 1] //如果关闭本标签让前推一个
        this.openTag(tag)
      }
    },
    // 关闭菜单
    menuTag(value) {
      let { tag, key } = this.findTag(value)
      this.$store.commit('DEL_TAG', tag)
      if (tag.value === this.tag.value) {
        this.isLayout == 2 && (this.tagList[0].value = '/uavControl/top/index')
        tag = this.tagList[key === 0 ? key : key - 1] //如果关闭本标签让前推一个
        this.openTag(tag)
      }
    },
    openTag(item) {
      let tag
      if (item.name) {
        tag = this.findTag(item.name).tag
        if (this.active == '/page/index') {
          if (this.isLayout == 2) {
            this.$router.push({
              path: '/uavControl/top/index',
              meta: {
                isTab: false
              }
            })

            const obj = JSON.parse(localStorage.getItem('saber-tag'))
            // 防止初次进入系统缓存为空报错
            if (obj && Object.keys(obj).length) {
              obj.content.label = '首页'
              obj.content.value = '/page/index'
              localStorage.setItem('saber-tag', JSON.stringify(obj))
              return
            }
          }
        }
      } else {
        tag = item
      }

      this.isLayout == 2 && tag.query.tempTopId && this.$store.dispatch('SetTopTagId', tag.query.tempTopId) // 前选中的一级菜单当id
      // 判断是否是全业务  zhxj
      if (this.isLayout == 2) {
        // 判断是否是首页--首页走path 路由传参
        if (tag.label && tag.label == '首页') {
          let pathValue = this.isLayout == 2 ? '/uavControl/top/index' : '/page/index'
          this.$router.push({
            path: this.$router.$avueRouter.getPath(
              {
                name: tag ? tag.label : '',
                src: tag ? pathValue : ''
              },
              tag ? tag.meta : ''
            )
          })
          // console.log(tag.value, 555)
        } else {
          // 不是是首页--name 路由传参
          this.$router.push({
            name: tag ? tag.label : '',
            params: tag ? tag.query : ''
          })
        }
      } else {
        // 全生命周期路由状态传值
        this.$router.push({
          path: this.$router.$avueRouter.getPath(
            {
              name: tag ? tag.label : '',
              src: tag ? tag.value : ''
            },
            tag ? tag.meta : ''
          ),
          query: tag ? tag.query : ''
        })
      }

      this.isLayout == 2 && setTimeout(() => tag.value == '/uavControl/top/index' && $('.zhxjTag .el-tabs__item.is-top').eq(0).addClass('is-active'), 100)
    },
    findTag(value) {
      let tag, key
      this.tagList.map((item, index) => {
        if (item.value === value) {
          tag = item
          key = index
        }
      })
      return { tag: tag, key: key }
    }
  }
}
</script>
<style lang="scss" scoped>
.avue-tags {
  width: 100%;
  flex: 1;
}
</style>
