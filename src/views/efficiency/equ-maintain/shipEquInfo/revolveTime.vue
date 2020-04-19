<template>
  <div class="invPage-container">
    <el-form label-width="80px" style="margin-bottom: 20px;">
      <el-row>
        <el-col :span="8" />
      </el-row>
    </el-form>
    <div>
      <table-component
        ref="tableComponent"
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
import tableComponent from '@/components/TableComponent';
export default {
  name: 'Inventory',
  components: { tableComponent },
  data() {
    return {
      invform: {
        fleet: '', // 公司
        ship: '' // 船舶
      },
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
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        validFlag: undefined
      },
      // 需要展示的列
      columns: [
        {
          prop: 'index',
          label: '序号',
          align: 'center',
          width: '80'
        },
        {
          prop: '',
          label: '读数日期',
          align: 'center'
        },
        {
          prop: '',
          label: '总运转时间',
          align: 'center'
        },
        {
          prop: '',
          label: '增加值',
          align: 'center'
        },
        {
          prop: '',
          label: '更新方式',
          align: 'center'
        },
        {
          prop: '',
          label: '操作人',
          align: 'center'
        },
        {
          prop: '',
          label: '操作日期',
          align: 'center'
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
      listData: [{}],
      fleetListOptions: [
        {
          value: '0',
          label: '一'
        }
      ],
      shipListOptions: [
        {
          value: '0',
          label: '二'
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight -
        this.$refs.tableComponent.$refs.table.$el.offsetTop -
        100;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight -
          self.$refs.tableComponent.$refs.table.$el.offsetTop -
          100;
      };
    });
  },
  methods: {

    handleRowClick() {

    },
    handleSelectionChange() {

    },
    handleSizeChange(size) {

    },
    handleIndexChange(page) {

    }
  }
};
</script>

<style scoped>
.invPage-container {
  padding: 30px;
}
.warp-index-foot {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
