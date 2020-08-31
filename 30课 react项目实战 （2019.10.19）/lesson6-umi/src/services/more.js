import request from '@/utils/request';
export async function getMoreData(params) {
  return request('/api/getMoreDataOfTable', {
    method: 'get',
  });
}
export async function getMoreDataBySearch(params) {
  return request('/api/getMoreDataBySearch', {
    method: 'post',
    data: params,
  });
}
