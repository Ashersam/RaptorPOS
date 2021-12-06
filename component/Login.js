import {grpc} from "@improbable-eng/grpc-web";
import { useContext, useState } from "react";
import React from "react";
import { NgoAuth } from "./my-protos/testauth_pb_service";
import { LoginUserRequest } from "./my-protos/testauth_pb";
import { environmental } from "../environmental";
import SalesRecord from "./SalesRecord";
import { SalesContext } from "./context/SalesContext";

const Login = () => {
    const [userID, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const {
      states: {
        accessToken,
      },
      actions: {
        setAccessToken
      }
    } = useContext(SalesContext);

    const handleLogin = (e, username, pass) => {
        e.preventDefault()
        const getLoginUserRequest = new LoginUserRequest();
        getLoginUserRequest.setUserid(username)
        getLoginUserRequest.setPassword(pass)
        grpc.unary(NgoAuth.loginUser , {
          request: getLoginUserRequest,
          host: environmental.HOST,
          onEnd: res => {
            const { status, statusMessage, message } = res;
              setErrorMsg(statusMessage)
                if (status === grpc.Code.OK && message) {
                  console.log("Got access token ");
                  setAccessToken(message.toObject().accesstoken)
                }
          }
        });
    } 
    
    
        return (
          <>
              {accessToken ? (
                  <SalesRecord />
                ) : (
                  <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                      <span className="block w-full text-xl uppercase font-bold mb-3">Login</span>
                      {errorMsg && (
                        <span className="flex truncate items-center font-medium tracking-wide width-10 text-red-500 text-xs mt-1 mb-2 2ml-1">
			                  {errorMsg}
		                    </span>  
                        )}
                        <form className="mb-4" action="/" method="post">
                          <div className="mb-4 md:w-full">
                            <label className="block text-xs mb-1">UserID</label>
                              <input 
                              className="w-full 
                              border rounded p-2 outline-none focus:shadow-outline" 
                              name="email"
                              value={userID}
                              onChange={(e) => setUserId(e.target.value)}
                              placeholder="UserId" />
                          </div>
                          <div className="mb-6 md:w-full">
                            <label htmlFor="password" className="block text-xs mb-1">
                            Password
                            </label>
                              <input 
                              className="w-full border rounded p-2 outline-none 
                              focus:shadow-outline" 
                              type="password" 
                              name="password" 
                              id="password" 
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} 
                              />
                          </div>
                          <button className="bg-blue-500 hover:bg-blue-700 
                            text-white uppercase text-sm font-semibold 
                            px-4 py-2 rounded"
                            onClick={(e) => handleLogin(e, userID, password)}>
                            Login
                          </button>
                        </form>
                    </div>
                  </div>
                )}
            </>
        )
}
 
export default Login;