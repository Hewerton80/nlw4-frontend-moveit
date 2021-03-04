import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from "../../styles/components/CompletedChallenges.module.css";

const CompletedChallenges: React.FC = () => {

  const { challengeCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengeCompleted}</span>
    </div>
  );
}

export default CompletedChallenges;
