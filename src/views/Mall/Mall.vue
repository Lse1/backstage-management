<template>
  <div class="mall">
  <Management></Management>
  </div>
</template>

<script>
import Management from '../../components/Management.vue'
export default {
  name: 'Mall',
  components: {
    Management
  },
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      num: 0,
      dialogFormVisible: false,
      dialogFormVisibleRevise: false,
      form: {
        name: []
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
      type: 'Mall'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
