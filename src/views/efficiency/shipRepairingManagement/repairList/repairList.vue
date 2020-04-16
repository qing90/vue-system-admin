<template>
  <div class="app-container">
    <div>
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>修船管理</el-breadcrumb-item>
        <el-breadcrumb-item>修船项目库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="router-body">
      <div class="left-side">
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="deviceData"
          :props="defaultProps"
          node-key="deviceType"
          class="permission-tree"
        />
      </div>
      <div class="right-side">
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
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      deviceData: [],
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
          prop: 'projectCode',
          label: '项目编号',
          align: 'center',
          width: '150'
        },
        {
          prop: 'projectName',
          label: '项目名称'
        },
        {
          prop: 'jobDescription',
          label: '工作描述'
        },
        {
          prop: 'unit',
          label: '单位'
        },
        {
          prop: 'remark',
          label: '备注'
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
    this.deviceData = [{
      label: '散货船',
      deviceType: '1',
      children: [{
        label: '主机',
        deviceType: '1-1',
        children: [{
          deviceType: '1-1-1',
          label: '三级 1-1-1'
        }]
      },
      {
        label: '船体',
        deviceType: '1-2',
        children: [{
          deviceType: '1-2-1',
          label: '三级 1-2-1'
        }]
      }
      ]
    }, {
      label: '集装箱船',
      deviceType: '2',
      children: [{
        label: '主机',
        deviceType: '2-1',
        children: [{
          deviceType: '2-1-1',
          label: '三级 2-1-1'
        }]
      }, {
        label: '船体',
        deviceType: '2-2',
        children: [{
          label: '三级 2-2-1',
          deviceType: '2-2-1'
        }]
      }]
    }, {
      label: '油轮',
      deviceType: '3',
      children: [{
        label: '主机',
        deviceType: '3-1',
        children: [{
          label: '三级 3-1-1',
          deviceType: '3-1-1'
        }]
      }, {
        label: '船体',
        deviceType: '3-2',
        children: [{
          label: '三级 3-2-1',
          deviceType: '3-2-1'
        }]
      }]
    }];
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

.router-body{
  overflow:hidden;
  .left-side{
    width: 20%;
    float: left;
  }
  .right-side{
    width: 75%;
    float: left;
  }
}

</style>
