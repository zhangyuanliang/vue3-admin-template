import request from "@/utils/request"

export function queryLog(params) {
  return request({
    url: "/queryLog",
    method: "get",
    params
  })
}
