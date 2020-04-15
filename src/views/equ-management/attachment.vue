<template>
  <div class="invPage-container">
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="船队">
            <!-- <el-input v-model="invform.fleet" placeholder="请选择" /> -->
            <el-select v-model="invform.fleet" placeholder="请选择" clearable filterable>
              <el-option
                v-for="item in fleetListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="船舶">
            <!-- <el-input v-model="invform.ship" placeholder="请选择" /> -->
            <el-select v-model="invform.ship" placeholder="请选择" clearable filterable>
              <el-option
                v-for="item in shipListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div style="float:right;">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-refresh">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <el-table
            border
            :data="listData"
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="rowClass"
          >
            <el-table-column type="index" label="序号" width="60px" align="center" />
            <el-table-column prop label="备件名称" align="center" />
            <el-table-column prop label="备件号" align="center" />
            <el-table-column prop label="图纸号" align="center" />
            <el-table-column prop label="规格型号" align="center" />
            <el-table-column prop label="库存数量" align="center" />
          </el-table>
          <div class="warp-index-foot">
            <el-pagination
              background
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              layout="total,prev, pager, next, jumper"
              :total="totalCount"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="库存不足" name="second">
          <el-table
            border
            :data="listData"
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="rowClass"
          >
            <el-table-column type="index" label="序号" width="60px" align="center" />
            <el-table-column prop label="备件名称" align="center" />
            <el-table-column prop label="备件号" align="center" />
            <el-table-column prop label="图纸号" align="center" />
            <el-table-column prop label="规格型号" align="center" />
            <el-table-column prop label="库存数量" align="center" />
          </el-table>
          <div class="warp-index-foot">
            <el-pagination
              background
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              :current-page.sync="currentPage"
              layout="total,prev, pager, next, jumper"
              :total="totalCount"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  data() {
    return {
      activeName: 'first',
      invform: {
        fleet: '', // 船队
        ship: '' // 船舶
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
      ],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    // 表单的内容样式
    cellStyle() {
      return 'color:#787A7D;';
    },
    // 表头的内容样式
    rowClass() {
      return 'background:#CFEEFF;color:#787A7D;font-size: 13px;font-weight:600;';
    },
    // 分页
    handleCurrentChange() {},
    // 切换标签
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
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
