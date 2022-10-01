import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import { useEffect } from "react";

const headerVariants: Variants = {
  top: {
    filter: "blur(0px)",
  },
  scrolled: {
    filter: "blur(10px)",
  },
};

function Header() {
  const { scrollY } = useScroll();
  const headerAnimation = useAnimation();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAnimation.start("scrolled");
      } else {
        headerAnimation.start("top");
      }
    });
  }, [scrollY]);

  return (
    <motion.header
      variants={headerVariants}
      animate={headerAnimation}
      initial="top"
      className="fixed top-0 w-full text-center pt-6 mb-6 select-none -z-20"
    >
      <h1>
        {"Ambient Sound Player".split("").map((letter, index) => (
          <span
            key={"header" + index}
            style={{
              textShadow: ` 0 0 5px white,
                  0 0 10px white, 
                  0 0 20px white, 
                  0 0 30px white`,
              transition: `text-shadow ease-out 300ms ${30 * index}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </motion.header>
  );
}

export default Header;
