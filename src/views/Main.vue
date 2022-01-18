<template>
  <div class="Main">
    <el-container>
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header style="height: 100px">
          <CommonHeader></CommonHeader>
        </el-header>
        <ComonTag></ComonTag>
        <!-- <common-tag></common-tag> -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import ComonTag from '../components/CommonTag.vue'
export default {
  name: 'Main',
  components: {
    // HelloWorld
    CommonAside,
    CommonHeader,
    ComonTag
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background: #333;
}
.el-main {
  padding-top: 0;
}
</style>
