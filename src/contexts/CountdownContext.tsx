import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown(): void;
    resetCountdown(): void;
    
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState<number>(0.1 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    const minutes = useMemo<number>(() => Math.floor(time / 60), [time]);
    const seconds = useMemo<number>(() => time % 60, [time]);


    const startCountdown = useCallback(() => {
        setIsActive(true);
    }, []);

    const resetCountdown = useCallback(() => {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }, []);

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
        else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider
            value={{
                hasFinished,
                isActive,
                minutes,
                seconds,
                startCountdown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}