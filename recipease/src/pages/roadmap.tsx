import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface RoadmapProps {
    title: string;
    actions: string[];
    times: number[];
    urls: string[];
}

// just test data, actual will call the main component
const sampleData = {
    title: "Study Focus Time",
    actions: ["Start Studying", "Linear Algebra", "Break", "CS assignment", "FINISH"],
    times: [0, 1, 1, 1, 1],
    urls: ["", "#", "#", "#", "#"]
}  

const Roadmap: React.FC<RoadmapProps> = ({ title, actions, times, urls }) => {
    const router = useRouter();
    const [cumulativeTimes, setCumulativeTimes] = useState<number[]>([]);
    const [currentAction, setCurrentAction] = useState<string>(actions[0] ? actions[0] : "");
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [totalSeconds, setTotalSeconds] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        if (finished) {
          router.push('http://localhost:8501');
        }
      }, [finished]);
    
    useEffect(() => {
        let cumulative = 0;
        const newCumulativeTimes = times.map(time => {
            cumulative += time;
            return cumulative;
        });
        setCumulativeTimes(newCumulativeTimes);
        const calculatedTotalTime = times.reduce((acc, time) => acc + time, 0);
        setTotalTime(calculatedTotalTime);
        setTotalSeconds(calculatedTotalTime * 60);
        if(seconds > totalSeconds) {
            setFinished(true);
        }
    }, [times]);

    useEffect(() => {
        if(seconds > totalSeconds) {
            setFinished(true);
        }
    }, [seconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds > totalSeconds) {
                    setFinished(true);
                }
                return prevSeconds + 1;
            });
        }, 1000);
        
        // Clear the interval on component unmount
        return () => clearInterval(timer);
    }, [totalSeconds]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prevTime => {
                const newTime = prevTime + 1; 

                const actionIndex = cumulativeTimes.findIndex(ct => ct === newTime);

                if (actionIndex !== -1 && actionIndex < actions.length) {
                    setCurrentAction(actions[actionIndex]);
                    // enter jerry code for tts here
                    //var audio = new Audio('/output.mp3');
                    //audio.play();
                }

                return newTime;
            });
        }, 60000);  // 60000 ms = 1 minute. Adjust this if you want faster/slower updates.

        return () => clearInterval(timer);  // Clear the interval on component unmount
    }, [cumulativeTimes, actions]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center font-sans text-white">
            <h2 className="text-4xl font-bold mb-5">{title}</h2>
            
            {finished ? (
                <div className="text-3xl">Finished!</div>
            ) : (
                <>
                    <h3 className="mb-5 text-2xl">Timer: {elapsedTime} mins elapsed</h3>
                    <ul className="w-4/5 flex flex-col gap-10 items-center h-auto relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 border-l-2 border-white h-full z-0"></div>
                        <img
                            src="/images/treasurechest.png"
                            className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full z-10"
                            style={{ 
                                top: `calc(${(seconds / totalSeconds) * 85}%)`, 
                                transition: 'top 0.3s linear'
                            }}
                        />
                        {actions.map((action, index) => (
                            <li 
                                key={index} 
                                className={`w-1/3 relative z-10 p-4 bg-gray-700 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 bg-gradient-to-r from-red-500 to-yellow-500 ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
                            >
                                <div className={`flex items-center w-full ${index % 2 === 0 ? 'self-start' : 'justify-start'}`}>
                                    <div className="flex flex-col">
                                        <span className={`text-lg ${currentAction === action ? 'font-bold' : ''}`}>{action}</span>
                                        {cumulativeTimes[index] > elapsedTime && 
                                            <p className="text-sm mt-1">in {cumulativeTimes[index] - elapsedTime} mins</p>
                                        }
                                        {cumulativeTimes[index] + times[index] <= elapsedTime && 
                                            <p className="text-sm mt-1 text-yellow-400">FINISHED</p>
                                        }
                                    </div>
                                    <img src="https://img.icons8.com/ios/50/000000/checked.png" alt="checked icon" className={`mx-5 w-10 h-10 ${currentAction === action ? 'animate-bounce' : ''}`} />
                                </div>
                            </li>
                        ))}

                    </ul>
                    <div className="mt-8 text-2xl">Total Time: {totalTime} mins</div>
                </>
            )}
        </div>
    );
    
};

// Use the sample data
const RoadmapUsage = () => {
    return <Roadmap {...sampleData} />
}

export default RoadmapUsage;
