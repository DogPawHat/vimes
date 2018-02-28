import { state as RootState } from '../root';
import { createSelector } from 'reselect';

export const isAuthenticated = createSelector(
    (state: RootState) => {

        if (state.auth.expires_at === '') {
            return false;
        }
        
        const expiresAt = JSON.parse(
           state.auth.expires_at
        );

        return new Date().getTime() < expiresAt;
    },
    authenticated => authenticated
);