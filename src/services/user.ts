import { RandomUserApiResponse, AppUser, ApiResponse } from '@/types/api';
import { endpoints } from '../config';
import { withRetry, createHttpError, handleError, AppError, ErrorType } from '@/utils/errorHandler';

// Transform RandomUser API response to our AppUser format
const transformRandomUserToAppUser = (randomUser: RandomUserApiResponse): AppUser => {
    const user = randomUser.results[0];
    return {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        avatar: user.picture.large,
        country: user.location.country,
    };
};

// Fetch user data with proper error handling and retry logic
export const getUser = async (): Promise<ApiResponse<AppUser>> => {
    try {
        const userData = await withRetry(async () => {
            const response = await fetch(endpoints.randomUser);

            if (!response.ok) {
                throw createHttpError(
                    response.status,
                    `Failed to fetch user data: ${response.statusText}`
                );
            }

            const data: RandomUserApiResponse = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new AppError(
                    'No user data received from API',
                    ErrorType.SERVER,
                    undefined,
                    'NO_DATA',
                    true
                );
            }

            return transformRandomUserToAppUser(data);
        });

        return {
            data: userData,
            success: true,
        };
    } catch (error) {
        const appError = error instanceof AppError ? error : new AppError(
            'Failed to fetch user data',
            ErrorType.UNKNOWN
        );

        handleError(appError, 'getUser');

        return {
            error: {
                message: appError.message,
                status: appError.status,
                code: appError.code,
            },
            success: false,
        };
    }
};