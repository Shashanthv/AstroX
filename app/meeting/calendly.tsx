"use client";

import { InlineWidget } from "react-calendly";

const Calendly = () => {
  // You can update this URL to your actual Calendly URL
  const CALENDLY_URL = "https://calendly.com/shashanth2k/30min";

  return (
    <div className="w-full h-full min-h-[600px]">
      <InlineWidget
        styles={{ 
          height: "600px",
          width: "100%",
          minHeight: "600px"
        }}
        url={CALENDLY_URL}
      />
    </div>
  );
};

export default Calendly;