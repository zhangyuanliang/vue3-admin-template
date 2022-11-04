import request from "@/utils/request"

export function queryRole(params) {
  return request({
    url: "/queryRole",
    method: "get",
    params
  })
}

export function queryRoleLink(params) {
  return request({
    url: "/queryRoleLink",
    method: "get",
    params
  })
}

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
