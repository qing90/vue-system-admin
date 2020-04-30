import request from '@/utils/request'

// 获取项目库数据请求
export function getShipRepairpplyList() {
  return request({
    url: '/projectLibrary/lsitLibrary',
    method: 'get'
  })
}

// 保存项目库数据请求
export function saveProjectLibrary() {
  return request({
    url: '/projectLibrary/saveProjectLibrary',
    method: 'post'
  })
}

// 更新项目库数据请求
export function updateProjectLibrary() {
  return request({
    url: '/projectLibrary/updateProjectLibrary',
    method: 'post'
  })
}

// 删除项目库数据请求
export function deleteProjectLibrary() {
  return request({
    url: '/projectLibrary/deleteProjectLibrary',
    method: 'get'
  })
}
