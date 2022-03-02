<template>
  <div class="management">
    <div class="choice">
      <el-select v-model="value"
                 placeholder="请选择"
                 @change="DataChange"
                 style="float: left">
        <el-option v-for="item in cities"
                   :key="item"
                   :label="item"
                   :value="item">
          <span style="float: left">{{ item }}</span>
        </el-option>
      </el-select>
      <el-button type="primary"
                 @click="newtable"
                 style="float: left">创建新表</el-button>
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

    <el-dialog title="创建新表"
               :visible.sync="CreateTable">
      <el-form :model="dynamicValidateForm"
               ref="dynamicValidateForm"
               label-width="100px"
               class="demo-dynamic">
        <el-form-item prop="email"
                      label="表名"
                      :rules="[
      { required: true, message: '请输入表名', trigger: 'blur' }
    ]">
          <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains"
                      :label="'列名' + index"
                      :key="domain.key"
                      :prop="'domains.' + index + '.value'"
                      :rules="{
      required: true, message: '列名不能为空', trigger: 'blur'
    }">
          <el-input v-model="domain.value"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增列名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
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
import { getCommodity, getCommodityCount, getCommodityIncrease, getCommodityDelete, getCommodityRevise, getCommoditySearch, getTableName, getCreate, getColumnName } from '../api/index'
import { Message } from 'element-ui'
export default {
  name: 'Management',
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      num: 0,
      dialogFormVisible: false,
      dialogFormVisibleRevise: false,
      CreateTable: false,
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
      thisname: '',
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }
    }
  },
  methods: {
    handleClick (i) {
      // console.log(i)
      // console.log(Object.keys(i))
      // console.log(this.tableLabel)
      let m = 0
      this.id = i.id
      for (const n in this.tableLabel) {
        for (var p in i) {
          // console.log()
          // console.log(i[p])
          if (p === this.tableLabel[m]) {
            // console.log(m)
            // console.log(p)
            this.formRevise.name[m] = i[p]
            m++
          }
        }
      }
      this.dialogFormVisibleRevise = true
    },
    deleteClick (i) {
      // console.log(i)
      // console.log(i.id)
      getCommodityDelete({ name: this.value, id: i.id })
        .then((res) => {
          // console.log(res)
          this.getdata(this.value, this.num)
          Message.success('删除成功')
        }).catch((err) => {
          console.log(err)
        })
    },
    Revisedata () {
      // console.log(this.formRevise.name)
      // console.log(this.id)
      getCommodityRevise({ name: this.value, str: this.tableLabel, data: this.formRevise.name, id: this.id })
        .then((res) => {
          // console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      this.getdata(this.value, this.num)
      this.dialogFormVisibleRevise = false
      Message.success('修改成功')
    },
    datasheet () {
      // console.log(this.tableLabel)
      this.dialogFormVisible = true
    },
    newtable () {
      this.CreateTable = true
    },
    adddata () {
      // console.log(this.form.name.length)
      // console.log(this.form.name)
      // let data = this.form.name.join("','")
      let data = ''
      for (const n in this.tableLabel) {
        data = data + "'" + this.form.name[n] + "'" + ','
      }
      data = data.substr(0, data.length - 1)
      const field = this.tableLabel.join(',')
      // console.log(data)
      // console.log(field)
      this.commodityadd(this.value, data, field)
      this.dialogFormVisible = false
    },
    commodityadd (name1, data1, field1) {
      getCommodityIncrease({ name: name1, data: data1, field: field1 })
        .then((res) => {
          // console.log(res)
          // console.log(this.num)
          this.getdata(this.value, this.num)
          Message.success('添加成功')
        }).catch((err) => {
          console.log(err)
        })
    },
    handleCurrentChange (val) {
      // console.log(typeof val)
      // console.log(`当前页: ${val}`)
      const num = (val - 1) * 10
      this.getdata(this.value, num)
      this.num = num
    },
    getdata (name, num) {
      getCommodity({ name: name, num: num })
        .then((res) => {
          // console.log(res)
          this.tableData = res
        }).catch((err) => {
          console.log(err)
        })
      getCommodityCount({ name: name })
        .then((res) => {
          this.sum = parseInt(res[0].counts)
        }).catch((err) => {
          console.log(err)
        })
      getColumnName({ name: name })
        .then((res) => {
          // console.log(res)
          const props = []
          for (const n in res) {
            props[n] = res[n].columnname
          }
          props.splice(props.indexOf('id'), 1)
          // console.log(props)
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
      // console.log(this.value)
      this.getdata(this.value, 0)
      this.num = 0
    },
    // 新增表
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!')
          // console.log(this.dynamicValidateForm.email)
          // console.log(this.dynamicValidateForm.domains)
          let data = ''
          let datas = ''
          for (const d in this.dynamicValidateForm.domains) {
            data = data + this.dynamicValidateForm.domains[d].value + ' varchar(100),'
            datas = datas + this.dynamicValidateForm.domains[d].value + ','
          }
          datas = datas.substr(0, datas.length - 1)
          // console.log(data)
          // console.log(datas)
          await getCreate({ name: this.dynamicValidateForm.email, data: data, datas: datas })
            .then((res) => {
              // console.log(res)
              this.tableData = res
              this.sum = parseInt(this.tableData.length)
              Message.success('创建成功')
            }).catch((err) => {
              console.log(err)
            })
          this.CreateTable = false
          this.value = this.dynamicValidateForm.email
          await getTableName()
            .then((res) => {
              // console.log(res)
              for (const n in res) {
                // console.log(res[n].thisname)
                this.cities[n] = res[n].thisname
              }
              // console.log(this.cities[0])
              this.value = this.cities[0]
            }).catch((err) => {
              console.log(err)
            })
          this.getdata(this.dynamicValidateForm.email, 0)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  },
  created () {
    getTableName()
      .then((res) => {
        // console.log(res)
        for (const n in res) {
          // console.log(res[n].thisname)
          this.cities[n] = res[n].thisname
        }
        // console.log(this.cities[0])
        this.value = this.cities[0]
      }).catch((err) => {
        console.log(err)
      })
    this.getdata('价格', 0)
  }
}
</script>

<style lang="scss" scoped>
.management {
  border: 1px solid #000;
  .choice {
    .search {
      margin-left: 20px;
      width: 180px;
    }
  }
}
</style>
