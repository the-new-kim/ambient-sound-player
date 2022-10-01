import { useRecoilValue } from "recoil";
import { PlayerState } from "../atoms";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import React, { useEffect } from "react";

const introVariants: Variants = {
  top: {
    filter: "blur(0px)",
  },
  scrolled: {
    filter: "blur(10px)",
  },
};

const overlayVariants: Variants = {
  top: {
    background: "rgba(0,0,0,0)",
  },
  scrolled: {
    background: "rgba(0,0,0,0.5)",
  },
};

const arrowDownVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: (index) => {
    const delay = 0.5 + index * 0.4;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 0.4 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

interface IIntoProps {
  isDataLoading: boolean;
  setIsScrollable: React.Dispatch<React.SetStateAction<boolean>>;
}

function Intro({ isDataLoading, setIsScrollable }: IIntoProps) {
  const player = useRecoilValue(PlayerState);
  const { scrollY } = useScroll();
  const scrollAnimation = useAnimation();
  const arrowAnimation = useAnimation();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 200) {
        scrollAnimation.start("scrolled");
      } else {
        scrollAnimation.start("top");
      }
    });
  }, [scrollY]);

  useEffect(() => {
    if (isDataLoading) return;
    arrowAnimation.start("visible");
  }, [isDataLoading]);

  return (
    <motion.section
      variants={introVariants}
      animate={scrollAnimation}
      initial="top"
      className="sticky top-0 select-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]
      flex flex-col justify-center items-center 
      "
    >
      <h1 className="text-center mb-10">
        {"Ambient Sound Player".split("").map((letter, index) =>
          letter !== " " ? (
            <span
              style={{
                textShadow: !player.isDataLoading
                  ? `0 0 3px white,
                     0 0 5px white, 
                     0 0 20px white, 
                     0 0 30px white,
                     5px 5px 5px black`
                  : `1px 1px 2px black`,
                transition: `text-shadow ease-out 300ms ${30 * index}ms`,
              }}
              key={"siteTitle" + index}
            >
              {letter}
            </span>
          ) : (
            <br key={"siteTitme" + index} />
          )
        )}
      </h1>

      <a href="#0" className="relative p-1 flex flex-col w-10 ">
        <motion.svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 200"
          width="150px"
          initial="hidden"
          animate="visible"
          style={{ width: "100%", overflow: "visible" }}
        >
          <motion.polyline
            variants={arrowDownVariants}
            animate={arrowAnimation}
            initial="hidden"
            custom={1}
            points="10,10 75,90 140,10"
            stroke="white"
            strokeWidth="10"
            strokeLinejoin="round"
            fill="none"
            style={{
              filter:
                "drop-shadow(0 0 5px white) drop-shadow(0 0 10px white) drop-shadow(0 0 20px white)",
            }}
          />
          <motion.polyline
            onAnimationComplete={() => {
              setIsScrollable(true);
            }}
            variants={arrowDownVariants}
            animate={arrowAnimation}
            initial="hidden"
            custom={2}
            points="10,110 75,190 140,110"
            stroke="white"
            strokeWidth="10"
            strokeLinejoin="round"
            fill="none"
            style={{
              filter:
                "drop-shadow(0 0 5px white) drop-shadow(0 0 10px white) drop-shadow(0 0 20px white)",
            }}
          />
        </motion.svg>
      </a>

      <motion.div
        variants={overlayVariants}
        animate={scrollAnimation}
        initial="top"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    </motion.section>
  );
}

export default Intro;
