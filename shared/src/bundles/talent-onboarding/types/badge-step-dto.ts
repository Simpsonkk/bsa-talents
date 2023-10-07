import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent-onboarding/enums/enums.js';

type BadgeStepDto = {
    [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: true;
    [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: true;
    [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: true;
    [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: boolean;
    [BsaBadgeStepBadgesTitle.TEAM_SCORE]: boolean;
    [BsaBadgeStepBadgesTitle.COLLABORATION]: boolean;
    [BsaBadgeStepBadgesTitle.COMMUNICATIVE]: boolean;
    [BsaBadgeStepBadgesTitle.CONNECTOR]: boolean;
    [BsaBadgeStepBadgesTitle.DOER]: boolean;
    [BsaBadgeStepBadgesTitle.CREATIVE]: boolean;
    [BsaBadgeStepBadgesTitle.LEADERSHIP]: boolean;
    [BsaBadgeStepBadgesTitle.PROACTIVE]: boolean;
    [BsaBadgeStepBadgesTitle.THINKER]: boolean;
    [BsaBadgeStepBadgesTitle.PROBLEM_SOLVER]: boolean;
};

export { type BadgeStepDto };
