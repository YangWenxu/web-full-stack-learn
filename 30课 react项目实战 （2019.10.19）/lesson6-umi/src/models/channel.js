import { getChannelData, getChannelDataBySearch } from '@/services/channel.js';
const Model = {
  namespace: 'channel',
  state: {
    data: [],
  },
  effects: {
    *getChannelData({ payload }, { call, put }) {
      const response = yield call(getChannelData, payload);
      yield put({
        type: 'channelData',
        payload: response,
      });
    },
    *getChannelDataBySearch({ payload }, { call, put }) {
      const response = yield call(getChannelDataBySearch, payload);
      yield put({
        type: 'channelDataBySearch',
        payload: response,
      });
    },
  },
  reducers: {
    channelData(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
    channelDataBySearch(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};
export default Model;
