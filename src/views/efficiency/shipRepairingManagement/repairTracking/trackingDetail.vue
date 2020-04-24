<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修船申请</el-breadcrumb-item>
      <el-breadcrumb-item>修船详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="table-container">
      <el-tabs v-model="activeName1" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="jbxx">
          <div calss="jbxx_1">
            <el-form ref="dataForm" label-position="left">
              <el-row :gutter="10">
                <el-col :span="7">
                  <el-form-item label="船舶名称：" label-width="120px" prop="shipCode">
                    <el-select v-model="temp.shipCode" placeholder="请选择">
                      <el-option
                        v-for="(option,sindex) in validFlagList"
                        :key="sindex"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="修理订单号" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="状态:" label-width="120px" prop="repairType">
                    <el-select v-model="temp.repairType" placeholder="请选择">
                      <el-option
                        v-for="(option,sindex) in validFlagList"
                        :key="sindex"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7">
                  <el-form-item label="修理类别:" label-width="120px" prop="repairType">
                    <el-select v-model="temp.repairType" placeholder="请选择">
                      <el-option
                        v-for="(option,sindex) in validFlagList"
                        :key="sindex"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="在建工程号：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="监修：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7">
                  <el-form-item label="折前金额：" label-width="120px" prop="planRepairDate">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="币种：" label-width="120px" prop="lastRepairDate">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="汇率:" label-width="120px" prop="countryNameEn">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7">
                  <el-form-item label="总价折扣：" label-width="120px" prop=".planRepairDate">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="折后金额：" label-width="120px" prop="lastRepairDate">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="折后金额（本币）:" label-width="120px" prop="countryNameEn">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="20">
                  <el-form-item label="备注:" label-width="120px" prop="countryNameEn">
                    <el-input
                      v-model="temp.countryNameEn"
                      type="textarea"
                      :rows="3"
                      style="width: 70%;"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div id="jbxx-2" calss="jbxx_2">
            <el-form ref="dataForm" label-position="left">
              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="21" style=" margin:5px; ">
                  <el-form-item label="船厂名称：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="联系人1：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="电话号码：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="邮箱：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="联系人2：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="电话号码：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="邮箱：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div id="jbxx-3" calss="jbxx_3">
            <el-form ref="dataForm" label-position="left">
              <el-row :gutter="10" style=" margin-left:10px; margin:5px;">
                <el-col :span="7">
                  <el-form-item label="租家换船日期：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="计划抵厂日期：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="锚泊时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="计划进坞日期：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="计划出坞日期：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="计划完工日期：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="进坞时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="出坞时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="完工时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="计划工作天数(码头)：" label-width="150px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="计划工作天数(坞内)：" label-width="150px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="总计划修理天数：" label-width="150px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="7">
                  <el-form-item label="工作天数(码头)：" label-width="150px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="工作天数(坞内)：" label-width="150px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="总修理天数：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div id="jbxx-4" calss="jbxx_4">
            <el-form ref="dataForm" label-position="left">
              <el-row :gutter="10" style=" margin-left:10px; margin:5px;">
                <el-col :span="6">
                  <el-form-item label="航次：" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="航次开始时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="锚航次结束时间：" label-width="120px" prop="shipCode">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="6">
                  <el-form-item label="起始HSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HSFO供应量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束HSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HSFO消耗量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="6">
                  <el-form-item label="起始LSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="LSFO供应量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束LSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="LSFO消耗量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="6">
                  <el-form-item label="起始MGO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="MGO供应量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束MGO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="MGO消耗量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="6">
                  <el-form-item label="起始MDO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="MDO供应量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束MDO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="MDO消耗量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style=" margin-left:10px; ">
                <el-col :span="6">
                  <el-form-item label="起始HSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HSFO供应量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束HSFO存量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HSFO消耗量(MT)" label-width="150px" prop="shipCode" text-align="justify">
                    <el-input v-model="temp.countryNameEn" />
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="船厂计划/每日报告" name="ccjh">
          <table-component
            ref="审批记录"
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
        </el-tab-pane>

        <el-tab-pane label="修理项目" name="xlxm_one">
          <div class="router-body">
            <div class="left-side">
              <el-table
                ref="table"
                :data="repairWorkList"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column prop="engineering" label="修理工程" />
              </el-table>
            </div>
            <div class="right-side">
              <el-table
                ref="table"
                :data="projectData"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
                @selection-change="selectRow"
              >
                <el-table-column type="selection" width="45" align="center" />
                <el-table-column label="序号" type="index" width="60" align="center" />
                <el-table-column label="项目编号" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="工作描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" type="textarea" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="修理设备">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="数量单位">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="材料或者备件需求描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="...">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="追加修理项目" name="zjxlxm">
          <div class="zjxlxm_1">
            <div class="left-side">
              <el-table
                ref="table"
                :data="projectData"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
                @selection-change="selectRow"
              >
                <el-table-column type="selection" width="45" align="center" />
                <el-table-column label="序号" type="index" width="60" align="center" />
                <el-table-column label="项目编号" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="工作描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" type="textarea" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="修理设备">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="数量单位">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="材料或者备件需求描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="...">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="right-side">
              <el-row>
                <el-button type="primary" @click="addRow()">添加</el-button>
              </el-row>
              <el-row>
                <el-button type="primary" @click="delData()">删除</el-button>
              </el-row>
            </div>
          </div>

          <div class="zjxlxm_2">
            <el-tabs v-model="activeName2" @tab-click="handleClick">
              <el-tab-pane label="修理项目" name="xlxm_2">
                <div class="router-body">
                  <div class="left-side">
                    <el-table
                      ref="table"
                      :data="repairWorkList"
                      tooltip-effect="dark"
                      border
                      stripe
                      style="width: 100%"
                    >
                      <el-table-column prop="engineering" label="修理工程" />
                    </el-table>
                  </div>
                  <div class="right-side">
                    <el-table
                      ref="table"
                      :data="projectData"
                      tooltip-effect="dark"
                      border
                      stripe
                      style="width: 100%"
                      @selection-change="selectRow"
                    >
                      <el-table-column type="selection" width="45" align="center" />
                      <el-table-column label="序号" type="index" width="60" align="center" />
                      <el-table-column label="项目编号" align="center">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.remark" class="remark" />
                        </template>
                      </el-table-column>
                      <el-table-column label="工作描述">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.remark" type="textarea" class="remark" />
                        </template>
                      </el-table-column>
                      <el-table-column label="修理设备">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.require_des" />
                        </template>
                      </el-table-column>
                      <el-table-column label="数量单位">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.require_des" />
                        </template>
                      </el-table-column>
                      <el-table-column label="材料或者备件需求描述">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.require_des" />
                        </template>
                      </el-table-column>
                      <el-table-column label="...">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.require_des" />
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.require_des" />
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="审批记录" name="third">
                <table-component
                  ref="审批记录"
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
              </el-tab-pane>

              <el-tab-pane label="附件" name="two">
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>

        <el-tab-pane label="船厂评价" name="third">
          <el-input type="textarea" class="remark" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent';
