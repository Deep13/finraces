import React, { useState, useEffect } from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressDemo = ({progress=0}) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         const newProgress = oldProgress + 10;
//         if (newProgress >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return newProgress;
//       });
//     }, 500);

//     return () => clearInterval(timer);
//   }, []);

  return (
    <Progress.Root className="relative overflow-hidden bg-slate-200 rounded-full w-full h-2" value={progress}>
      <Progress.Indicator className="bg-blue-500 w-full h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${100 - progress}%)` }} />
    </Progress.Root>
  );
};

export default ProgressDemo;