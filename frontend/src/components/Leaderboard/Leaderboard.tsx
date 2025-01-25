import React from 'react';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {
  topUsers: Array<{ email: string, numRaffleEntries: number }>;
  currentUser: { email: string, numRaffleEntries: number };
  currentUserRank: number;
}

// This function is used in the Leaderboard component to truncate email addresses
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


const Leaderboard: React.FC<LeaderboardProps> = ({ topUsers, currentUser }) => {
  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.leaderboardTitle}>Raffle Leaderboard</div>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Email</th>
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
          {currentUser.email && (
            <tr className={styles.currentUserRow}>
              <td>{'?'}</td>
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