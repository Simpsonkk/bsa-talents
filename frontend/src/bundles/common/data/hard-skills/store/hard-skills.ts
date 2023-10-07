import { getHardSkillsData } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getHardSkillsData,
};

export { allActions as actions };
export { reducer } from './slice.js';
