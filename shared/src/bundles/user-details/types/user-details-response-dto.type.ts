import { type ValueOf } from '~/types/value-of.type.js';

import {
    type Country,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type OnboardingStep,
    type PreferredLanguage,
    type SearchType,
} from '../user-details.js';

type UserDetailsResponseDto = {
    id: string | null;
    userId: string;
    isApproved: boolean;
    deniedReason: string | null;
    isHired: boolean;
    profileName: string | null;
    salaryExpectation: number | null;
    hiredSalary: number | null;
    jobTitle: ValueOf<typeof JobTitle> | null;
    location: ValueOf<typeof Country> | null;
    experienceYears: number | null;
    employmentType: ValueOf<typeof EmploymentType>[] | null;
    description: string | null;
    englishLevel: ValueOf<typeof EnglishLevel> | null;
    notConsidered: ValueOf<typeof NotConsidered>[] | null;
    preferredLanguages: ValueOf<typeof PreferredLanguage>[] | null;
    searchType: ValueOf<typeof SearchType>;
    projectLinks: string[] | null;
    photoId: string | null;
    fullName: string | null;
    phone: string | null;
    linkedinLink: string | null;
    companyName: string | null;
    companyLogoId: string | null;
    companyWebsite: string | null;
    employerPosition: string | null;
    cvId: string | null;
    talentBadges?: {
        id: string | null;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }[];
    talentHardSkills?: {
        id: string | null;
        hardSkillId: string;
        userDetailsId: string;
        name?: string;
    }[];
    completedStep: ValueOf<typeof OnboardingStep> | null;
    cvUrl?: string | null;
    photoUrl?: string | null;
    companyLogoUrl?: string | null;
};

export { type UserDetailsResponseDto };
