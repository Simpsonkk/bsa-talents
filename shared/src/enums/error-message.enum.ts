const ErrorMessage = {
    NOT_AUTHORIZED: 'You are not authorized to access this route.',
    USER_ALREADY_EXIST: 'User already exist.',
    CONTACT_ALREADY_SHARED: 'Contact is already shared',
    INCORRECT_EMAIL: 'Incorrect email.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    INVALID_TOKEN: 'Invalid token.',
    UNAUTHORIZED_USER: 'User not authorized.',
    NOT_FOUND: 'Not found.',
    UPDATE_FAILED: 'Update failed.',
    UNKNOWN_ERROR: 'Application error.',
    USER_NOT_FOUND: 'No user found for provided credentials.',
    NOT_IMPLEMENTED: 'Not implemented.',
    USER_DETAILS_NOT_FOUND: 'User profile not found',
    TOKEN_INVALID_OR_EXPIRED: 'token invalid or expired.',
    NOT_FOUND_ON_LMS:
        'User Not Found! To complete the registration process, please use the same address as when registering at the Binary Studio Academy',
    FILE_UPLOAD_ERROR: 'Failed to upload file.',
} as const;

export { ErrorMessage };
