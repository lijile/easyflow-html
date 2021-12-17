import * as api from '@/services/admin';

export default {
  namespace: 'admin',
  state: {
    definition: {},
    nodeList: [],

    definitionList: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
    },
  },
  effects: {
    *listDefinition({ payload }, { call, put }) {
      const res = yield call(api.listDefinition);
      const { data } = res;
      yield put({
        type: 'updateState',
        payload: {
          definitionList: data,
        },
      });
    },
    *definitionDetail({ payload }, { call, put }) {
      const res = yield call(api.getDefinitionDetail, payload);
      const { data } = res;
      yield put({
        type: 'updateState',
        payload: {
          ...data,
        },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