import { getShipRepairpplyList } from '@/api/shipRepair/repairList';

export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,
      activeName1: 'jbxx',
      activeName2: 'xlxm_2',
      conditionList: [
        {
          name: 'countryCode',
          operator: '',
          value: ''
        }
      ],
      radio: '1',
      repairWorkList: [
        {
          engineering: '修理工程1'
        },
        {
          engineering: '修理工程2'
        },
        {
          engineering: '修理工程3'
        },
        {
          engineering: '修理工程4'
        },
        {
          engineering: '修理工程5'
        }
      ],
      validFlagList: [
        { label: '生效', value: true },
        { label: '失效', value: false }
      ],
      projectData: [], // 修理项目数据
      rowNum: 1,
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
          label: '船舶',
          align: 'center'
        },
        {
          prop: 'applyNo',
          label: '申请单号'
        },
        {
          prop: 'repairType',
          label: '修理类别'
        },
        {
          prop: 'planRepairDate',
          label: '计划开始日期',
          align: 'center'
        },
        {
          prop: 'lastRepairDate',
          label: '上次修理日期',
          align: 'center'
        },
        {
          prop: 'proposer',
          label: '申请人'
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
    // 切换标签
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
    },

    // 查询事件
    searchFn() {
      const data = {};
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key];
        }
      }
      getShipRepairpplyList(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.data.records;
            this.listQuery.total = parseInt(res.data.totalRecord);
          } else {
            this.$message({
              message: '搜索失败',
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleRowClick() {},
    handleSelectionChange() {},
    handleSizeChange(size) {
      this.listQuery.limit = size;
      this.searchFn();
    },
    handleIndexChange(page) {
      this.listQuery.page = page;
      this.searchFn();
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

    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.rowNum,
        post_id: [],
        require_des: '',
        remark: ''
      };
      this.projectData.unshift(list);
      this.rowNum += 1;
    },
    // 删除方法
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        const val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中projectData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.projectData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.projectData.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection();
    }
  }
};
</script>
<style lang="scss" scoped>
.router-body {
  overflow: hidden;
  .left-side {
    width: 20%;
    float: left;
  }
  .right-side {
    width: 75%;
    float: left;
  }
}

.zjxlxm_1 {
  overflow: hidden;
  .left-side {
    width: 85%;
    float: left;
  }
  .right-side {
    width: 15%;
    float: left;
  }
}

.app-container {
  .breadcrumb {
    margin-bottom: 20px;
  }
}
.filter-container {
  .el-form-item {
    margin-bottom: 0px;
    /deep/.el-form-item__label {
      padding-right: 0px;
    }
  }
}
.table-container {
  .opt {
    text-align: right;
    margin-bottom: 10px;
  }
}

#jbxx-2 {
  margin: 10px;
  width: 95%;
  height: 200px;
  border: 1px solid #000;
}

#jbxx-3 {
  margin: 10px;
  width: 95%;
  height: 300px;
  border: 1px solid #000;
}

#jbxx-4 {
  margin: 10px;
  width: 95%;
  height: 420px;
  border: 1px solid #000;
}

.opt-panel {
  i {
    font-size: 36px;
    color: #bbb;
    cursor: pointer;
    margin-right: 4px;
    &:hover {
      color: #999;
    }
  }
}
</style>
