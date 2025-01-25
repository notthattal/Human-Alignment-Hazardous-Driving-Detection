import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import { LeaderboardProps } from '../../utils/interfaces';

function truncateEmail(email: string) {
  // Truncate long emails to show only the first 10 characters and an ellipsis
  if (email.length > 30) {
    return `${email.slice(0, 30)}...`;
  }

  // For other emails, keep the username before the '@' symbol
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }

  // Return the original email if it doesn't contain an '@' symbol
  return email;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ topUsers, currentUser, currentUserRank }) => {
  const [isCurrentUserTopFive, setIsCurrentUserTopFive] = useState(false);

  useEffect(() => {
    const currentUserTopFive = () => {
      const userItem = localStorage.getItem('user');

      if (userItem) {
        const currentUser = JSON.parse(userItem);
        const isUserInTopFive = topUsers.some((topUser) => topUser.email === currentUser.email);
        setIsCurrentUserTopFive(isUserInTopFive);
      }
    };
    currentUserTopFive();
  }, [topUsers])

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.leaderboardTitle}>Raffle Leaderboard</div>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Raffle Entries</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, index) => (
            <tr key={user.email} className={user.email === currentUser.email ? styles.currentUserRow : ''}>
              <td>{index + 1}</td>
              <td>{truncateEmail(user.email)}</td>
              <td>{user.numRaffleEntries}</td>
            </tr>
          ))}
          {!isCurrentUserTopFive && currentUser.email && (
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          )}
          {!isCurrentUserTopFive && currentUser.email && (
            <tr className={styles.currentUserRow}>
              <td>{currentUserRank}</td>
              <td>{truncateEmail(currentUser.email)}</td>
              <td>{currentUser.numRaffleEntries}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;