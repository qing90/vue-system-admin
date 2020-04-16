<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修理遗留记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="船舶：" label-width="60px" prop="countryCode">
              <el-select v-model="listQuery.validFlag" placeholder="请选择">
                <el-option v-for="(item,index) in validList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-form-item label="项目编号" label-width="80px" prop="countryNameZh" style="">
              <el-input v-model="listQuery.countryNameZh" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-form-item label="项目名称" label-width="80px" prop="countryNameEn">
              <el-select v-model="listQuery.validFlag" placeholder="请选择">
                <el-option v-for="(item,index) in validList" :key="index" :label="item.name" :value="item.value" />
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
import { queryCountry, exportCountry, deleteCountry } from '@/api/country'
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
      validList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
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
          label: 'No.',
          align: 'center',
          width: '50px'
        },
        {
          prop: 'countryCode',
          label: '船舶',
          align: 'center'
        },
        {
          prop: 'countryNameZh',
          label: '项目编号'
        },
        {
          prop: 'countryNameEn',
          label: '项目名称'
        },
        {
          prop: 'index',
          label: '工作描述',
          align: 'center'
        },
        {
          prop: 'countryCode',
          label: '修理设备',
          align: 'center'
        },
        {
          prop: 'countryNameZh',
          label: '数量'
        },
        {
          prop: 'countryNameEn',
          label: '单位'
        }
      ],
      // 列操作按钮
      operates: {
        list: [
          {
            id: '1',
            label: '编辑',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            show: true,
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleDelete(row)
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
      textMap: {
        update: '编辑',
        create: '添加'
      },
      temp: {
        id: undefined
      },
      rules: {
        countryCode: [{
          required: true,
          message: '不能为空'
        }],
        countryNameZh: [{
          required: true,
          message: '不能为空'
        }],
        countryNameEn: [{
          required: true,
          message: '不能为空'
        }],
        validFlag: [{
          required: true,
          message: '请选择状态'
        }]
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
      this.searchFn()
    },
    // 查询事件
    searchFn() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
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

    handleDelete(row) {
      deleteCountry({ id: row.id }).then(() => {
        this.searchFn();
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
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
.form-dialog{

  .form-dialog-header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    .header-title{
      font-size: 16px;
      color: #666;
      float: left;
    }
    .header-opt{
       float: right;
    }
  }
  .dialog-form{
    background: #f5faff;
    padding: 20px 20px 0 20px;
    .el-form-item{
      /deep/.el-form-item__label{
        padding-right: 0;
      }
    }
    .form-title{

      position: relative;
      padding: 0 20px 10px;
      margin-bottom: 20px;
      &::before{
        content: '';
        width: 100%;
        height: 2px;
        background: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      span{
        font-size: 14px;
        color:#999;
        position: relative;
        &::before{
          content: '';
          width: 50%;
          position: absolute;
          height: 2px;
          bottom: -10px;
          background: #61b0ff;
          transform: translateX(50%);
        }
      }
    }
  }
}

</style>
