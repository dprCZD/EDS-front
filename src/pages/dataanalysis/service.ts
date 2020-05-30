import request from 'umi-request';

export async function generateElecAnalysisTask(params) {
  return request('/api/v1/analysis/base', {
      params,
  });
}

export async function generateContractAnalysisTask(params) {
  return request('/api/v1/analysis/contract', {
    method: 'POST',
    data: params,
  });
}

export async function generateGridMarkAnalysisTask(params) {
  return request('/api/v1/analysis/grid/mark', {
     params,
  });
}

export async function generateFeeAnalysisTask(params) {
  return request('/api/v1/analysis/fee', {
    params,
  });
}


export async function generateGridFeeAnalysisTask(params) {
  return request('/api/v1/analysis/grid/fee', {
    params,
  });
}
export async function generateFeeBillAnalysisTask(params) {
  return request('/api/v1/analysis/fee/bill', {
    params,
  });
}

