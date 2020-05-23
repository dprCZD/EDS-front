import request from 'umi-request';

export async function generateElecAnalysisTask(params) {
  return request('/api/v1/analysis/execute', {
      params,
  });
}

export async function generateContractAnalysisTask(params) {
  return request('/api/v1/analysis/contract/execute', {
    method: 'POST',
    data: params,
  });
}

export async function generateGridAnalysisTask(params) {
  return request('/api/v1/analysis/grid/execute', {
     params,
  });
}

