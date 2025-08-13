 import React, { useState, useEffect, useRef } from 'react';
import '../../styles/index.css';

const SecondsCounter = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef(null);

    // React state timer
    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
    }, [isActive]);

    //#######################################################################
    const noStateSeconds = useRef(0);
    const noStateTimerRef = useRef(null);
    const displayRefs = useRef([]);

    useEffect(() => {
        displayRefs.current = displayRefs.current.slice(0, 8);
    }, []);

    const updateNoStateDisplay = (totalSeconds) => {
        const digits = formatToDigits(totalSeconds);
        digits.forEach((char, index) => {
            if (displayRefs.current[index]) {
                displayRefs.current[index].textContent = char;
            }
        });
    };

    const resetNoStateDisplay = () => {
        const resetDigits = '00:00:00'.split('');
        resetDigits.forEach((char, index) => {
            if (displayRefs.current[index]) {
                displayRefs.current[index].textContent = char;
            }
        });
    };

    //#######################################################################
    const formatToDigits = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`.split('');
    };

    const toggleCounter = () => {
        setIsActive(!isActive);
        if (!isActive) {
            noStateTimerRef.current = setInterval(() => {
                noStateSeconds.current += 1;
                updateNoStateDisplay(noStateSeconds.current);
            }, 1000);
        } else {
            clearInterval(noStateTimerRef.current);
        }
    };

    const resetCounter = () => {
        setSeconds(0);
        setIsActive(false);
        noStateSeconds.current = 0;
        resetNoStateDisplay();
        clearInterval(noStateTimerRef.current);
    };

    return (
        <div className="counter-container">
            {/* ==================== TIMER 1 RENDER ==================== */}
            <div className="timer-section">
                <h2>1. Standard React Timer (useState)</h2>
                <div className="digit-container">
                    {formatToDigits(seconds).map((char, index) => (
                        <div
                            key={`timer1-${index}`}
                            className={`digit-box ${char === ':' ? 'colon' : 'digit'}`}
                        >
                            {char}
                        </div>
                    ))}
                </div>
                <div className="explanation">
                    Uses React state with individual digit divs. Each digit is a separate React-managed element.
                </div>
            </div>

            {/* ============== TIMERS 2 & 3 RENDER (Side by Side) ============== */}
            <div className="horizontal-timers">
                {/* ----------------- TIMER 2 RENDER ---------------- */}
                <div className="timer-section">
                    <h2>2. Digital Display (useState)</h2>
                    <div className="digit-container">
                        {formatToDigits(seconds).map((char, index) => (
                            <div
                                key={`timer2-${index}`}
                                className={`digit-box ${char === ':' ? 'colon' : 'digit'}`}
                                style={{ backgroundColor: char === ':' ? 'transparent' : '#e3f2fd' }}
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                    <div className="explanation">
                        Same state as Timer 1 but with different styling to demonstrate flexibility.
                    </div>
                </div>

                {/* ----------------- TIMER 3 RENDER ---------------- */}
                <div className="timer-section">
                    <h2>3. No-State Timer (useRef)</h2>
                    <div className="digit-container">
                        {'00:00:00'.split('').map((char, index) => (
                            <div
                                key={`timer3-${index}`}
                                ref={el => displayRefs.current[index] = el}
                                className={`digit-box ${char === ':' ? 'colon' : 'digit'}`}
                                style={{ backgroundColor: char === ':' ? 'transparent' : '#fff8e1' }}
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                    <div className="explanation">
                        Manual DOM updates using refs. No React state - updates happen outside React's render cycle.
                    </div>
                </div>
            </div>

            {/* ================= SHARED CONTROL BUTTONS ================= */}
            <div className="control-panel">
                <button
                    onClick={toggleCounter}
                    className={`control-button ${isActive ? 'stop' : 'start'}`}
                >
                    {isActive ? 'Stop All Timers' : 'Start All Timers'}
                </button>
                <button
                    onClick={resetCounter}
                    className="control-button reset"
                >
                    Reset All Timers
                </button>
            </div>
        </div>
    );
};

export default SecondsCounter;
