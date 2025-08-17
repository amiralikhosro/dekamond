'use client'
import { Button, Input } from '@/components/ui';
import { config, cookieSettings } from '@/config';
import { COOKIE_NAMES, STORAGE_KEYS } from '@/constants';
import { getUser } from '@/services/user';
import { AuthFormData } from '@/types/storage';
import { setStorageItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';

const AuthPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormData>();

    const { onSubmit } = useSubmit()

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className={styles.inputField}
                        {...register('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                                value: new RegExp(config.auth.phoneNumberPattern),
                                message: 'Please enter a valid Iranian mobile number (09xxxxxxxxx)'
                            }
                        })}
                        error={errors.phoneNumber?.message}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;

const useSubmit = () => {
    const router = useRouter();

    const onSubmit = async () => {
        try {
            const response = await getUser();

            if (!response.success || !response.data) {
                //TODO show error message const errorMessage = response.error ?
                //     getUserFriendlyMessage(new AppError(response.error.message)) :
                //     'Failed to fetch user data';

                //TODO toast(errorMessage)
                return;
            }

            const userData = response.data;

            setStorageItem(STORAGE_KEYS.USER, userData);

            // Set secure cookie with proper configuration
            const cookieValue = `${COOKIE_NAMES.USER}=${JSON.stringify(userData)}`;
            const cookieOptions = [
                `path=${cookieSettings.path}`,
                `max-age=${cookieSettings.maxAge}`,
                `SameSite=${cookieSettings.sameSite}`,
                cookieSettings.secure ? 'Secure' : ''
            ].filter(Boolean).join('; ');

            document.cookie = `${cookieValue}; ${cookieOptions}`;

            router.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            //TODO show error message const errorMessage = error instanceof AppError ?
            //     getUserFriendlyMessage(error) :
            //     'An unexpected error occurred during login. Please try again.';
            //TODO toast(errorMessage)

        }
    };

    return {
        onSubmit
    }
}