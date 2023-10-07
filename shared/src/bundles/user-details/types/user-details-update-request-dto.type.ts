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
import { type UserDetailsUpdateDto } from './types.js';

type UserDetailsUpdateRequestDto = {
    id?: string;
    userId?: string;

    isApproved?: boolean;
    deniedReason?: string;

    isHired?: boolean;

    profileName?: string;

    salaryExpectation?: number;
    hiredSalary?: number;

    jobTitle?: ValueOf<typeof JobTitle>;
    location?: ValueOf<typeof Country>;

    experienceYears?: number;
    employmentType?: ValueOf<typeof EmploymentType>[];

    description?: string;

    englishLevel?: ValueOf<typeof EnglishLevel>;
    notConsidered?: ValueOf<typeof NotConsidered>[];
    preferredLanguages?: ValueOf<typeof PreferredLanguage>[];
    searchType?: ValueOf<typeof SearchType>;

    projectLinks?: string[] | null;
    photoId?: string;
    fullName?: string;
    phone?: string;
    linkedinLink?: string;
    companyName?: string;
    companyLogoId?: string;
    companyWebsite?: string;
    employerPosition?: string;
    cvId?: string;

    talentBadges?: string[];
    talentHardSkills?: string[];

    completedStep?: ValueOf<typeof OnboardingStep>;
    badges?: string[];
} & UserDetailsUpdateDto;

export { type UserDetailsUpdateRequestDto };
