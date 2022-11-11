import React from 'react'
import styles from "./index.module.scss";

const Header = () => {
    return (
        <div className={styles["header-wrapper"]}>
            <h2 >CoinMarketCap-PHAKE</h2>
            <h1>Todays Cryptocurrency Prices by Market Cap</h1>
            <p>The global crypto market cap is $1,95TZ, a <em>2.22%</em> decrease over the last day.</p>
        </div>
    )
}

export default Header