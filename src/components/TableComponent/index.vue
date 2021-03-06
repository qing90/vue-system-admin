<template>
  <div class="table">
    <el-table
      id="iTable"
      ref="table"
      v-loading.iTable="options.loading"
      :height="auth"
      :max-height="options.maxHeight"
      :data="data"
      :border="options.border"
      :cell-style="options.cellStyle"
      :stripe="options.stripe"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;" />
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">

        <el-table-column
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
        >

          <template slot-scope="scope">
            <template v-if="column.prop == 'index'">
              <span>{{ scope.$index+1 }}</span>
            </template>
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column
        v-if="operates.list.filter(_x=>_x.show === true).length > 0"
        ref="fixedColumn"
        label="操作"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed"
      >
        <template slot-scope="scope">
          <span v-for="(btn, key) in operates.list" :key="key">
            <el-button
              v-if="btn.btnType=='btn'"
              v-show="(typeof btn.show == 'function')?btn.show(key,scope.row):btn.show"
              style="margin: 0 4px;"
              :type="btn.type"
              :icon="btn.icon"
              size="mini"
              :disabled="(typeof btn.disabled == 'function')?btn.disabled(key,scope.row):btn.disabled"
              :plain="btn.plain"
              @click.native.prevent="btn.method(key,scope.row)"
            >{{ btn.label }}
            </el-button>
            <i
              v-else-if="btn.btnType=='icon'"
              v-show="(typeof btn.show == 'function')?btn.show(key,scope.row):btn.show"
              :class="btn.icon"
              style="margin: 0 4px;cursor: pointer;font-size: 17px;"
              @click="btn.method(key,scope.row)"
            />
          </span>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>

    <el-pagination
      v-if="options.pagination"
      :total="pagination.total"
      :page-sizes="[10, 20, 50]"
      :page-size.sync="pagination.limit"
      :current-page.sync="pagination.page"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      style="margin-top: 15px;text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
    />
  </div>
</template>
<!--endregion-->
<script>
export default {
  // 组件
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => { // 作用渲染视图，相当于template
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  props: {
    // 数据列表
    data: {
      type: Array,
      default() {
        return []
      }
    },
    auth: {
      type: String
    },
    // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
    operates: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Object,
      default() {
        return {
          stripe: true, // 是否为斑马纹 table
          border: true, // 是否边框
          highlightCurrentRow: false // 是否要高亮当前行
        }
      },
      pagination: true
    }, // table 表格的控制参数
    pagination: {
      type: Object,
      default() {
        return {}
      }
    } // 分页
  },
  // 数据
  data() {
    return {
      pageIndex: 1,
      multipleSelection: [] // 多行选中
    };
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    handleRowClick(val) {
      this.$emit('handleRowClick', val)
    },
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size)
    },
    /* 切换页码*/
    handleIndexChange(current) {
      this.$emit('handleIndexChange', current)
    }
  }
};
</script>
<style lang="scss">
  .el-table {
    th {
      background-color: #d5ebfa;
      color: #666;
    }
  }
</style>
