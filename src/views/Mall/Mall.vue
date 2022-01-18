<template>
  <div class="mall">
    <div class="choice">
      <el-select v-model="value"
                 placeholder="请选择"
                 @change="DataChange">
        <el-option v-for="item in cities"
                   :key="item"
                   :label="item"
                   :value="item">
          <span style="float: left">{{ item }}</span>
        </el-option>
      </el-select>
      <el-button type="primary"
                 @click="datasheet">添加数据</el-button>
      <el-input v-model="input"
                placeholder="请输入内容"
                class="search"></el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="searchs">搜索</el-button>
    </div>
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

    <el-dialog title="修改数据"
               :visible.sync="dialogFormVisibleRevise">
      <el-form :model="formRevise">
        <el-form-item v-for="(val,key) in tableLabel"
                      :key="key"
                      :label="val"
                      :label-width="formLabelWidth">
          <el-input v-model="formRevise.name[key]"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleRevise = false">取 消</el-button>
        <el-button type="primary"
                   @click="Revisedata">确 定</el-button>
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
          <el-button @click="deleteClick(scope.row)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="sum"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { getCommodity, getCommodityCount, getCommodityIncrease, getCommodityDelete, getCommodityRevise, getCommoditySearch, getTableName } from '../../api/index'
export default {
  name: 'Mall',
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      num: 0,
      dialogFormVisible: false,
      dialogFormVisibleRevise: false,
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
      formRevise: {
        name: [],
        id: 1
      },
      formLabelWidth: '120px',
      input: '',
      cities: [],
      value: '',
      thisname: ''
    }
  },
  methods: {
    handleClick (i) {
      console.log(i)
      // console.log(Object.keys(i))
      // console.log(this.tableLabel)
      let m = 0
      this.id = i.id
      for (var p in i) {
        // console.log(p)
        // console.log(i[p])
        if (p === this.tableLabel[m]) {
          // console.log(m)
          // console.log(p)
          this.formRevise.name[m] = i[p]
          m++
        }
      }
      this.dialogFormVisibleRevise = true
    },
    deleteClick (i) {
      console.log(i)
      console.log(i.id)
      getCommodityDelete({ name: this.value, id: i.id })
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      this.getdata(this.num)
    },
    Revisedata () {
      // console.log(this.formRevise.name)
      // console.log(this.id)
      getCommodityRevise({ name: this.value, str: this.tableLabel, data: this.formRevise.name, id: this.id })
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      this.getdata(this.num)
      this.dialogFormVisibleRevise = false
    },
    datasheet () {
      // console.log(this.tableLabel)
      this.dialogFormVisible = true
    },
    adddata () {
      // console.log(this.form.name.length)
      // console.log(this.form.name)
      let data = this.form.name.join("','")
      const field = this.tableLabel.join(',')
      data = "'" + data + "'"
      // console.log(data)
      // console.log(field)
      this.commodityadd(this.value, data, field)
      this.dialogFormVisible = false
      this.getdata(this.num)
    },
    commodityadd (name1, data1, field1) {
      getCommodityIncrease({ name: name1, data: data1, field: field1 })
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    },
    handleCurrentChange (val) {
      // console.log(typeof val)
      // console.log(`当前页: ${val}`)
      const num = (val - 1) * 10
      this.getdata(num)
      this.num = num
    },
    async getdata (num) {
      await getCommodityCount({ name: this.value })
        .then((res) => {
          // console.log(res[0].counts)
          this.sum = parseInt(res[0].counts)
          // console.log(this.sum)
        }).catch((err) => {
          console.log(err)
        })
      await getCommodity({ name: this.value, num: num })
        .then((res) => {
          // console.log(res)
          this.tableData = res
          const hc = JSON.parse(JSON.stringify(res))
          const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
          // console.log(props.indexOf('id'))
          // console.log(Object.keys(res))
          props.splice(props.indexOf('id'), 1)
          this.tableLabel = props
        }).catch((err) => {
          console.log(err)
        })
    },
    searchs () {
      if (this.input !== '') {
        // console.log(this.input)
        const field = this.tableLabel.join(',')
        getCommoditySearch({ name: this.value, data: this.input, field: field })
          .then((res) => {
            // console.log(res)
            this.tableData = res
            this.sum = parseInt(this.tableData.length)
          }).catch((err) => {
            console.log(err)
          })
      }
    },
    DataChange () {
      console.log(this.value)
      this.getdata(0)
    }
  },
  created () {
    getTableName()
      .then((res) => {
        console.log(res)
        for (const n in res) {
          // console.log(res[n].thisname)
          this.cities[n] = res[n].thisname
        }
        this.value = this.cities[0]
      }).catch((err) => {
        console.log(err)
      })
    getCommodity({ name: '价格', num: 0 })
      .then((res) => {
        console.log(res)
        this.tableData = res
        const hc = JSON.parse(JSON.stringify(res))
        const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
        props.splice(props.indexOf('id'), 1)
        this.tableLabel = props
      }).catch((err) => {
        console.log(err)
      })
    getCommodityCount({ name: '价格' })
      .then((res) => {
        this.sum = parseInt(res[0].counts)
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.mall {
  border: 1px solid #000;
  .choice {
    .search {
      margin-left: 20px;
      width: 180px;
    }
  }
}
</style>
