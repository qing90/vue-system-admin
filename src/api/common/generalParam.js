import request from '@/utils/request'

// 查询获取所有公司（船队）集合
export function listCompany() {
  return request({
    url: '/common/listCompany',
    method: 'get'
  })
}

// 获取修船修理类别
export function listRepairType() {
  return request({
    url: '/common/listRepairType',
    method: 'get'
  })
}

// 获取船舶集合
export function listShip(id) {
  return request({
    url: '/common/listShip',
    method: 'get',
    param: { id }
  })
}

// 获取修船项目集合
export function listRepairProject() {
  return request({
    url: '/common/listRepairProject',
    method: 'get'
  })
}
