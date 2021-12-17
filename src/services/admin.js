import { request } from '@/utils/request';

export async function listDefinition(options) {
  return request('/core/admin/list-definition', {
    method: 'GET',
    showLoading: true,
    ...(options || {}),
  });
}

export async function getDefinitionDetail(params, options) {
  return request('/core/admin/get-definition', {
    method: 'GET',
    showLoading: true,
    params: { ...params },
    ...(options || {}),
  });
}
