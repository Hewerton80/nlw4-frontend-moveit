import React, { useContext, useMemo } from 'react';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from '../../styles/components/Countdown.module.css';

const Countdown: React.FC = () => {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo<string[]>(() => String(minutes).padStart(2, '0').split(''), [minutes]);
  const [secondLeft, secondRight] = useMemo<string[]>(() => String(seconds).padStart(2, '0').split(''), [seconds]);

  return (
    <div>
      <div className={styles.countdownContainer}>

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          isActive ? (
            <button
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar um ciclo
            </button>
          ) : (
              <button
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo
              </button>
            )
        )
      }
    </div>
  );
}

export default Countdown;
