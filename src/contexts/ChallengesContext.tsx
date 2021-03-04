import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import LevelUpModal from "../components/LevelUpModal";
interface IChallenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface IChallengesContext {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: IChallenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelModal(): void;
}

const ChallengesContext = createContext<IChallengesContext>({} as IChallengesContext);

export interface ChallengesProviderProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}
const ChallengeProvider: React.FC<ChallengesProviderProps> = ({ children, ...rest }) => {
    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengesCompleted || 0);
    const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const experienceToNextLevel = useMemo<number>(() => Math.pow((level + 1) * 4, 2), [level]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currentExperience, challengeCompleted]);

    const levelUp = useCallback(() => {
        setLevel(oldLevel => oldLevel + 1);
        setIsLevelModalOpen(true);
    }, []);

    const startNewChallenge = useCallback(() => {
        const randomchallengeIndex = Math.floor(Math.random() * challenges.length);
        const chalenge = challenges[randomchallengeIndex] as IChallenge;
        setActiveChallenge(chalenge);
        new Audio('/notification.mp3').play();
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${chalenge.amount}xp!`,
            });
        }
    }, []);

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
    }, []);

    const completeChallenge = useCallback(() => {
        if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(oldChallengesCompleted => oldChallengesCompleted + 1);
    }, [activeChallenge, currentExperience, experienceToNextLevel, levelUp]);

    const closeLevelModal = useCallback(() => {
        setIsLevelModalOpen(false);
    },[]);

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengeCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelModal
            }}
        >
            {children}
            {isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

export { ChallengeProvider, ChallengesContext };

