import { type FC, type ReactNode } from 'react';

import { type State } from '~/bundles/auth/store/auth.js';
import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type RootReducer } from '~/framework/store/store.package.js';

type Properties = {
    children: ReactNode;
};

const getAuthState = (state: RootReducer): State => state.auth;

const ProtectedRoute: FC<Properties> = ({ children }) => {
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );

    const hasUser = Boolean(currentUser);

    if (hasUser) {
        return children;
    }

    return <Navigate to={AppRoute.SIGN_IN} replace />;
};

export { ProtectedRoute };
