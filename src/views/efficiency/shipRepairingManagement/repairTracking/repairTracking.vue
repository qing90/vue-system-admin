<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修理跟踪</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="船舶：" label-width="60px" prop="shipCode">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :lg="5">
            <el-form-item label="修理单号：" label-width="90px" prop="repairNo" style="margin-left: 5;">
              <el-input v-model="listQuery.repairNo" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :md="6" :lg="5">
            <el-form-item label="修理类别：" label-width="90px" prop="shipType" style="margin-left: 5;">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="24" :lg="6">
            <el-button type="primary" @click="handleSearch">查 询</el-button>
            <el-button type="default" icon="el-icon-refresh-right" @click="resetFn">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container">
      <div class="opt">
        <el-button plain type="default" icon="el-icon-download" class="btn-plain-success" @click="handleExport">导 出</el-button>
      </div>
      <table-component
        ref="tableComponent"
        :height="tableHeight"
        :data="tableData"
        :options="options"
        :pagination="listQuery"
        :columns="columns"
        :operates="operates"
        @handleRowClick="handleRowClick"
        @handleSelectionChange="handleSelectionChange"
        @handleIndexChange="handleIndexChange"
        @handleSizeChange="handleSizeChange"
      />
    </div>

  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent'
import { queryCountry, exportCountry } from '@/api/country'
import { getShipRepairpplyList } from '@/api/shipRepair/repairList'
import { parseDsErrorMessage } from '@/utils/responseUtil'
export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,

      conditionList: [{
        name: 'countryCode',
        operator: '',
        value: ''
      }],
      radio: '1',
      nameList: [{
        label: '国家/地区代码',
        value: 'countryCode'
      }, {
        label: '国家/地区中文名',
        value: 'countryNameZh'
      }, {
        label: '国家/地区英文名',
        value: 'countryNameEn'
      }, {
        label: '是否有效',
        value: 'validFlag'
      }, {
        label: '创建人',
        value: 'creator'
      }],
      shipTypeList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      operatorsList: ['=', '!=', '>', '>=', '<', '<=', '包含', '介于', '不包含', '从属于'],
      validList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      validFlagList: [{ label: '生效', value: true }, { label: '失效', value: false }],
      tableData: [],
      tableHeight: '', // 高度
      // table 的参数
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
      },
      // 需要展示的列
      columns: [
        {
          prop: 'index',
          label: 'No',
          align: 'center',
          width: '30'
        },
        {
          prop: 'shipCode',
          label: '修理单号',
          align: 'center'
        },
        {
          prop: 'applyNo',
          label: '修理类别'
        },
        {
          prop: 'repairType',
          label: '维修厂商'
        },
        {
          prop: 'planRepairDate',
          label: '修理开始日期',
          align: 'center'
        },
        {
          prop: 'lastRepairDate',
          label: '修理结束日期',
          align: 'center'
        },
        {
          prop: 'proposer',
          label: '修理天数'
        },
        {
          prop: 'applyDate',
          label: '申请日期'
        }
      ],
      // 列操作按钮
      operates: {
        list: [
          {
            id: '1',
            label: '详情跟踪',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.trackingDetail(row);
            }
          }
        ],
        fixed: false,
        width: 230
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        validFlag: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        shipCode: '',
        applyNo: '',
        repairType: '',
        planRepairDate: '',
        lastRepairDate: '',
        proposer: '',
        applyDate: ''
      }
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.tableComponent.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.tableComponent.$refs.table.$el.offsetTop - 100
      }
    })
  },
  methods: {
    /* 重置 */
    resetConditionForm() {
      this.conditionList = [{
        name: '',
        operator: '',
        value: ''
      }]
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false
    },
    /* 更多条件 */
    addCondition(item, index) {
      if (index >= 4) {
        this.$message({
          message: '最多5个条件',
          type: 'warning'
        })
        return false
      }
      const subObj = {
        name: '',
        operator: '',
        value: ''
      }
      this.conditionList.push(subObj)
    },
    removeCondition(item, index) {
      if (this.conditionList.length === 1) {
        return this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        })
      }
      this.conditionList.splice(index, 1)
    },
    conditionSearch() {
      const data = {}
      for (const item of this.conditionList) {
        if (item.value) {
          data[item.name] = item.value
        }
      }
      data.page = 1
      data.limit = this.listQuery.limit
      this.dialogConditionVisible = false
      queryCountry(data).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.listQuery.total = parseInt(res.data.totalRecord)
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 查询方法
    handleSearch() {
      this.listQuery.page = 1
      this.searchFn();
    },
    // 查询事件
    searchFn() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      getShipRepairpplyList(data).then(res => {
        if (res.success) {
          this.tableData = res.data.records;
          this.listQuery.total = parseInt(res.data.totalRecord)
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 重置 */
    resetFn() {
      this.$refs.filter.resetFields()
    },
    /* 导出 */
    handleExport() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      exportCountry(data)
    },
    handleRowClick() {

    },
    handleSelectionChange() {

    },
    handleSizeChange(size) {
      this.listQuery.limit = size
      this.searchFn()
    },
    handleIndexChange(page) {
      this.listQuery.page = page
      this.searchFn()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },

    trackingDetail(row) {
      this.$router.push({
        path: '/trackingDetail'
        // query: {
        //   showType: "add"
        // }
      });
    }

  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .breadcrumb{
    margin-bottom: 20px;
  }
}
.filter-container{

  .el-form-item{
    margin-bottom: 0px;
    /deep/.el-form-item__label{
      padding-right:0px
    }
  }
}
.table-container{
  .opt{
    text-align: right;
    margin-bottom: 10px;
  }
}
.opt-panel{
  i{
    font-size:36px;
    color: #bbb;
    cursor: pointer;
    margin-right: 4px;
    &:hover{
      color: #999 ;
    }
  }
}

</style>
