import joi from 'joi';

import {
    ContactsCVStepValidationMessages,
    ContactsCVStepValidationRules,
} from '../../enums/enums.js';
import { type ContactsCVStepDto } from '../../types/types.js';

const ContactsCVStepValidationSchema = joi.object<ContactsCVStepDto, true>({
    photo: joi.object().instance(File).allow(null),
    photoUrl: joi.string().allow(null).when('photo', {
        is: null,
        then: joi.required(),
        otherwise: joi.optional(),
    }),

    cv: joi.object().instance(File).allow(null),
    cvUrl: joi.string().allow(null).when('cv', {
        is: null,
        then: joi.required(),
        otherwise: joi.optional(),
    }),
    cvName: joi.string().messages({
        'any.invalid': ContactsCVStepValidationMessages.CV_REQUIRED,
    }),

    fullName: joi
        .string()
        .trim()
        .min(ContactsCVStepValidationRules.MIN_FULL_NAME_LENGTH)
        .max(ContactsCVStepValidationRules.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty': ContactsCVStepValidationMessages.FULL_NAME_REQUIRED,
            'string.min': ContactsCVStepValidationMessages.FULL_NAME_MIN_LENGTH,
            'string.max': ContactsCVStepValidationMessages.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                ContactsCVStepValidationMessages.FULL_NAME_WRONG_PATTERN,
        }),

    phone: joi
        .string()
        .pattern(/^\+(?:\d ?){10,14}\d$/)
        .required()
        .messages({
            'string.empty':
                ContactsCVStepValidationMessages.PHONE_NUMBER_REQUIRED,
            'string.pattern.base':
                ContactsCVStepValidationMessages.PHONE_NUMBER_PATTERN,
        }),

    linkedinLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(ContactsCVStepValidationRules.MIN_LINKEDIN_LINK_LENGTH)
        .max(ContactsCVStepValidationRules.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty':
                ContactsCVStepValidationMessages.LINKEDIN_LINK_REQUIRED,
            'string.min':
                ContactsCVStepValidationMessages.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                ContactsCVStepValidationMessages.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                ContactsCVStepValidationMessages.LINKEDIN_LINK_WRONG_PATTERN,
        }),
});

export { ContactsCVStepValidationSchema };
