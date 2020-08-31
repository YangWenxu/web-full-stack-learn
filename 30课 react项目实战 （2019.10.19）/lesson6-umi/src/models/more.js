import { getMoreData, getMoreDataBySearch } from '@/services/more.js';
const Model = {
  namespace: 'more',
  state: {
    data: [],
  },
  effects: {
    *getMoreData({ payload }, { call, put }) {
      const response = yield call(getMoreData, payload);
      yield put({
        type: 'moreData',
        payload: response,
      });
    },
    *getMoreDataBySearch({ payload }, { call, put }) {
      console.log('getMoreDataBySearch', payload);
      const response = yield call(getMoreDataBySearch, payload);
      yield put({
        type: 'moreDataBySearch',
        payload: response,
      });
    },
  },
  reducers: {
    moreData(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
    moreDataBySearch(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};
export default Model;
