<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修船项目库</el-breadcrumb-item>
    </el-breadcrumb>
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
        <h3>修船项目列表</h3>
        <table-component
          ref="tableComponent"
          :auth="tableHeight"
          :data="tableData"
          :pagination="listQuery"
          :columns="columns"
          :options="options"
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
import request from '@/utils/request'
export default {
  name: 'RepairList',
  components: { tableComponent },
  data() {
    return {
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      deviceData: [],
      tableData: [],
      tableHeight: '', // 高度
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
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        validFlag: undefined
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
    }

  }
}
</script>
<style scoped lang="scss">
.router-body{
  overflow:hidden;
  .left-side{
    width: 300px;
    float: left;
  }
  .right-side{
    width: 600px;
    float: left;
  }
}

</style>
