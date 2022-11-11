import React from 'react'
import styles from "./index.module.scss";
import logo from '../../assets/Notification1.svg';
import { Input, Button } from '@chakra-ui/react'
const Footer = () => {
    return (
        <div className={styles["footer-wrapper"]} >
            <div className={styles["footer-wrapper-items"]}>
                <div className={styles["footer-wrapper-items-form"]}>
                    <h1>
                        Be the first to know about <span>
                            crypto news every day
                        </span>
                    </h1>
                    <p>
                        Get crypto analysis, news and updates right to your inbox! Sign up here so you don’t miss a single newsletter
                    </p>
                    <Input className={styles["form-input"]} placeholder='Enter your email address' />
                    <Button className={styles["form-button"]}>Subscribe Now</Button>
                </div>

                <div className={styles["footer-wrapper-items-logo"]}>
                    <img alt='' src={logo} />
                </div>
            </div>
        </div>
    )
}

export default Footer