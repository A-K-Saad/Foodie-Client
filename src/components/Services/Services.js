import React from "react";
import CountUp from "react-countup";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
          <div className="flex items-center justify-center counter">
            <div className="px-5 py-10 bg-white border border-gray-300 w-full">
              <h1 className="font-black text-5xl fw-bold">
                <CountUp end={325} suffix="+" duration={5} />
              </h1>
              <p className="pt-3 text-red-700">Clients</p>
            </div>
          </div>
          <div className="flex items-center justify-center counter">
            <div className="px-5 py-10 bg-white border border-gray-300 w-full">
              <h1 className="font-black text-5xl fw-bold">
                <CountUp end={2400} suffix="+" duration={5} />
              </h1>
              <p className="pt-3 text-red-700">Resulation</p>
            </div>
          </div>
          <div className="flex items-center justify-center counter">
            <div className="px-5 py-10 bg-white border border-gray-300 w-full">
              <h1 className="font-black text-5xl fw-bold">
                <CountUp end={200} suffix="+" duration={5} />
              </h1>
              <p className="pt-3 text-red-700">Flights</p>
            </div>
          </div>
          <div className="flex items-center justify-center counter">
            <div className="px-5 py-10 bg-white border border-gray-300 w-full">
              <h1 className="font-black text-5xl fw-bold">
                <CountUp end={55} suffix="+" duration={5} />
              </h1>
              <p className="pt-3 text-red-700">Projects</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
