import {
    getCandidateDetails,
    searchCandidates,
    setFilters,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getCandidateDetails,
    searchCandidates,
    setFilters,
};

export { allActions as actions };
export { reducer } from './slice.js';
