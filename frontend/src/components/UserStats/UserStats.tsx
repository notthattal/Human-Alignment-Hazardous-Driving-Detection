import React from 'react';
import styles from './UserStats.module.css';

interface UserStatsProps {
  surveysCompleted: number;
  numRaffleEntries: number;
}

const UserStats: React.FC<UserStatsProps> = ({ 
  surveysCompleted, 
  numRaffleEntries 
}) => {
  return (
    <div className={styles.raffleInfoContainer}>
      <div className={styles.infoItem}>
        Surveys Completed: {surveysCompleted}
      </div>
      <div className={styles.infoItem}>
        Raffle Entries: {numRaffleEntries}
      </div>
    </div>
  );
};

export default UserStats;