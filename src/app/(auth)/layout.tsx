import Image from "next/image";
import styles from './layout.module.scss';

export default function AuthLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.authLayout}>
            <div className={styles.header}>
                <Image 
                    src="logo.svg" 
                    width={100} 
                    height={25} 
                    alt="logo" 
                    className={styles.logo}
                />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
