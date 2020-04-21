import request from '@/utils/request'

export function getShipRepairpplyList() {
  return request({
    url: '/vue-element-admin/getShipRepairpplyList',
    method: 'get'
  })
}

// 修船项目路列表请求
export function getRepairList() {
  return request({
    url: '/vue-element-admin/getRepairList',
    method: 'get'
  })
}

// 获取修船遗留记录列表请求
export function getRepairLegacyList() {
  return request({
    url: '/vue-element-admin/getRepairLegacyList',
    method: 'get'
  })
}

