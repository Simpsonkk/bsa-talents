import { type ValueOf } from '~/common/types/types.js';

import { UserSortCriteria } from '../enums/enums.js';

const createSortingUsersParameters = (
    value?: ValueOf<
        (typeof UserSortCriteria)[keyof typeof UserSortCriteria]['value']
    >,
): { column: string; direction: 'asc' | 'desc' } => {
    const selectedSorting = Object.values(UserSortCriteria).find(
        (item) => item.value === value,
    );

    return selectedSorting
        ? {
              column: selectedSorting.column,
              direction: selectedSorting.direction,
          }
        : {
              column: UserSortCriteria.NEWEST.column,
              direction: UserSortCriteria.NEWEST.direction,
          };
};

export { createSortingUsersParameters };
