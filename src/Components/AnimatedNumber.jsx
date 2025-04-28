import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ from = 0, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.5, // you can adjust the speed here
      ease: "easeOut",
    });
    return controls.stop;
  }, [to]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedNumber;
