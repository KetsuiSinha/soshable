import React from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgimage from "../../public/bg.jpg";
import CountUp from "react-countup";
import Footer from "../components/Footer";

// Scroll Animation Component
const ScrollAnimation = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { signUpWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signUpWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const gradientVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.div
        style={{
          background: `url(${bgimage})`,
        }}
        variants={gradientVariants}
        initial="initial"
        animate="animate"
        className="bg-cover bg-center h-screen w-full relative"
      >
        <img
          src="/nat1.png"
          className="absolute w-28 top-5 left-5 sm:w-40 md:w-52 rotate-12"
          alt=""
        />
        <img
          src="/nat2.png"
          className="absolute w-28 top-17 right-5 sm:w-40 md:right-30 md:w-52 -rotate-12"
          alt=""
        />
        <img
          src="/nat3.png"
          className="absolute w-28 bottom-12 right-10 sm:w-40 md:w-52 rotate-10"
          alt=""
        />
        <img
          src="/nat3.png"
          className="absolute w-28 bottom-12 left-10 md:left-25 sm:w-40 md:w-52 -rotate-10"
          alt=""
        />
        <div className="w-full h-screen flex flex-col justify-center items-center gap-5 sm:p-6">
          <img src="/garden.png" className="w-52 md:w-2xs" alt="" />
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold z-10 text-white clash"
          >
            SOSHABLE
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-[white] chill"
          >
            Building Stronger Communities Together
          </motion.p>

          <div className="flex justify-center items-center gap-3 sm:gap-5 mb-8">
            <motion.button
              onClick={handleLogin}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="px-4 sm:px-5 py-1 text-sm sm:text-base rounded-full border-[1px] border-black text-white bg-black/70 chill"
            >
              Login
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="px-4 sm:px-5 py-1 text-sm sm:text-base rounded-full border-[1px] border-black text-white bg-black/70 chill"
            >
              <a href="#about">About Us</a>
            </motion.button>
          </div>
        </div>

        <ScrollAnimation>
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 p-10 md:gap-10">
            <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left max-w-xl">
              <p className="clash font-semibold text-2xl md:text-5xl" id="about">
                About Us
              </p>
              <p className="chill text-justify font-medium text-xl sm:text-lg md:text-xl text-gray-700">
                At Soshable, we believe in the power of communities to drive
                meaningful change. Our mission is to provide a transparent and
                impactful platform where individuals can create, support, and
                track the progress of community-driven projects.
              </p>
            </div>
            <img
              className="h-full w-full sm:h-32 sm:w-32 md:h-80 md:w-auto rounded-md object-cover"
              src="/pic2.jpg"
              alt="Soshable About"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="clash font-semibold text-2xl md:text-5xl p-10 text-center md:text-left">
            Our Statistics
          </p>
          <div className="flex flex-col items-center justify-between gap-8 p-6 sm:p-10 md:flex-row md:gap-10 lg:gap-16">
            {/* Total Contributions */}
            <div className="text-white flex flex-col items-center justify-center gap-2 bg-green-950 p-5 rounded-md">
              <p className="clash text-lg sm:text-xl md:text-2xl text-center">
                Total Contributions
              </p>
              <p className="chill text-xl sm:text-2xl md:text-3xl">
                <CountUp start={0} end={100} duration={5} suffix="+" />
              </p>
            </div>

            {/* Total Communities */}
            <div className="flex text-white flex-col items-center justify-center gap-2 bg-green-950 p-5 rounded-md">
              <p className="clash text-lg sm:text-xl md:text-2xl text-center">
                Total Communities
              </p>
              <p className="chill text-xl sm:text-2xl md:text-3xl">
                <CountUp start={0} end={70} duration={2.5} suffix="+" />
              </p>
            </div>

            {/* Total Projects */}
            <div className="text-white flex flex-col items-center justify-center gap-2 bg-green-950 p-5 rounded-md">
              <p className="clash text-lg sm:text-xl md:text-2xl text-center">
                Total Projects
              </p>
              <p className="chill text-xl sm:text-2xl md:text-3xl">
                <CountUp start={0} end={120} duration={3} suffix="+" />
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="clash font-semibold text-2xl md:text-5xl p-10 text-center md:text-left">
            Meet Our Team
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10">
            {/* Team Card Component - repeated for each team member */}
            {[
              {
                name: "Nishchay Sinha",
                image: "./nischay.jpeg",
                description: "Avid reader, passionate coder.",
                linkedin: "https://www.linkedin.com/in/nishchay-sinha-87aa37260/"
              },
              {
                name: "Pinank Trivedi",
                image: "./pinank.jpeg",
                description: "Calm like a river, strong like a mountain.",
                linkedin: "https://www.linkedin.com/in/pinank-trivedi-41b29325b/"
              },
              {
                name: "Vignesh Alle",
                image: "./vighnesh.jpeg",
                description: "Strong Core as Always.",
                linkedin: "https://www.linkedin.com/in/vignesh-alle-b95411236"
              },
              {
                name: "Ayush Khalate",
                image: "./ayush.jpeg",
                description: "Full Stack Developer with Good humor?",
                linkedin: "https://www.linkedin.com/in/ayushkhalate/"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={member.image}
                    alt={`${member.name}'s picture`}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                </div>
                <div className="px-6 py-4">
                  <motion.div
                    className="font-bold text-xl mb-2 text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {member.name}
                  </motion.div>
                  <motion.p
                    className="text-gray-600 text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {member.description}
                  </motion.p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <motion.span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#e2e8f0" }}
                  >
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
        <Footer />
      </motion.div>
    </>
  );
};

export default LandingPage;