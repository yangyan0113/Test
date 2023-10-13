import request from '@/utils/request'

/**
* 小系列信息分页查询
* @param {查询条件} data
*/
export function listCeSeriesSmall(query) {
  return request({
    url: 'base/ceseriessmall/list',
    method: 'get',
    params: query,
  })
}

/**
* 查询小系列信息，根据大系列
* @param {bigCode}
*/
export function listByBigCode(bigCode) {
  return request({
    url: 'base/ceseriessmall/list/' + bigCode,
    method: 'get',
  })
}

/**
* 新增小系列信息
* @param data
*/
export function addCeSeriesSmall(data) {
  return request({
    url: 'base/ceseriessmall',
    method: 'post',
    data: data,
  })
}

/**
* 修改小系列信息
* @param data
*/
export function updateCeSeriesSmall(data) {
  return request({
    url: 'base/ceseriessmall',
    method: 'PUT',
    data: data,
  })
} 

/**
* 获取小系列信息详情
* @param {Id}
*/
export function getCeSeriesSmall(id) {
  return request({
    url: 'base/ceseriessmall/' + id,
    method: 'get'
  })
}

/**
* 删除小系列信息
* @param {主键} pid
*/
export function delCeSeriesSmall(pid) {
  return request({
    url: 'base/ceseriessmall/' + pid,
    method: 'delete'
  })
}

// 清空小系列信息
export function clearCeSeriesSmall() {
  return request({
    url: 'base/ceseriessmall/clean',
    method: 'delete'
  })
}

// 导出小系列信息
export async function exportCeSeriesSmall(query) {
  await downFile('base/ceseriessmall/export', { ...query })
}

