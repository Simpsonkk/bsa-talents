import { type TalentBadge } from 'shared/build/index.js';

import {
    Avatar,
    Badge,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { mapBsaBadges } from '~/bundles/lms/helpers/map-bsa-badges.js';

import { type UserDetailsFullResponseDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    userDetails: UserDetailsFullResponseDto;
    selectedRole: string;
};

const Profile: React.FC<Properties> = ({ userDetails, selectedRole }) => {
    const badgesToShow = userDetails.talentBadges.filter(
        (badge) => badge.isShown,
    ) as TalentBadge[];

    const mappedBasges = mapBsaBadges(badgesToShow);

    return (
        <Grid container className={styles.container}>
            <Grid
                container
                item
                className={
                    selectedRole === 'talent'
                        ? styles.textInfo
                        : styles.employerTextInfo
                }
            >
                {selectedRole === 'talent' ? (
                    <Grid className={styles.textInfo}>
                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Profile name
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.profileName}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Salary expectations
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.salaryExpectation}$
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Job title
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.jobTitle}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Experience
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.experienceYears} years
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Current Location
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.location}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Employment type
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.employmentType?.join(',\n')}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Level of English
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.englishLevel}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                I do not consider
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.notConsidered?.join(',\n') ?? '-'}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Preferred language of communication
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.value}
                            >
                                {userDetails.preferredLanguages?.join(',\n') ??
                                    '-'}
                            </Typography>
                        </Grid>

                        <Grid container item className={styles.row}>
                            <Typography variant="body1" className={styles.name}>
                                Project links
                            </Typography>
                            <Grid className={styles.value}>
                                {userDetails.projectLinks?.map((link) => {
                                    return (
                                        <a
                                            key={link}
                                            href={link}
                                            className={styles.valueLink}
                                        >
                                            link to BSA project
                                        </a>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid className={styles.layoutEmployer}>
                        <Grid className={styles.employerCard}>
                            <Avatar
                                className={styles.companyLogo}
                                src={userDetails.companyLogo?.url}
                            />
                            <Grid className={styles.employerDetails}>
                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.position,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Employer position
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={styles.value}
                                    >
                                        {userDetails.employerPosition}
                                    </Typography>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.companyName,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Company name
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={styles.value}
                                    >
                                        {userDetails.companyName}
                                    </Typography>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.website,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Company website
                                    </Typography>
                                    <a
                                        href={
                                            userDetails.companyWebsite as string
                                        }
                                        className={styles.valueLink}
                                    >
                                        Website link
                                    </a>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.location,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Location
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={styles.value}
                                    >
                                        {userDetails.location}
                                    </Typography>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.employerLinkedIn,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Linkedin Link
                                    </Typography>
                                    <a
                                        href={
                                            userDetails.linkedinLink as string
                                        }
                                        className={styles.valueLink}
                                    >
                                        Linkedin link
                                    </a>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    className={getValidClassNames(
                                        styles.row,
                                        styles.description,
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        className={styles.name}
                                    >
                                        Description
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={styles.value}
                                    >
                                        {userDetails.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {selectedRole === 'talent' && (
                <Grid container item className={styles.labelsInfo}>
                    <Grid container item className={styles.bsaBadges}>
                        <Typography variant="body1" className={styles.title}>
                            BSA badges
                        </Typography>
                        {mappedBasges.map((badge) => {
                            const primaryText =
                                badge.level ?? String(badge.score) + ' ';
                            const secondText = badge.level
                                ? ''
                                : '/ ' + String(badge.maxScore);
                            return (
                                <Badge
                                    key={badge.id}
                                    isSmall
                                    color={badge.color}
                                    primaryText={primaryText}
                                    secondText={secondText}
                                    description={badge.name}
                                />
                            );
                        })}
                    </Grid>

                    <Grid container item className={styles.hardSkills}>
                        <Typography variant="body1" className={styles.title}>
                            Hard Skills
                        </Typography>
                        {userDetails.talentHardSkills?.map((hardSkill) => {
                            return (
                                <Chip
                                    key={hardSkill.name}
                                    label={hardSkill.name as string}
                                    className={styles.chip}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export { Profile };
