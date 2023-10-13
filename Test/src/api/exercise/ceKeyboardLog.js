import request from '@/utils/request'

/**
* 键盘练习记录表分页查询
* @param {查询条件} data
*/
export function listCeKeyboardLog(query) {
  return request({
    url: 'exercise/CeKeyboardLog/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增键盘练习记录表
* @param data
*/
export function addCeKeyboardLog(data) {
  return request({
    url: 'exercise/cekeyboardlog',
    method: 'post',
    data: data,
  })
}

/**
* 修改键盘练习记录表
* @param data
*/
export function updateCeKeyboardLog(data) {
  return request({
    url: 'exercise/cekeyboardlog',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取键盘练习记录表详情
* @param {Id}
*/
export function getCeKeyboardLog(id) {
  return request({
    url: 'exercise/cekeyboardlog/' + id,
    method: 'get'
  })
}

/**
* 删除键盘练习记录表
* @param {主键} pid
*/
export function delCeKeyboardLog(pid) {
  return request({
    url: 'exercise/cekeyboardlog/' + pid,
    method: 'delete'
  })
}

// 清空键盘练习记录表
export function clearCeKeyboardLog() {
  return request({
    url: 'exercise/cekeyboardlog/clean',
    method: 'delete'
  })
}

// 导出键盘练习记录表
export async function exportCeKeyboardLog(query) {
  await downFile('exercise/cekeyboardlog/export', { ...query })
}

