import request from '@/utils/request'

/**
* 键盘练习表分页查询
* @param {查询条件} data
*/
export function listcekeyboard(query) {
  return request({
    url: 'exercise/cekeyboard/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增键盘练习表
* @param data
*/
export function addcekeyboard(data) {
  return request({
    url: 'exercise/cekeyboard',
    method: 'post',
    data: data,
  })
}

/**
* 修改键盘练习表
* @param data
*/
export function updatecekeyboard(data) {
  return request({
    url: 'exercise/cekeyboard',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取键盘练习表详情
* @param {Id}
*/
export function getcekeyboard(id) {
  return request({
    url: 'exercise/cekeyboard/' + id,
    method: 'get'
  })
}

/**
* 删除键盘练习表
* @param {主键} pid
*/
export function delcekeyboard(pid) {
  return request({
    url: 'exercise/cekeyboard/' + pid,
    method: 'delete'
  })
}

// 清空键盘练习表
export function clearcekeyboard() {
  return request({
    url: 'exercise/cekeyboard/clean',
    method: 'delete'
  })
}

// 导出键盘练习表
export async function exportcekeyboard(query) {
  await downFile('exercise/cekeyboard/export', { ...query })
}

