import { ManageSearch } from '@mui/icons-material';
import { type LMSDataServerResponseDto } from 'shared/build/index.js';

import {
    Avatar,
    Button,
    Grid,
    IconButton,
    Logo,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMediaQuery,
    useState,
    useTheme,
} from '~/bundles/common/hooks/hooks.js';
import { actions as adminActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { actions as lmsActions } from '~/bundles/lms/store/lms.js';

import {
    Characteristics,
    CVAndContacts,
    DenyModal,
    Profile,
    VerificationList,
} from '../../components/components.js';
import { PreviewTab } from '../../constants/constants.js';
import {
    type FilterValues,
    type TabValues,
    type UserDetailsFullResponseDto,
} from '../../types/types.js';
import styles from './styles.module.scss';

const AdminVerificationsPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const { shortDetails, fullDetails, lmsData } = useAppSelector(
        ({ admin, lms }) => ({
            shortDetails: admin.shortDetails,
            fullDetails: admin.fullDetails,
            lmsData: lms.lmsData,
        }),
    );

    const [filter, setFilter] = useState<FilterValues>('talent');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<TabValues>(
        PreviewTab.PROFILE,
    );

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = useCallback(() => {
        setIsModalOpen((previous) => !previous);
    }, []);

    const denyUser = useCallback(
        (message: string) => {
            void dispatch(
                adminActions.denyUser({
                    userId: selectedId as string,
                    deniedReason: message,
                }),
            );
        },
        [selectedId, dispatch],
    );

    const approveUser = useCallback(() => {
        void dispatch(
            adminActions.approveUser({ userId: selectedId as string }),
        );
    }, [selectedId, dispatch]);

    const tabComponents = {
        [PreviewTab.PROFILE]: (
            <Profile
                userDetails={fullDetails as UserDetailsFullResponseDto}
                selectedRole={filter}
            />
        ),
        [PreviewTab.CV]: (
            <CVAndContacts
                userDetails={fullDetails as UserDetailsFullResponseDto}
            />
        ),
        [PreviewTab.CHARACTERISTICS]: (
            <Characteristics lmsData={lmsData as LMSDataServerResponseDto} />
        ),
    };

    useEffect(() => {
        void dispatch(
            adminActions.getShortUserDetails({
                role: filter,
            }),
        );
    }, [filter, dispatch]);

    useEffect(() => {
        if (selectedId) {
            void dispatch(
                adminActions.getFullUserDetails({
                    userId: selectedId,
                }),
            );
        }
    }, [selectedId, dispatch]);

    useEffect(() => {
        if (selectedId) {
            void dispatch(lmsActions.getTalentLmsData({ userId: selectedId }));
        }
    }, [dispatch, selectedId]);
    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isTogglePreviewAllowed = !isScreenMoreMD && isFilterOpen;

    const handleSelectTab = useCallback(
        (_event: React.MouseEvent<HTMLSpanElement>): void => {
            const button = _event.target as HTMLSpanElement;
            setSelectedTab(button.textContent as TabValues);
        },
        [],
    );

    const previewTabs = Object.values(PreviewTab).map((tab) => (
        <Button
            key={tab}
            onClick={handleSelectTab}
            className={getValidClassNames(
                styles.tab,
                selectedTab === tab ? 'selected' : '',
            )}
            disableRipple={true}
        >
            {tab}
        </Button>
    ));

    const handleFilterShow = useCallback((): void => {
        setIsFilterOpen((previous) => !previous);
    }, []);

    const resetTab = useCallback((): void => {
        setSelectedTab(PreviewTab.PROFILE);
    }, []);

    useEffect(() => {
        if (isScreenMoreMD) {
            setIsFilterOpen(true);
        }
    }, [isScreenMoreMD]);

    return (
        <Grid container className={styles.pageWrapper}>
            <Grid item className={styles.pageTitle}>
                <Typography className={styles.headerText} variant="h1">
                    Verifications
                </Typography>
                <Grid item className={styles.mobileFilter} tabIndex={0}>
                    {!isScreenMoreMD && (
                        <IconButton onClick={handleFilterShow}>
                            <ManageSearch fontSize="large" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid container item className={styles.pageContent}>
                <Grid
                    item
                    className={getValidClassNames(
                        styles.filterWrapper,
                        isFilterOpen ? '' : 'hidden',
                    )}
                >
                    <VerificationList
                        items={shortDetails}
                        filter={filter}
                        setFilter={setFilter}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        isScreenMoreMd={isScreenMoreMD}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                        handleResetTab={resetTab}
                    />
                </Grid>
                {fullDetails && selectedId ? (
                    <Grid
                        container
                        item
                        className={getValidClassNames(
                            styles.previewWrapper,
                            isTogglePreviewAllowed ? 'hidden' : '',
                        )}
                    >
                        <Grid className={styles.previewHeader}>
                            <Avatar
                                className={styles.avatar}
                                src={fullDetails.photo?.url}
                            />
                            <Typography variant="body1" className={styles.name}>
                                {fullDetails.fullName ?? 'username'}
                            </Typography>
                        </Grid>
                        {filter === 'talent' ? (
                            <>
                                <Grid className={styles.tabs}>
                                    {previewTabs}
                                </Grid>
                                <Grid item className={styles.previewInfo}>
                                    {tabComponents[selectedTab]}
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid className={styles.tabs}>
                                    {previewTabs[0]}
                                </Grid>
                                <Grid item className={styles.previewInfo}>
                                    {tabComponents[PreviewTab.PROFILE]}
                                </Grid>
                            </>
                        )}
                        <Grid item className={styles.buttonGroup}>
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.denyButton,
                                )}
                                onClick={toggleModal}
                                label="Deny"
                                variant="outlined"
                            />
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.approveButton,
                                )}
                                onClick={approveUser}
                                label="Approve"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid
                        container
                        item
                        className={getValidClassNames(
                            styles.previewWrapper,
                            styles.previewEmpty,
                            isTogglePreviewAllowed ? 'hidden' : '',
                        )}
                    >
                        <Logo className={styles.logo} />
                    </Grid>
                )}
                <DenyModal
                    isOpen={isModalOpen}
                    handleClose={toggleModal}
                    onSubmit={denyUser}
                />
            </Grid>
        </Grid>
    );
};

export { AdminVerificationsPanel };
