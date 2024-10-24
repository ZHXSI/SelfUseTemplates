import service from '@/utils/service'
export function getCode() {
  return service({
    url: `/countries/code/list`,
    method: 'POST',
  })
}
export function getList() {
  return service({
    baseURL: null,
    url: `/json/data.json`,
    method: 'POST',
  })
}
