import request from "@/utils/request"

export function queryMenu(params) {
  return request({
    url: "/queryMenu",
    method: "get",
    params
  })
}

export function createTableDataApi(data) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

export function deleteTableDataApi(id) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

export function updateTableDataApi(data) {
  return request({
    url: "table",
    method: "put",
    data
  })
}
