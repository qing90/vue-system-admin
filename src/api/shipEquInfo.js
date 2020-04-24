import request from '@/utils/request'

export function queryResponManList() {
  return request({
    url: '/common/dept',
    method: 'get'
  })
}

export function queryEquipmentList() {
  return request({
    url: '/common/devicetype',
    method: 'get'
  })
}

export function queryCompanyList() {
  return request({
    url: '/common/company',
    method: 'get'
  })
}

export function queryShipList() {
  return request({
    url: '/common/ship',
    method: 'get'
  })
}

export function queryTree(data) {
  return request({
    url: `/device/tree?shipId=${data}`,
    method: 'get',
  })
}

export function querySingleInfo(id) {
  return request({
    url: `/device/get/${id}`,
    method: 'get'
  })
}

export function updateInfo(data) {
  return request({
    url: '/device/save',
    method: 'post',
    data
  })
}

export function querySpareDrawing(id) {
  return request({
    url: `/deviceparts/drawing?${id}`,
    method: 'get'
  })
}

export function gotoDetail(pmDevInfoId,partsDrawingNum) {
  return request({
    url: `/deviceparts/query?pmDevInfoId=${pmDevInfoId}&partsDrawingNum=${partsDrawingNum}`,
    method: 'get'
  })
}