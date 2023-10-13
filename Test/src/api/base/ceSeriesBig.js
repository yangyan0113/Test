import request from '@/utils/request'

/**
* 大系列信息表分页查询
* @param {查询条件} data
*/
export function listCeSeriesBig(query) {
  return request({
    url: 'base/ceseriesbig/list',
    method: 'get',
    params: query,
  })
}

/**
* 查询大系列信息，根据类别
* @param {category}
*/
export function listByCategory(category) {
  return request({
    url: 'base/ceseriesbig/list/' + category,
    method: 'get',
  })
}

/**
* 新增大系列信息表
* @param data
*/
export function addCeSeriesBig(data) {
  return request({
    url: 'base/ceseriesbig',
    method: 'post',
    data: data,
  })
}

/**
* 修改大系列信息表
* @param data
*/
export function updateCeSeriesBig(data) {
  return request({
    url: 'base/ceseriesbig',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取大系列信息表详情
* @param {Id}
*/
export function getCeSeriesBig(id) {
  return request({
    url: 'base/ceseriesbig/' + id,
    method: 'get'
  })
}

/**
* 删除大系列信息表
* @param {主键} pid
*/
export function delCeSeriesBig(pid) {
  return request({
    url: 'base/ceseriesbig/' + pid,
    method: 'delete'
  })
}

// 清空大系列信息表
export function clearCeSeriesBig() {
  return request({
    url: 'base/ceseriesbig/clean',
    method: 'delete'
  })
}

// 导出大系列信息表
export async function exportCeSeriesBig(query) {
  await downFile('base/CeSeriesBig/export', { ...query })
}

