<template>
  <el-row class="home"
          :getter="20">
    <el-col :span="8"
            style="margin-top: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg"
               alt="">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-1-8</span></p>
          <p>上次登录地点:<span>中国</span></p>
        </div>
      </el-card>
      <el-card style="height: 470px; margin-top: 10px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip
                           v-for="(val,key) in tableLabel"
                           :key="key"
                           :prop="key"
                           :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover"
                 v-for="item in countData"
                 :key="item.name">
          <i class="icon"
             :class="`el-icon-${item.icon}`"
             :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">￥{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover"
               class="graphon">
        <!-- <div style="height: 250px"
             ref="echart"></div> -->
        <echart :chartData="echartData.order"
                style="height: 250px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <!-- <div style="height: 230px"
               ref="userEchart"></div> -->
          <echart :chartData="echartData.user"
                  style="height: 230px"></echart>
        </el-card>
        <el-card shadow="hover">
          <!-- <div style="height: 220px"
               ref="videoEchart"></div> -->
          <echart :chartData="echartData.video"
                  style="height: 240px"
                  :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import { getHome } from '../../api/data'
// import { getBanner, getUserdata, getVideodata, getOrderdata, getDate } from '../../api/index'
import { getBanner } from '../../api/index'
// import * as echarts from 'echarts'
import Echart from '@/components/ECharts.vue'
export default {
  components: {
    Echart
  },
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '商品',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData () {
      // 111111
      getBanner({ name: 'tabledata' }).then((res) => {
        // console.log(res)
        this.tableData = res
        // console.log(this.tableData)
      })
      // 222222
      getBanner({ name: 'orderdata' }).then((res) => {
        // console.log(res)
        // 折线图的展示
        const order = res
        const keyArray = Object.keys(order[0])
        // 传给组件的值
        // this.echartData.order.xData = order.date
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.map((item) => item[key]),
            type: 'line'
          })
        })
      })
      getBanner({ name: 'date' }).then((res) => {
        // 传给组件的值
        // console.log(res)
        const date = []
        res.forEach((data, i) => {
          // console.log(data.time)
          date[i] = data.time
        })
        this.echartData.order.xData = date
      })
      // 33333
      getBanner({ name: 'userdata' }).then((res) => {
        // 用户图
        this.echartData.user.xData = res.map((item) => item.data)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.map((item) => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.map((item) => item.active),
          type: 'bar'
        })
      })
      // 444444
      getBanner({ name: 'videodata' }).then((res) => {
        // console.log(res.data.data)
        this.echartData.video.series.push({
          data: res,
          type: 'pie'
        })
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home.scss';
</style>
