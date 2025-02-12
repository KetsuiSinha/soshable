import React from "react";
import AnimatedCursor from "react-animated-cursor";

const Animated = () => {
  return (
    <>
      <div className="hidden lg:block">
        <AnimatedCursor
          innerSize={12}
          outerSize={0}
          innerScale={1.7}
          outerScale={1.7}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: "brown",
          }}
          outerStyle={{
            border: "3px solid brown",
          }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
      </div>
    </>
  );
};

export default Animated;