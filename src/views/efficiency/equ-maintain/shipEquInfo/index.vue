<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备保养体系</el-breadcrumb-item>
      <el-breadcrumb-item>船舶设备信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司">
              <el-select v-model="shipform.company" placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in companyListOptions"
                  :key="item.id"
                  :label="item.pmDicNameCn"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船舶">
              <el-select v-model="shipform.ship" placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in shipListOptions"
                  :key="item.id"
                  :label="item.pmDicNameCn"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备名称">
              <el-input v-model="shipform.devNam" placeholder="请输入内容" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <div style="float:right;">
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button icon="el-icon-refresh" @click="resetDate">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="line" />
    <div class="router-body">
      <div class="left-side">
        <el-tree :data="shipData" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }" >
            <span>{{ node.label }}</span>
            <span >
              <el-button type="text" size="mini" @click="() => append(data)">增加</el-button>
            </span>
          </span>-->
        </el-tree>
      </div>
      <div class="center-side">
        <div style="padding: 10px 30px 20px 30px;">
          <el-button type="primary" round @click="goToAppList">申请单列表</el-button>
        </div>
        <div>
          <el-form label-width="110px">
            <el-row>
              <el-col :span="15">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="设备编码">
                      <el-input v-model="shipform.devCode" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="设备名称">
                      <el-input v-model="shipform.devNameCn" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="英文名称">
                      <el-input v-model="shipform.devNameEn" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="9">
                <img src="./code.png" class="center-right-code" />
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-form label-width="110px">
            <el-row>
              <el-col :span="15">
                <el-form-item label="设备型号">
                  <el-input v-model="shipform.devModel" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="序列号">
                  <el-input v-model="shipform.devSerialNo" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="制造商">
                  <el-input v-model="shipform.devMakerName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产日期">
                  <el-date-picker
                    v-model="shipform.devProductDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人">
                  <el-select v-model="shipform.responMan" placeholder="请选择">
                    <el-option
                      v-for="item in responManList"
                      :key="item.id"
                      :label="item.pmDicNameCn"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备大类">
                  <el-select v-model="shipform.equipmentClass" placeholder="请选择">
                    <el-option
                      v-for="item in equipmentClassList"
                      :key="item.id"
                      :label="item.pmDicNameCn"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检验编码">
                  <el-input v-model="shipform.surveyCode" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="设备运转时间">
                  <el-input v-model="shipform.timerTotal" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  circle
                  style="margin-left: 10px;"
                  @click="moveTimeShow"
                />
              </el-col>
              <el-col :span="12">
                <el-form-item label="安全设备">
                  <el-switch v-model="shipform.safetyFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="重要设备">
                  <el-switch v-model="shipform.keyFlag" />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="button-flex">
                <el-button type="primary" round plain @click="workShow">工作卡（0）</el-button>
                <el-button type="primary" round plain @click="spareShow">备件（0）</el-button>
              </el-col>
              <el-col :span="24" class="button-flex">
                <el-button type="primary" round plain>设备故障（0）</el-button>
                <el-button type="primary" round plain>设备记录簿（0）</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="button-save">
          <el-button type="primary">投放</el-button>
          <el-button type="primary" style="margin-left: 30px;" @click="updateInfo">保存</el-button>
        </div>
        <div class="button-topClass">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="低于安全库存备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="申请中备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="关键备件/高价值备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="right-side">
        <div class="right-side-padding">
          <div class="right-side-flex">
            <span class="right-side-leftText">产品信息</span>
            <span class="right-side-rightText" @click="proInfoShow('1')">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-pro">产品名称：</div>
            <div class="right-side-pro">产品型号：</div>
            <div class="right-side-pro">制造商：</div>
            <div class="right-side-pro">设备类别：</div>
          </div>
        </div>
        <div class="right-side-padding padding-top">
          <div class="right-side-flex">
            <span class="right-side-leftText">维修专业参数</span>
            <span class="right-side-rightText" @click="proInfoShow('2')">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-pro">排烟温度：</div>
            <div class="right-side-pro">发火顺序：</div>
          </div>
        </div>
        <div class="right-side-padding padding-top">
          <div class="right-side-flex">
            <span class="right-side-leftText">技术档案</span>
            <span class="right-side-rightText" @click="proInfoShow('3')">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-rightText breadcrumb">设备说明书.pdf</div>
            <div class="right-side-rightText">设备图纸.jpg</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 更多 -->
    <el-dialog :title="moreTitles" :visible.sync="dialogProVisible" />
    <!-- 工作卡 -->
    <el-dialog title="工作卡清单" :visible.sync="dialogWorkVisible" width="80%">
      <div>
        <el-form label-width="80px" style="margin-bottom: 20px;">
          <el-row>
            <el-col :span="8">
              <el-button icon="el-icon-plus" class="btn-plain-primary" plain>添加</el-button>
            </el-col>
          </el-row>
        </el-form>
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
    </el-dialog>
    <!-- 工作卡新增 -->
    <el-dialog title="新增工作信息" :visible.sync="dialogWorkAddVisible" />
    <!-- 备件清单 -->
    <el-dialog title="备件清单" :visible.sync="dialogSpareVisible" width="80%">
      <div>
        <el-button type="primary" plain>已选备件（0）</el-button>
        <el-button type="primary" plain>提交申请</el-button>
        <el-button type="primary" plain>添加</el-button>
      </div>
      <el-row>
        <el-col :span="5">
          <el-table :data="drawingData" style="width: 100%;margin-top: 15px">
            <el-table-column prop="partsDrawingNum" label="图纸" align="center">
              <template slot-scope="scope">
                <span
                  style="cursor: pointer;color:#409EFF;"
                  @click="gotoDetail(scope.row)"
                >{{ scope.row.partsDrawingNum }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="14">
          <div style="width: 100%;padding:15px 20px">
            <table-component
              ref="tableComponent"
              :data="drawingDataList"
              :options="drawingOptions"
              :pagination="drawingListQuery"
              :columns="drawingColumns"
              :operates="drawingOperates"
              @handleRowClick="handleRowClick"
              @handleSelectionChange="handleSelectionChange"
              @handleIndexChange="handleIndexChange"
              @handleSizeChange="handleSizeChange"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <div class="spareClass">
            <img src="./spare.png" alt />
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 运转时间 -->
    <el-dialog title="运转时间" :visible.sync="dialogMovetimeVisible" width="80%">
      <div class="moveTitle">所属计时器</div>
      <div class="moveClass">
        <el-form label-width="80px" style="margin-bottom: 20px;">
          <el-row>
            <el-col :span="16">
              <el-form-item label="计时器">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="启用日期">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="读数日期">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="表值">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="moveTime-but">
                <el-button type="primary">取消关联</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="moveTitle">设备运转时间</div>
      <div class="moveClass">
        <el-form label-width="120px" style="margin-bottom: 20px;">
          <el-row>
            <el-col :span="8">
              <el-form-item label="启用日期">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="读数日期">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总运转时间">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="大修后运转时间">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平均运转时间">
                <el-input v-model="moveform.timer" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="moveTime-but">
                <el-button type="primary">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="moveTitle">设备运转时间更新记录</div>
      <table-component
        ref="tableComponent"
        :data="moveData"
        :options="moveOptions"
        :pagination="moveListQuery"
        :columns="moveColumns"
        :operates="moveOperates"
        @handleRowClick="handleRowClick"
        @handleSelectionChange="handleSelectionChange"
        @handleIndexChange="handleIndexChange"
        @handleSizeChange="handleSizeChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import tableComponent from "@/components/TableComponent";
import {
  queryResponManList,
  queryEquipmentList,
  queryCompanyList,
  queryShipList,
  queryTree,
  querySingleInfo,
  updateInfo,
  querySpareDrawing,
  gotoDetail
} from "@/api/shipEquInfo";
export default {
  components: { tableComponent },
  data() {
    return {
      pmDevInfoId:"",
      responManList: [
        {
          label: "测试责任人",
          value: "1"
        }
      ], // 责任人下拉
      equipmentClassList: [
        {
          label: "测试大类",
          value: "1"
        }
      ], // 设备大类列表
      // 列表
      tableData: [],
      drawingData: [], // 备件清单图纸
      drawingDataList: [], // 备件图纸列表
      moveData: [], // 运转记录
      // 工作卡开始
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        pagination: true
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: "",
        countryNameZh: "",
        countryNameEn: "",
        validFlag: undefined
      },
      columns: [
        {
          prop: "index",
          label: "序号",
          align: "center",
          width: "80"
        },
        {
          prop: "",
          label: "工作标题",
          align: "center"
        },
        {
          prop: "",
          label: "工作类型",
          align: "center"
        },
        {
          prop: "",
          label: "负责岗位",
          align: "center"
        },
        {
          prop: "",
          label: "定期周期",
          align: "center"
        },
        {
          prop: "",
          label: "定时周期",
          align: "center"
        },
        {
          prop: "",
          label: "上次保养日期",
          align: "center"
        },
        {
          prop: "",
          label: "检验编码",
          align: "center"
        },
        {
          prop: "",
          label: "是否有效",
          align: "center"
        },
        {
          prop: "",
          label: "是否标准工作",
          align: "center"
        }
      ],
      operates: {
        list: [],
        fixed: false,
        width: 230
      },
      // 备件清单
      drawingOptions: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        pagination: true
      },
      drawingListQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: "",
        countryNameZh: "",
        countryNameEn: "",
        validFlag: undefined
      },
      drawingOperates: {
        list: [
          {
            id: "1",
            label: "加入申请",
            type: "primary",
            show: true,
            icon: "el-icon-edit-outline",
            plain: false,
            disabled: false,
            btnType: "icon",
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: "1",
            label: "库存动态",
            type: "primary",
            show: true,
            icon: "el-icon-edit-outline",
            plain: false,
            disabled: false,
            btnType: "icon",
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: "3",
            label: "删除",
            type: "danger",
            icon: "el-icon-delete",
            show: true,
            plain: false,
            disabled: false,
            btnType: "icon",
            method: (index, row) => {
              this.handleDelete(row);
            }
          }
        ],
        fixed: false,
        width: 230
      },
      drawingColumns: [
        {
          prop: "index",
          label: "序号",
          align: "center",
          width: "80"
        },
        {
          prop: "partsNameCn",
          label: "备注名称",
          align: "center"
        },
        {
          prop: "partsCode",
          label: "备件号",
          align: "center"
        },
        {
          prop: "partsDrawingNum",
          label: "图纸号",
          align: "center"
        },
        {
          prop: "partsSpecification",
          label: "规格型号",
          align: "center"
        },
        {
          prop: "",
          label: "库存数量",
          align: "center"
        },
        {
          prop: "partsUnit",
          label: "单位",
          align: "center"
        }
      ],
      // 运转时间
      moveOptions: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
      },
      moveListQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: "",
        countryNameZh: "",
        countryNameEn: "",
        validFlag: undefined
      },
      moveOperates: {
        list: [
          {
            id: "1",
            label: "编辑",
            type: "primary",
            show: true,
            icon: "el-icon-edit-outline",
            plain: false,
            disabled: false,
            btnType: "icon",
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "danger",
            icon: "el-icon-delete",
            show: true,
            plain: false,
            disabled: false,
            btnType: "icon",
            method: (index, row) => {
              this.handleDelete(row);
            }
          }
        ],
        fixed: false,
        width: 230
      },
      moveColumns: [
        {
          prop: "index",
          label: "序号",
          align: "center",
          width: "80"
        },
        {
          prop: "",
          label: "读数日期",
          align: "center"
        },
        {
          prop: "",
          label: "总运转时间",
          align: "center"
        },
        {
          prop: "",
          label: "增加值",
          align: "center"
        },
        {
          prop: "",
          label: "更新方式",
          align: "center"
        },
        {
          prop: "",
          label: "操作人",
          align: "center"
        },
        {
          prop: "",
          label: "操作日期",
          align: "center"
        }
      ],

      checkStrictly: false, // 左边树状图
      dialogProVisible: false, // 更多
      dialogWorkVisible: false, // 工作卡
      dialogWorkAddVisible: false, // 工作卡新增
      dialogSpareVisible: false, // 备件
      dialogMovetimeVisible: false, // 运转时间
      moreTitles: "",
      shipData: [],
      shipform: {
        company: "", //公司
        ship: "", //船舶
        devNam: "", //设备名称
        devCode: "", //设备编码
        devNameCn: "", //设备名称中文
        devNameEn: "", //设备名称英文
        devModel: "", //设备型号
        devSerialNo: "", //设备序列号
        devMakerName: "", //设备制造商
        devProductDate: "", //生产日期
        responMan: "", //责任人
        equipmentClass: "", //设备大类
        safetyFlag: true, //安全设备
        keyFlag: true, //重要设备
        surveyCode: "", //检验编码
        timerTotal: "" //运转时间
      },
      moveform: {
        timer: ""
      },
      companyListOptions: [],
      shipListOptions: [],
      defaultProps: {
        children: "next",
        label: "devNameCn"
      }
    };
  },
  created() {
    //this.queryResponMan();
    //this.queryEquipmentClassList();
    // this.queryShipList();
    // this.queryCompanyList();
    //树状图
    this.queryTree();
  },
  methods: {
    //树状图
    queryTree() {
      const data = "123456";
      queryTree(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.shipData = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          this.shipData = [
            {
              id: 1,
              devNameCn: "空气系统",
              deviceType: "1",
              next: [
                {
                  id: 2,
                  devNameCn: "启动空气系统",
                  deviceType: "1-1",
                  next: [{ id: 3, deviceType: "1-1-1", devNameCn: "空压机" }]
                },
                { id: 4, devNameCn: "控制空气系统", deviceType: "1-2" }
              ]
            },
            { id: 5, devNameCn: "主机", deviceType: "2" },
            {
              id: 6,
              devNameCn: "副机系统",
              deviceType: "3",
              next: [{ id: 7, devNameCn: "副机", deviceType: "1-1" }]
            }
          ];
        });
    },
    //点击树状查详情
    handleNodeClick(data) {
      console.log(data);
      let id = data.id;
      let parentId = data.parentId;
      if (parentId) {
        console.log("000000");
        querySingleInfo(id)
          .then(res => {
            // 请求成功返回
            if (res.success) {
              this.shipform = res.data;
              this.pmDevInfoId = data.id;
            }
          })
          .catch(err => {
            // 请求错误返回
          });
      }
    },
    //保存修改设备详情
    updateInfo() {
      let data = {
        pmDevInfoId:this.pmDevInfoId,
        devCode: this.shipform.devCode,
        devNameCn: this.shipform.devNameCn,
        devNameEn: this.shipform.devNameEn,
        devModel: this.shipform.devModel,
        devSerialNo: this.shipform.devSerialNo,
        devMakerName: this.shipform.devMakerName,
        devProductDate: this.shipform.devProductDate,
        responMan: this.shipform.responMan,
        equipmentClass: this.shipform.equipmentClass,
        safetyFlag: this.shipform.safetyFlag,
        keyFlag: this.shipform.keyFlag,
        surveyCode: this.shipform.surveyCode,
        timerTotal: this.shipform.timerTotal
      };
      updateInfo(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.$message({ message: "成功", type: "success" });
          }
        })
        .catch(err => {
          // 请求错误返回
          // this.$message({ message: "查询失败", type: "error" });
        });
    },
    //查询备件图纸
    querySpareDrawing() {
      const data = this.pmDevInfoId;
      querySpareDrawing(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.drawingData = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          this.drawingData = [
            {
              pmDevInfoId: "123",
              partsDrawingNum: "备件图纸1"
            }
          ];
        });
    },
    //查询备件列表
    gotoDetail(row) {
      let pmDevInfoId = row.pmDevInfoId;
      let partsDrawingNum = row.partsDrawingNum;
      gotoDetail(pmDevInfoId,partsDrawingNum)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.drawingDataList =  res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          this.drawingDataList =  [
            {
              "partsNameCn":"中文",
              "partsNameEn":"英文",
              "partsCode":"备件号",
            }
          ]
        });
    },
    //增加设备
    append(data) {
      console.log("增加");
      console.log(data);
    },
    //重置
    resetDate() {
      this.shipform = {
        company: "", //公司
        ship: "", //船舶
        devNam: "" //设备名称
      };
    },
    // 去申请单列表
    goToAppList() {
      this.$router.push({ path: "applyList" });
    },
    // 更多弹窗
    proInfoShow(num) {
      this.dialogProVisible = true;
      if (num == "1") {
        this.moreTitles = "产品信息";
      } else if (num == "2") {
        this.moreTitles = "维修专业参数";
      } else {
        this.moreTitles = "技术档案";
      }
    },
    // 工作卡
    workShow() {
      this.dialogWorkVisible = true;
    },
    // 备件
    spareShow() {
      this.dialogSpareVisible = true;
      this.querySpareDrawing();
    },
    // 运转时间
    moveTimeShow() {
      this.dialogMovetimeVisible = true;
    },
    // 列表
    handleRowClick() {},
    handleSelectionChange() {},
    handleSizeChange(size) {},
    handleIndexChange(page) {},
    // 查询负责人列表
    queryResponMan() {
      const data = {};
      queryResponManList(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.responManList = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          // this.$message({ message: "查询失败", type: "error" });
        });
    },
    // 查询设备大类
    queryEquipmentClassList() {
      const data = {};
      queryEquipmentList(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.equipmentClassList = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          // this.$message({ message: "查询失败", type: "error" });
        });
    },
    //公司下拉
    queryCompanyList() {
      const data = {};
      queryCompanyList(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.companyListOptions = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          // this.$message({ message: "查询失败", type: "error" });
        });
    },
    //船舶下拉
    queryShipList() {
      const data = {};
      queryShipList(data)
        .then(res => {
          // 请求成功返回
          if (res.success) {
            this.shipListOptions = res.data;
          }
        })
        .catch(err => {
          // 请求错误返回
          // this.$message({ message: "查询失败", type: "error" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .breadcrumb {
    margin-bottom: 20px;
  }
  .line {
    border-top: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .router-body {
    overflow: hidden;
    .left-side {
      width: 20%;
      float: left;
    }
    .center-side {
      width: 50%;
      float: left;
      border-left: 1px solid #ccc;
      padding: 10px;

      .center-right-code {
        width: 120px;
        height: 120px;
        margin-left: 50px;
      }

      .button-flex {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
      }
      .button-save {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      .button-topClass {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
      }
    }
    .right-side {
      width: 30%;
      float: left;
      padding: 10px;
      .right-side-padding {
        padding: 10px;
        height: 250px;
        border: 1px solid #ccc;
      }
      .padding-top {
        margin-top: 30px;
      }
      .right-side-flex {
        justify-content: space-between;
        display: flex;
      }
      .right-side-leftText {
        color: #606266;
        font-size: 14px;
      }
      .right-side-rightText {
        color: #1890ff;
        font-size: 14px;
        cursor: pointer;
      }
      .right-side-pro {
        color: #606266;
        font-size: 16px;
        margin-top: 15px;
      }
    }
  }
  .spareClass {
    padding: 5px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
  }
  .moveTitle {
    margin-bottom: 10px;
    font-size: 16px;
    color: #1890ff;
  }
  .moveClass {
    border: 1px solid #ccc;
    padding: 20px 10px 10px 10px;
    margin-bottom: 15px;
    .moveTime-but {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
