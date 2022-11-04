import request from "@/utils/request"

/** 增 */
export function createTableDataApi(data) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function queryParameter(params) {
  return request({
    url: "/queryParameter",
    method: "get",
    params
  })
}
