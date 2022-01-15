<template>
  <header class="CommonHeader">
    <div class="l-content">
      <el-button plain
                 icon="el-icon-menu"
                 size="mini"
                 @click="handleMenu"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb s>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click"
                   size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg"
               alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('collapseMenu')
    }
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu
    })
  }
}
</script>

<style lang="scss">
.CommonHeader {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .l-content {
    display: flex;
    margin-top: 10px;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    .el-dropdown-link {
      img {
        height: 60px;
        margin-top: 20px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item{
    .el-breadcrumb__inner{
        color: #666;
        font-weight: normal;
    }
    &:last-child{
        .el-breadcrumb__inner{
        color: white;
    }
    }
}
</style>