import { type TalentBadge } from 'shared/build/index.js';
import { UserRole } from 'shared/build/index.js';

import { type State } from '~/bundles/auth/store/auth.js';
import { CandidateModal } from '~/bundles/candidate-details/components/components.js';
import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { Button, Grid } from '~/bundles/common/components/components.js';
import { useCommonData } from '~/bundles/common/data/hooks/use-common-data.hook.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as hiringInfoActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { mapBsaBadges } from '~/bundles/lms/helpers/map-bsa-badges.js';
import { actions as lmsActions } from '~/bundles/lms/store/lms.js';
import { type MappedBSABadge } from '~/bundles/lms/types/mapped-bsa-badge.js';
import { type SeacrhCandidateResponse } from '~/bundles/search-candidates/types/types.js';
import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '~/bundles/talent-onboarding/components/components.js';
import { type RootReducer } from '~/framework/store/store.js';

import {
    type FirstSectionDetails,
    type SecondSectionDetails,
    type TalentHardSkill,
} from '../../../talent-onboarding/types/types.js';
import styles from './styles.module.scss';

type Properties = {
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
    isCandidatePage?: boolean;
    candidateData?: SeacrhCandidateResponse & {
        email?: string;
    };
    hasSentAlreadyFirstMessage?: boolean;
};

const getAuthState = (state: RootReducer): State => state.auth;

const CandidateProfile: React.FC<Properties> = ({
    isProfileOpen,
    isFifthStep,
    isProfileCard,
    candidateData,
    isCandidatePage = false,
    hasSentAlreadyFirstMessage = false,
}) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleCloseContactModal = useCallback(() => {
        setIsContactModalOpen(false);
    }, []);
    const handleOpenContactModal = useCallback(() => {
        if (hasSentAlreadyFirstMessage) {
            navigate(AppRoute.CHATS);
        }
        setIsContactModalOpen(true);
    }, [hasSentAlreadyFirstMessage, navigate]);
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );
    const { hardSkillsOptions } = useCommonData();

    const dispatch = useAppDispatch();

    const reduxData = useAppSelector((state: RootReducer) => ({
        ...state.talentOnBoarding,
        email: state.auth.currentUser?.email,
        talentBadges: state.lms.talentBadges,
        lmsProject: state.lms.lmsData?.project,
    }));

    const data = candidateData ?? reduxData;

    const { publishedAt, isApproved } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const getMappedBadgesData = (): MappedBSABadge[] => {
        if (candidateData?.badges) {
            const badges = candidateData.badges as TalentBadge[];
            const badgesToShow = badges.filter((badge) => badge.isShown);
            return mapBsaBadges(badgesToShow);
        }

        const selectedIds = reduxData.badges ?? [];
        return reduxData.talentBadges.filter((item) =>
            selectedIds.includes(item.id),
        );
    };

    const userId = currentUser?.id;

    useEffect(() => {
        if (!isFifthStep && currentUser?.role == UserRole.EMPLOYER) {
            void dispatch(
                lmsActions.getTalentLmsData({ userId: data.userId ?? '' }),
            );
        }

        if (!userId || isProfileCard) {
            return;
        }

        void dispatch(lmsActions.getTalentLmsData({ userId }));

        if (!isFifthStep && currentUser.role == UserRole.EMPLOYER) {
            void dispatch(
                hiringInfoActions.getHiringInfo({
                    talentId: data.userId ?? '',
                    companyId: userId,
                }),
            );
            void dispatch(
                candidateActions.getContactWithTalent({
                    talentId: data.userId ?? '',
                    companyId: userId,
                }),
            );
            void dispatch(chatActions.getAllChatsByUserId(currentUser.id));
        }
    }, [
        currentUser,
        data.userId,
        dispatch,
        isCandidatePage,
        isFifthStep,
        isProfileCard,
        userId,
    ]);

    const { chats } = useAppSelector(({ chat }) => ({
        chats: chat.chats,
    }));
    const [hasAlreadySentFirstMessage, setHasSentAlreadyFirstMessage] =
        useState<boolean>(hasSentAlreadyFirstMessage);

    useEffect(() => {
        const chatWithCandidate = chats.find(
            (chat) => chat.participants.receiver.id == data.userId,
        );
        if (chatWithCandidate) {
            setHasSentAlreadyFirstMessage(true);
            void dispatch(chatActions.updateChatId(chatWithCandidate.chatId));
        }
    }, [chats, data.userId, dispatch, hasSentAlreadyFirstMessage]);

    useEffect(() => {
        if (currentUser?.role == UserRole.TALENT) {
            void dispatch(lmsActions.getTalentBadges(currentUser.id));
        }
    }, [currentUser, data.userId, dispatch]);

    const hardskillsLabels = hardSkillsOptions
        .filter(
            (item) =>
                reduxData.talentHardSkills?.some(
                    (skill) =>
                        (skill as unknown as TalentHardSkill).hardSkillId ===
                        item.value,
                ),
        )
        .map((item) => item.label);
    const hardSkillsToShow =
        !isFifthStep && candidateData?.hardSkills
            ? candidateData.hardSkills.map((item) => item.name)
            : hardskillsLabels;

    const firstSectionCandidateDetails: FirstSectionDetails = {
        userId: data.userId as string,
        profileName: data.profileName as string,
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        badges: getMappedBadgesData(),
        preferredLanguages: data.preferredLanguages as string[],
        description: data.description as string,
        talentHardSkills: hardSkillsToShow,
        experienceYears: data.experienceYears as number,
        date: data.createdAt as string,
        lmsProject: reduxData.lmsProject,
    };
    const secondSectionCandidateDetails: SecondSectionDetails = {
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        experienceYears: data.experienceYears as number,
        jobTitle: data.jobTitle,
        fullName: data.fullName as string,
        email: data.email as string,
        phone: data.phone as string,
        employmentType: data.employmentType as string[],
        notConsidered: data.notConsidered as string[],
        cvId: data.cvId as string,
        lmsProject: reduxData.lmsProject,
    };
    const isContactButtonVisible =
        !isProfileOpen && !isFifthStep && !isProfileCard;

    return (
        <Grid className={styles.wrapper}>
            {isFifthStep && (
                <Button
                    label={
                        publishedAt && !isApproved
                            ? 'Your account is waiting for the approval'
                            : 'Your account is ready!'
                    }
                    variant="text"
                    className={styles.accountReadyButton}
                />
            )}
            <Grid
                className={getValidClassNames(
                    styles.profileWrapper,
                    isProfileCard && styles.profileCardWrapper,
                )}
            >
                <ProfileFirstSection
                    isProfileOpen={isProfileOpen}
                    isFifthStep={isFifthStep}
                    isProfileCard={isProfileCard}
                    candidateParameters={firstSectionCandidateDetails}
                />
                {!isProfileCard && (
                    <ProfileSecondSection
                        isProfileOpen={isProfileOpen}
                        isFifthStep={isFifthStep}
                        hasSentAlreadyFirstMessage={hasAlreadySentFirstMessage}
                        candidateParameters={secondSectionCandidateDetails}
                        isContactModalOpen={isContactModalOpen}
                        onContactModalClose={handleCloseContactModal}
                        onContactModalOpen={handleOpenContactModal}
                    />
                )}
            </Grid>
            {isContactButtonVisible && (
                <Grid className={styles.modalWrapper}>
                    <CandidateModal
                        isOpen={isContactModalOpen}
                        onClose={handleCloseContactModal}
                    />
                    <Button
                        label="Contact candidate"
                        className={styles.contactButton}
                        onClick={handleOpenContactModal}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export { CandidateProfile };
