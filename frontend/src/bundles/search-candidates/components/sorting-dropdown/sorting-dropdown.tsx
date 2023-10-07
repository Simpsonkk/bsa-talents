import {
    type Control,
    type FieldPath,
    type UseFormReset,
} from 'react-hook-form';

import { Select } from '~/bundles/common/components/components.js';

import { UserSortCriteria } from '../../enums/enums.js';
import { type EmployeesFiltersDto } from '../../types/employees-filters-dto.js';

type Properties = {
    control: Control<EmployeesFiltersDto>;
    reset: UseFormReset<EmployeesFiltersDto>;
    name: FieldPath<EmployeesFiltersDto>;
    placeholder?: string;
    label?: string;
    isDisabled?: boolean;
};

const sortingOptions = Object.values(UserSortCriteria).map((type) => ({
    value: type.value,
    label: type.label,
}));

const SortingDropdown: React.FC<Properties> = ({ control }) => {
    return (
        <Select
            control={control}
            errors={{}}
            name="sortBy"
            options={sortingOptions}
            placeholder="options"
            startAdornmentText="Sort by:"
        />
    );
};

export { SortingDropdown };
