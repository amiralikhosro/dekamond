'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { resetLocalStorage } from '@/utils/localStorage'
import { Button } from '../../components/ui'
import styles from './layout.module.scss'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const handleLogout = () => {
        resetLocalStorage()
        document.cookie = 'user=; path=/; max-age=0; SameSite=Lax';
        router.push('/auth');
    }

    return (
        <div className={styles.mainLayout}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Button
                        onClick={handleLogout}
                        variant='danger'
                        size='md'
                        className={styles.logoutButton}
                    >
                        Logout
                    </Button>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default MainLayout