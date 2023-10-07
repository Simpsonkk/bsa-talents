import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from '../components/onboarding-form/constants/constants.js';
import { type UserDetailsGeneralCustom } from '../types/types.js';
import {
    createEmployerDetails,
    getEmployerDetails,
    saveEmployerDetails,
    updateEmployerDetails,
} from './actions.js';

const initialState: UserDetailsGeneralCustom = {
    ...DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
    dataStatus: DataStatus.IDLE,
    cvUrl: null,
    photoUrl: null,
    companyLogoUrl: null,
    publishedAt: '',
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employerOnboarding',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(
                createEmployerDetails.fulfilled,
                updateEmployerDetails.fulfilled,
                getEmployerDetails.fulfilled,
                saveEmployerDetails.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const data: UserDetailsGeneralCustom | null = action.payload;

                for (const key in data) {
                    const typedKey = key as keyof UserDetailsGeneralCustom;
                    if (Object.keys(state).includes(key)) {
                        state[typedKey] = data[typedKey];
                    }
                }
            },
        );
        builder.addMatcher(
            isAnyOf(
                createEmployerDetails.pending,
                updateEmployerDetails.pending,
                getEmployerDetails.pending,
                saveEmployerDetails.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createEmployerDetails.rejected,
                updateEmployerDetails.rejected,
                getEmployerDetails.rejected,
                saveEmployerDetails.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
