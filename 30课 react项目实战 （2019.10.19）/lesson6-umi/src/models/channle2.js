import { getChannelData, getChannelDataBySearch } from '../services/channel';

const Model = {
  namespace: 'channel2',
  state: {
    data: [],
  },
  effects: {
    *getChannel2Data({ payload }, { call, put }) {
      const res = yield call(getChannelData, payload);
      yield put({ type: 'channel2Data', payload: res });
    },
    *getChannel2DataBySearch({ payload }, { call, put }) {
      const res = yield call(getChannelDataBySearch, payload);
      console.log('hah', payload);
      yield put({ type: 'channel2DataBySearch', payload: res });
    },
  },
  reducers: {
    channel2Data(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
    channel2DataBySearch(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};

export default Model;
