import { Radio as MuiRadio, type RadioProps } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type RadioProperties = {
    className?: string;
} & RadioProps;

const radioIconClasses = styles.radioIcon;
const radioCheckedIconClasses = getValidClassNames(
    styles.radioIcon,
    styles.radioIconChecked,
);
const RadioIcon = <span className={radioIconClasses} />;
const RadioIconChecked = <span className={radioCheckedIconClasses} />;

const Radio: React.FC<RadioProperties> = ({
    className = '',
    ...restProperties
}) => {
    const radioClasses = className;
    return (
        <MuiRadio
            checkedIcon={RadioIconChecked}
            icon={RadioIcon}
            className={radioClasses}
            {...restProperties}
        />
    );
};

export { Radio };
