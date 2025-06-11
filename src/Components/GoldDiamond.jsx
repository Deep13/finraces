import { useState } from "react";
import { motion } from "framer-motion";

const GoldenDiamond = () => {
    const [rotate, setRotate] = useState(0);

    return (
        <motion.svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                cursor: "pointer",
            }}
            animate={{ rotate }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            onClick={() => setRotate(rotate + 360)}
        >
            {/* Main Diamond */}
            <polygon points="12,2 4,12 12,18 20,12" fill="gold" stroke="orange" strokeWidth="1" />

            {/* Bottom Reflection */}
            <polygon points="12,18 4,12 12,22 20,12" fill="orange" opacity="0.8" />

            {/* Sparkles */}
            {/* <motion.circle
                cx="6"
                cy="6"
                r="1.5"
                fill="white"
                opacity="0.8"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.circle
                cx="18"
                cy="6"
                r="1.5"
                fill="white"
                opacity="0.8"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <motion.circle
                cx="12"
                cy="3"
                r="1.2"
                fill="white"
                opacity="0.8"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.circle
                cx="16"
                cy="15"
                r="1"
                fill="white"
                opacity="0.8"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.3 }}
            /> */}
        </motion.svg>
    );
};

export default GoldenDiamond;
