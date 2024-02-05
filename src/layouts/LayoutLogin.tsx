import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { GoogleLogin as GoogleAuth } from "react-google-login";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import useWindowWidth from "../hooks/useWindowSize";
import { useEffect, useState } from "react";

const Login = () => {
  const windowSize = useWindowWidth();
  const [buttonWidth, setButtonWidth] = useState(0);

  const smBreakpoint = 768;

  useEffect(() => {
    let wSize = windowSize < smBreakpoint ? windowSize : 204;
    setButtonWidth(wSize);
  }, [windowSize]);

  console.log("Window Size:", windowSize);
  // const googleLogin = u  seGoogleLogin({
  //   onSuccess: async (credentialResponse: any) => {
  //     if (!credentialResponse.credential) return;
  //     let googleData: { name: string; email: string } = jwtDecode(
  //       credentialResponse.credential
  //     );
  //     const data = {
  //       username: googleData.name,
  //       email: googleData.email,
  //     };
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_BACKEND_API}/login`,
  //         data
  //       );
  //       if (res.data.message === "Success") {
  //         console.log("Success");
  //         setUser(JSON.stringify(data));
  //       } else {
  //         console.log("Fail");
  //       }
  //     } catch (error) {
  //       console.error("Login Failed", error);
  //     }
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });

  const { user, setUser }: any = useUser();
  if (user && user !== "none") {
    return <Navigate to="/app" />;
  }

  // const handleLoginClick = () => {
  //   googleLogin();
  // };

  const onLogin = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    let googleData: { name: string; email: string } = jwtDecode(
      credentialResponse.credential
    );
    const data = {
      username: googleData.name,
      email: googleData.email,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/login`,
      data
    );
    if (res.data.message === "Success") {
      console.log("Success");
    } else {
      console.log("Fail");
    }
    setUser(JSON.stringify(data));
  };

  return (
    <div className="p-10 w-full h-screen bg-black font-chakra">
      <div className="w-full h-full flex flex-row justify-between items-center">
        <div className="w-[380px] h-full px-16 py-10 bg-darkPrimary rounded-tl-lg rounded-bl-lg sm:w-full sm:rounded-tr-lg sm:rounded-br-lg sm:px-8">
          <div className="flex flex-col justify-between items-center gap-12 w-full">
            <div className="w-full flex flex-col gap-2 items-center">
              <img src="./favicon.ico" className="w-[64px]" alt="logo" />
              <div className="text-md font-bold">Sign up or Login with</div>
              {/* <button onClick={handleLoginClick}>Login with Google</button> */}
              <div className="w-full">
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    onLogin(credentialResponse)
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  width={`${buttonWidth}px`}
                />
              </div>
              <Link
                to="https://discord.com/invite/starkmeta"
                className="bg-white flex px-3 py-2 rounded-[4px] items-center cursor-pointer w-full gap-2"
              >
                <Icon icon="ic:round-discord" className="text-black w-6 h-6" />
                <span className="flex w-full place-content-left text-black text-[14px] font-medium">
                  Discord
                </span>
              </Link>
            </div>
            <div className="h-[1px] w-full relative bg-white/10 flex items-center justify-center">
              <div className="flex text-[12px] items-center justify-center rounded-[50%] absolute z-10 w-[32px] h-[32px] bg-darkPrimary border border-white/10">
                OR
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[14px] font-medium lg:text-s text-white select-none">
                  Email
                </label>
                <input
                  placeholder="name@host.com"
                  className="text-[14px] w-full rounded-[4px] h-10 px-3.5 py-2 bg-black/25 appearance-none outline-none invalid:focus:border-danger-primary placeholder:text-light-secondary text-white disabled:text-opacity-60 disabled:cursor-not-allowed"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium lg:text-s text-white select-none">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="text-[14px] rounded-[4px] px-3.5 py-2 h-10 bg-black/25 appearance-none outline-none invalid:focus:border-danger-primary placeholder:text-light-secondary text-white disabled:text-opacity-60 disabled:cursor-not-allowed"
                ></input>
              </div>
              <span className="">
                <Link
                  to="/reset-password"
                  className="text-[14px] text-indigo-400"
                >
                  Forgot your password?
                </Link>
              </span>
              <div className="pt-[6px]">
                <button className="button-color w-full h-12 text-[14px] rounded-[4px]">
                  Sign in
                </button>
              </div>
              <span className="w-full flex flex-row gap-2 items-center justify-center pt-[6px]">
                <span className="text-[14px]">Need an account?</span>
                <Link to="/register" className="text-[14px] text-indigo-400">
                  Sign up
                </Link>
              </span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className="w-full background-board rounded-tr-lg rounded-br-lg sm:hidden"></div>
      </div>
    </div>
  );
};

export default Login;
