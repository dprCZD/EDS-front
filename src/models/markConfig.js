import {history} from "umi";
import {getMarkConfig} from "../pages/benchmark/service";

const Model = {
  namespace: 'markConfig',
  state: {
    markConfig:{},
  },
  effects: {
    * markConfig(_, {call, put}) {
      const response = yield call(getMarkConfig);
      yield put({
        type: 'saveMarkConfig',
        payload: response,
      });

    },
  },

  reducers: {
    saveMarkConfig(state, { payload }) {
      return { ...state, markConfig: payload.data};
    },

  },
};
export default Model;
