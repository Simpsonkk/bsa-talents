import { type Entity } from '~/common/types/types.js';

import {
    type HrFeedback,
    type LectureDetail,
    type Project,
    type ProjectCoachesFeedback,
    type Talent,
    type UserLMSDataDto,
} from './types/types.js';

class LMSDataEntity implements Entity {
    public userId: string;
    public talent: Talent;
    public averageProjectScore: number | null;
    public averageLectureScore: number | null;
    public lectureDetails: LectureDetail[];
    public projectCoachesFeedback: ProjectCoachesFeedback[];
    public hrFeedback: HrFeedback;
    public project: Project;

    private constructor(userLMSDataDto: UserLMSDataDto) {
        this.userId = userLMSDataDto.userId;
        this.talent = userLMSDataDto.talent;
        this.averageProjectScore = userLMSDataDto.averageProjectScore;
        this.averageLectureScore = userLMSDataDto.averageLectureScore;
        this.lectureDetails = userLMSDataDto.lectureDetails;
        this.projectCoachesFeedback = userLMSDataDto.projectCoachesFeedback;
        this.hrFeedback = userLMSDataDto.hrFeedback;
        this.project = userLMSDataDto.project;
    }

    public static initialize(userLMSDataDto: UserLMSDataDto): LMSDataEntity {
        return new LMSDataEntity({
            userId: userLMSDataDto.userId,
            talent: userLMSDataDto.talent,
            averageProjectScore: userLMSDataDto.averageProjectScore,
            averageLectureScore: userLMSDataDto.averageLectureScore,
            lectureDetails: userLMSDataDto.lectureDetails,
            projectCoachesFeedback: userLMSDataDto.projectCoachesFeedback,
            hrFeedback: userLMSDataDto.hrFeedback,
            project: userLMSDataDto.project,
        });
    }

    public toObject(): UserLMSDataDto {
        return {
            userId: this.userId,
            talent: this.talent,
            averageProjectScore: this.averageProjectScore,
            averageLectureScore: this.averageLectureScore,
            lectureDetails: this.lectureDetails,
            projectCoachesFeedback: this.projectCoachesFeedback,
            hrFeedback: this.hrFeedback,
            project: this.project,
        };
    }

    public toNewObject(): UserLMSDataDto {
        return this.toObject();
    }
}

export { LMSDataEntity };
