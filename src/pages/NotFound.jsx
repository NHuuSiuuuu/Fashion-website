import React from "react";
import Lottie from "lottie-react";
import Error404 from "../components/comon/404 Page.json";
const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Lottie
          animationData={Error404}
          loop={true}
          style={{ width:400, height: 400 }}
        />
        <h1 className="text-xl font-bold md:text-3xl">Oops! Trang không tồn tại</h1>
      </div>
    </div>
  );
};

export default NotFound;
