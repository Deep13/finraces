import React, { useEffect } from "react";
import Form from "../Sections/Auth/Form";
import formImage from "../assets/images/finraceformimage.jpg";
import finrace_logo from "../assets/images/finraces_logo_auth.svg";
import pattern from "../assets/images/pattern.svg";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   token && navigate("/");
  // }, []);
  return (
    <div className="w-screen h-screen  relative flex overflow-auto dark:bg-[#000924]">
      <div className="flex-1 flex justify-center items-start overflow-auto">
        <Form />
      </div>
      <div className="flex-1 h-full bg-[#171624] flex justify-center items-center relative overflow-hidden">
        <img className="absolute -top-[130px] right-0" src={pattern} alt="" />
        <img
          className="absolute -bottom-[160px] -left-8"
          src={pattern}
          alt=""
        />
        <div className="flex flex-col gap-[42px] justify center items-center">
          <img
            onClick={() => navigate("/")}
            className="w-[281px] cursor-pointer"
            src={finrace_logo}
            alt=""
          />
          <div className="flex flex-col gap-[9px] justify center items-center">
            <h2 className=" text-[1.31rem] text-white">Welcome to FinRacers</h2>
            <p className="text-[1.31rem] text-[#94cee7]">
              Sign in for better experience
            </p>

            <p className="font-bold text-lg mb-2 text-white mt-10">
              © Copyright 2025 FinRacers | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
