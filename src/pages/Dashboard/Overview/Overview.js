import React from "react";
import Services from "../../../components/Services/Services";

const Overview = () => {
  return (
    <>
      <div className="h-full w-full">
        <div className="md:py-9">
          <div className="flex items-center justify-center px-8">
            <Services></Services>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
