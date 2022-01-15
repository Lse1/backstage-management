<template>
  <div class="mall">
    <el-button type="primary"
               @click="datasheet">添加数据</el-button>
    <el-dialog title="添加数据"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="(val,key) in tableLabel"
                      :key="key"
                      :label="val"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name[key]"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="adddata">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column v-for="(val,key) in tableLabel"
                       :key="key"
                       :prop="val"
                       :label="val">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">修改</el-button>
          <el-button type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="sum">
      {{sum}}
    </el-pagination>
  </div>
</template>

<script>
import { getCommodity, getCommodityCount, getCommodityIncrease } from '../../api/index'
export default {
  name: 'Mall',
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      dialogFormVisible: false,
      form: {
        name: [],
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClick (i) {
      console.log(i)
    },
    datasheet () {
      // console.log(this.tableLabel)
      this.dialogFormVisible = true
    },
    adddata () {
      console.log(this.form.name.length)
      console.log(this.form.name)
      const data = this.form.name.join(',')
      // console.log(data)
      this.commodityadd('销售', data)
      this.dialogFormVisible = false
    },
    commodityadd (name1, data1) {
      getCommodityIncrease({ name: name1, data: data1 })
        .then((res) => {
          console.log('添加成功')
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    getCommodity({ name: '销售' })
      .then((res) => {
        // console.log(res)
        this.tableData = res
        const hc = JSON.parse(JSON.stringify(res))
        const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
        // console.log(props.indexOf('id'))
        // console.log(props)
        props.splice(props.indexOf('id'), 1)
        this.tableLabel = props
      }).catch((err) => {
        console.log(err)
      })
    // getCommodity({ name: '销售' })
    //   .then((res) => {
    //     // console.log(res)
    //     const props = Object.keys(res.reduce((o, c) => Object.assign(o, c)))
    //     console.log(props)
    //     this.tableLabel = props
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    getCommodityCount({ name: '销售' })
      .then((res) => {
        // console.log(res[0].counts)
        this.sum = parseInt(res[0].counts)
        // console.log(this.sum)
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.mall {
  border: 1px solid #000;
}
</style>
