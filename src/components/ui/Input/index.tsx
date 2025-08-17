import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    variant?: 'default' | 'outlined' | 'filled';
    size?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, variant = 'default', size = 'md', className = '', ...props }, ref) => {
        const inputClasses = [
            styles.input,
            styles[variant],
            styles[size],
            error ? styles.error : '',
            className
        ].filter(Boolean).join(' ');

        return (
            <div className={styles.inputWrapper}>
                {label && (
                    <label className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={inputClasses}
                    {...props}
                />
                {error && (
                    <p className={styles.errorMessage}>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;