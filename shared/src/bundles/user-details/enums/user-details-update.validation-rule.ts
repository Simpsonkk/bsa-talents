const UserDetailsUpdateValidationRule = {
    MIN_PROFILE_NAME_LENGTH: 2,
    MAX_PROFILE_NAME_LENGTH: 50,
    MIN_SALARY_EXPECTATION: 1,
    MAX_SALARY_EXPECTATION: 9999,
    MIN_EXPERIENCE_DESCRIPTION_LENGTH: 100,
    MAX_EXPERIENCE_DESCRIPTION_LENGTH: 2500,
    MIN_YEARS_OF_EXPERIENCE: 0,
    MAX_YEARS_OF_EXPERIENCE: 5.5,
    YEARS_OF_EXPERIENCE_STEP: 0.5,
    EMPLOYMENT_TYPES_MIN_LENGTH: 1,
    PROJECT_LINKS_MAX_LINKS: 5,
    PROJECT_LINKS_MIN_LENGTH: 5,
    PROJECT_LINKS_MAX_LENGTH: 250,
    MIN_FULL_NAME_LENGTH: 3,
    MAX_FULL_NAME_LENGTH: 50,
    MIN_LINKEDIN_LINK_LENGTH: 30,
    MAX_LINKEDIN_LINK_LENGTH: 250,
    MIN_COMPANY_NAME_LENGTH: 2,
    MAX_COMPANY_NAME_LENGTH: 50,
    URL_REGEX_CONSTANT: /^(www\.|http:\/\/|https:\/\/)[^.]+(\..+)+$/,
    MIN_LENGTH_COMPANY_WEBSITE: 5,
    MAX_LENGTH_COMPANY_WEBSITE: 250,
    MIN_POSITION_LENGTH: 2,
    MAX_POSITION_LENGTH: 50,
    MIN_HIRED_SALARY: 1,
    MAX_HIRED_SALARY: 9999,
} as const;

export { UserDetailsUpdateValidationRule };
