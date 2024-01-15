<template>
  <el-dropdown class="avue-tags__menu">
    <el-button size="mini"> {{ $t("tagsView.menu") }}
      <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="showSearch">{{
          $t("tagsView.search")
        }}</el-dropdown-item>
      <el-dropdown-item @click.native="closeOthersTags">{{
          $t("tagsView.closeOthers")
        }}</el-dropdown-item>
      <el-dropdown-item @click.native="closeAllTags">{{
          $t("tagsView.closeAll")
        }}</el-dropdown-item>
      <el-dropdown-item @click.native="clearCacheTags">{{
          $t("tagsView.clearCache")
        }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { clearCache } from '@/api/user'

export default {
  computed: {
    ...mapGetters(['tagWel', 'tagList', 'tag', 'website']),
    ...mapState({
      showTag: state => state.common.showTag
    })
  },
  methods: {
    showSearch() {
      this.$emit('showSearch')
    },
    clearCacheTags() {
      this.$confirm('是否需要清除缓存?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearCache().then(() => {
          this.contextmenuFlag = false
          this.$message.success('清除完毕')
        })
      })
    },
    closeAllTags() {
      this.contextmenuFlag = false
      this.$store.commit('DEL_ALL_TAG')
      console.log()
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          src: this.tagWel.value
        }),
        query: this.tagWel.query
      })
    },
    closeOthersTags() {
      this.contextmenuFlag = false
      this.$store.commit('DEL_TAG_OTHER')
    }
  }
}
</script>

<style>
</style>
