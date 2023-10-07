import { type ChangeEvent } from 'react';
import { SearchType, UserRole } from 'shared/build/index.js';

import { actions as storeActions } from '~/app/store/app.js';
import { type State } from '~/bundles/auth/store/auth.js';
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    PageLayout,
    RouterOutlet,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { OnboardingForm } from '~/bundles/employer-onboarding/components/onboarding-form/onboarding-form.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.js';
import { NotificationType } from '~/services/notification/enums/notification-type.enum.js';

import styles from './styles.module.scss';

const getAuthState = (state: RootReducer): State => state.auth;

const ProfileCabinet: React.FC = () => {
    const role = useAppSelector((state) => state.auth.currentUser?.role);
    let tabNavigation = <></>;
    switch (role) {
        case UserRole.TALENT: {
            tabNavigation = (
                <Tabs>
                    <Tab
                        label="Profile"
                        href={`/${role}/my/${StepsRoute.STEP_01}`}
                    />
                    <Tab
                        label="BSA badges"
                        href={`/${role}/my/${StepsRoute.STEP_02}`}
                    />
                    <Tab
                        label="Skills and projects"
                        href={`/${role}/my/${StepsRoute.STEP_03}`}
                    />
                    <Tab
                        label="CV and contacts"
                        href={`/${role}/my/${StepsRoute.STEP_04}`}
                    />
                </Tabs>
            );
            break;
        }
        case UserRole.EMPLOYER: {
            tabNavigation = <></>;
            break;
        }
        default: {
            break;
        }
    }
    const [isWaitingForApproval, setIsWaitingForApproval] =
        useState<boolean>(false);

    const { submitForm } = useFormSubmit();

    const dispatch = useAppDispatch();

    const { hasChanges, searchType } = useAppSelector((state: RootReducer) => ({
        hasChanges: state.cabinet.hasChangesInDetails,
        searchType: state.talentOnBoarding.searchType,
    }));

    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );

    const { talentOnBoarding, employerOnBoarding } = useAppSelector(
        (state: RootReducer) => state,
    );

    useEffect(() => {
        if (
            (talentOnBoarding.publishedAt && !talentOnBoarding.isApproved) ??
            (employerOnBoarding.publishedAt && !employerOnBoarding.isApproved)
        ) {
            setIsWaitingForApproval(true);
        }
    }, [
        dispatch,
        employerOnBoarding.isApproved,
        employerOnBoarding.publishedAt,
        talentOnBoarding.isApproved,
        talentOnBoarding.publishedAt,
    ]);

    useEffect(() => {
        if (talentOnBoarding.isApproved ?? employerOnBoarding.isApproved) {
            setIsWaitingForApproval(false);
        }
    }, [dispatch, employerOnBoarding.isApproved, talentOnBoarding.isApproved]);

    const handlePublish = useCallback(() => {
        if (currentUser) {
            void dispatch(
                talentActions.updateTalentPublishedDate({
                    userId: currentUser.id,
                }),
            );
        }
    }, [currentUser, dispatch]);

    const handleSearchTypeCheckboxOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const newSearchType = event.target.checked
                ? SearchType.ACTIVE
                : SearchType.PASSIVE;
            void dispatch(
                talentActions.updateTalentDetails({
                    searchType: newSearchType,
                    userId: currentUser?.id,
                }),
            );
        },
        [currentUser?.id, dispatch],
    );

    const handleClick = useCallback(
        (publish: boolean) => {
            void (async (): Promise<void> => {
                if (!submitForm) {
                    return;
                }

                const isSuccessful = await submitForm();

                if (isSuccessful) {
                    void dispatch(
                        storeActions.notify({
                            type: NotificationType.SUCCESS,
                            message: 'Profile was updated',
                        }),
                    );
                    if (publish) {
                        handlePublish();
                    }
                }
            })();
        },
        [dispatch, handlePublish, submitForm],
    );

    const handleSaveClick = useCallback(() => {
        handleClick(false);
    }, [handleClick]);

    const handlePublishNowClick = useCallback(() => {
        handleClick(true);
    }, [handleClick]);

    return (
        <PageLayout
            avatarUrl=""
            isOnline
            isWaitingForApproval={isWaitingForApproval}
        >
            <Grid className={styles.pageTitle}>
                <Typography variant="h4">Your Profile</Typography>
                {role == UserRole.TALENT && (
                    <Grid className={styles.activeSearch}>
                        <Checkbox
                            onChange={handleSearchTypeCheckboxOnChange}
                            isChecked={searchType == SearchType.ACTIVE}
                            className={styles.checkbox}
                        />
                        <Typography variant="h6">Active search</Typography>
                        <Tooltip
                            title="BSA Talents shows you as an active candidate for all employers"
                            className={styles.tooltip}
                        >
                            <div>{' [?] '}</div>
                        </Tooltip>
                    </Grid>
                )}
            </Grid>
            <Grid className={styles.pageWrapper}>
                <Grid className={styles.headNavigation}>
                    <Grid className={styles.tabNavigation}>
                        {tabNavigation}
                    </Grid>
                </Grid>
                <Grid
                    className={getValidClassNames(
                        styles.stepContainer,
                        styles[`${role}`],
                    )}
                >
                    <FormControl className={styles.form}>
                        {role == UserRole.TALENT ? (
                            <RouterOutlet />
                        ) : (
                            <OnboardingForm />
                        )}
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    onClick={handleSaveClick}
                                    label={'Save'}
                                    variant={'outlined'}
                                    isDisabled={!hasChanges}
                                    className={getValidClassNames(
                                        styles.profileButton,
                                        styles.saveButton,
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handlePublishNowClick}
                                    label={
                                        role === UserRole.TALENT
                                            ? 'Publish now'
                                            : 'Submit for verification'
                                    }
                                    variant={'contained'}
                                    className={getValidClassNames(
                                        styles.profileButton,
                                        styles.publishButton,
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export { ProfileCabinet };
