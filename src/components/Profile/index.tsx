import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/Profile.module.css';
const Profile: React.FC = () => {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/37268237?s=400&u=9ef25ed098aac668ecb6a17f0da035780ab69f1b&v=4" alt="hewerton"/>
      <div>
        <strong>Hewerton Adão</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;
