import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import { useEffect } from "react";

const scrollVariants: Variants = {
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

const loadingAndArrowVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (index) => {
    const delay = index % 2 === 0 ? 0 : 0.5;
    return {
      opacity: 1,
      transition: {
        delay,
        repeat: Infinity,
        duration: 1,
      },
    };
  },
};

interface IIntoProps {
  isDataLoading: boolean;
}

function Intro({ isDataLoading }: IIntoProps) {
  const { scrollY } = useScroll();
  const scrollAnimation = useAnimation();
  const arrowAnimation = useAnimation();
  const loadingAnimation = useAnimation();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 200) {
        scrollAnimation.start("scrolled");
      } else {
        scrollAnimation.start("top");
      }
    });
  }, [scrollY, scrollAnimation]);

  useEffect(() => {
    if (isDataLoading) {
      loadingAnimation.start("animate");
    } else {
      arrowAnimation.start("animate");
      loadingAnimation.start("initial");
    }
  }, [isDataLoading, arrowAnimation, loadingAnimation]);

  return (
    <motion.section
      variants={scrollVariants}
      animate={scrollAnimation}
      initial="top"
      className="sticky top-0 select-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]
      flex flex-col justify-center items-center 
      "
    >
      <motion.h1
        initial="initial"
        animate="animate"
        className="text-center mb-10 p-20"
        style={{
          borderRadius: "50%",
          boxShadow: !isDataLoading
            ? `0 0 5px rgba(242,242,242,0.8), 
             0 0 20px rgba(242,242,242,0.6),
             inset 0 0 5px rgba(242,242,242,0.8), 
             inset 0 0 20px rgba(242,242,242,0.6), 
             3px 3px 4px rgba(0,0,0,0.8)`
            : `0 0 5px rgba(0,0,0,0.2), 
            0 0 20px rgba(0,0,0,0.2),
            inset 0 0 5px rgba(0,0,0,0.2), 
            inset 0 0 20px rgba(0,0,0,0.2), 
            3px 3px 4px rgba(0,0,0,0.2)`,
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: !isDataLoading
            ? "rgba(242,242,242,1)"
            : "rgba(122,122,122,1)",
          transition: `box-shadow ease-out 300ms 1000ms, border-color ease-out 300ms 1000ms`,
        }}
      >
        {"Ambient Sound Player".split("").map((letter, index) =>
          letter !== " " ? (
            <motion.span
              style={{
                color: !isDataLoading
                  ? "rgba(242,242,242,1)"
                  : "rgba(122,122,122,1)",
                textShadow: !isDataLoading
                  ? `0 0 3px rgba(242,242,242,0.8),
                     0 0 5px rgba(242,242,242,0.7), 
                     0 0 20px rgba(242,242,242,0.6), 
                     0 0 30px rgba(242,242,242,0.5),
                     3px 3px 4px rgba(0,0,0,0.8)`
                  : `3px 3px 4px rgba(0,0,0,0.8)`,
                transition: `text-shadow ease-out 300ms ${30 * index}ms, 
                color ease-out 300ms ${30 * index}ms`,
              }}
              key={"siteTitle" + index}
            >
              {letter}
            </motion.span>
          ) : (
            <br key={"siteTitme" + index} />
          )
        )}
      </motion.h1>
      <div className="relative">
        {"Loading...".split("").map((letter, index) => (
          <span
            className="relative text-[rgba(0,0,0,0)]"
            key={"loading" + index}
          >
            {/* off */}
            <span
              className="absolute top-0 bottom-0 left-0 right-0 m-auto"
              style={{
                color: "rgba(122,122,122,1)",
                textShadow: "3px 3px 4px rgba(0,0,0,0.8)",
              }}
            >
              {letter}
            </span>

            {/* on */}
            <motion.span
              variants={loadingAndArrowVariants}
              initial="initial"
              animate={loadingAnimation}
              custom={index}
              style={{
                opacity: isDataLoading ? 1 : 0,
                color: "rgba(242,242,242,1)",
                textShadow: `0 0 3px rgba(242,242,242,0.8),
                  0 0 5px rgba(242,242,242,0.7), 
                  0 0 20px rgba(242,242,242,0.6), 
                  0 0 30px rgba(242,242,242,0.5),
                  3px 3px 4px rgba(0,0,0,0.8)`,
              }}
              className="absolute top-0 bottom-0 left-0 right-0 m-auto"
            >
              {letter}
            </motion.span>

            {letter}
          </span>
        ))}
        <a
          href="#0"
          className={`absolute top-0 left-0 right-0 m-auto w-10 ${
            isDataLoading && "pointer-events-none"
          }`}
        >
          {/* off */}
          <motion.span
            style={{
              color: "rgba(122,122,122,1)",
              textShadow: "-3px -3px 4px rgba(0,0,0,0.8)",
            }}
            className="absolute top-0 rotate-180"
          >
            ^
          </motion.span>
          <motion.span
            style={{
              color: "rgba(122,122,122,1)",
              textShadow: "-3px -3px 4px rgba(0,0,0,0.8)",
            }}
            className="absolute -top-3 sm:-top-4 md:-top-5 lg:-top-6 rotate-180"
          >
            ^
          </motion.span>

          {/* on */}
          <motion.span
            variants={loadingAndArrowVariants}
            initial="initial"
            animate={arrowAnimation}
            custom={1}
            style={{
              opacity: !isDataLoading ? 1 : 0,
              color: "rgba(242,242,242,1)",
              textShadow: `0 0 3px rgba(242,242,242,0.8),
                  0 0 5px rgba(242,242,242,0.7), 
                  0 0 20px rgba(242,242,242,0.6), 
                  0 0 30px rgba(242,242,242,0.5),
                  -3px -3px 4px rgba(0,0,0,0.8)`,
            }}
            className="absolute top-0 rotate-180"
          >
            ^
          </motion.span>
          <motion.span
            variants={loadingAndArrowVariants}
            initial="initial"
            animate={arrowAnimation}
            custom={2}
            style={{
              opacity: !isDataLoading ? 1 : 0,
              color: "rgba(242,242,242,1)",
              textShadow: `0 0 3px rgba(242,242,242,0.8),
                  0 0 5px rgba(242,242,242,0.7), 
                  0 0 20px rgba(242,242,242,0.6), 
                  0 0 30px rgba(242,242,242,0.5),
                  -3px -3px 4px rgba(0,0,0,0.8)`,
            }}
            className="absolute -top-3 sm:-top-4 md:-top-5 lg:-top-6 rotate-180"
          >
            ^
          </motion.span>
        </a>
      </div>

      <motion.div
        variants={overlayVariants}
        animate={scrollAnimation}
        initial="top"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    </motion.section>
  );
}

export default Intro;
