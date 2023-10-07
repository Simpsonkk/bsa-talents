import { Model } from 'objection';

import { UserDetailsModel } from '~/bundles/user-details/user-details.model.js';
import { UserModel } from '~/bundles/users/user.model.js';
import {
    AbstractModel,
    DatabaseTableName,
    UserDetailsTableColumn,
    UserLMSDataTableColumn,
    UsersTableColumn,
} from '~/common/packages/database/database.js';

import {
    type HrFeedback,
    type LectureDetail,
    type Project,
    type ProjectCoachesFeedback,
    type Talent,
} from './types/types.js';

class LMSDataModel extends AbstractModel {
    public 'userId': string;
    public 'talent': Talent;
    public 'averageProjectScore': number | null;
    public 'averageLectureScore': number | null;
    public 'lectureDetails': LectureDetail[];
    public 'projectCoachesFeedback': ProjectCoachesFeedback[];
    public 'hrFeedback': HrFeedback;
    public 'project': Project;

    public static override get tableName(): string {
        return DatabaseTableName.USER_LMS_DATA;
    }

    public static override relationMappings = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: UserModel,
            join: {
                from: `${DatabaseTableName.USER_LMS_DATA}.${UserLMSDataTableColumn.USER_ID}`,
                to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
            },
        },
        details: {
            relation: Model.HasOneRelation,
            modelClass: UserDetailsModel,
            join: {
                from: `${DatabaseTableName.USER_LMS_DATA}.${UserLMSDataTableColumn.USER_ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
            },
        },
    };
}

export { LMSDataModel };
