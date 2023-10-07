import { Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    BSABadgesTableColumn,
    DatabaseTableName,
    TalentBadgesTableColumn,
} from '~/common/packages/database/database.js';

import { BSABadgesModel } from '../bsa-badges/bsa-badges.model.js';

class TalentBadgeModel extends AbstractModel {
    public 'userId': string;

    public 'score': number | null;

    public 'level': string | null;

    public 'isShown': boolean;

    public 'badgeId': string;

    public 'userDetailsId': string;

    public 'badge'?: BSABadgesModel;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_BADGES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            badge: {
                relation: Model.BelongsToOneRelation,
                modelClass: BSABadgesModel,
                join: {
                    from: `${DatabaseTableName.TALENT_BADGES}.${TalentBadgesTableColumn.BADGE_ID}`,
                    to: `${DatabaseTableName.BSA_BADGES}.${BSABadgesTableColumn.ID}`,
                },
            },
        };
    }
}

export { TalentBadgeModel };
