import React, { createContext, useState } from 'react';
import { grpc } from "@improbable-eng/grpc-web";
import { StreamEventsRequest, UUID } from '../my-protos/testapi_pb'
import { NgoAPI } from '../my-protos/testapi_pb_service'
import { environmental } from '../../environmental';
import localforage from 'localforage';

export const SalesContext = createContext({});

export default function SalesContextProvider({ children }) {
    const [ accessToken, setAccessToken ] = useState()
    const [ salesRecord, setSalesRecord ] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [customizeRecords, setCustomizeRecords] = useState()
    let grpcRequest

    const groupPostsbyUserID = (arrayGroupbyvlaue, userID) => {
        console.log("group")
        return arrayGroupbyvlaue?.reduce((result, currentValue) => {
          (result[currentValue[userID]] = result[currentValue[userID]] || []).push(
            currentValue
          );
          return result;
        }, {});
    };

    function fetchSalesRecord (){
            const sales = []
            const tentID = new UUID()
            const salesRequest = new StreamEventsRequest()
            tentID.setUuid(environmental.TENANTID)
            salesRequest.setTenantid(tentID) //ref passing tenantID as wrapper
            salesRequest.setEventtype('sales')
            salesRequest.addEventaction('create')
            salesRequest.setLastindex("0")
            setIsLoading(true)
            grpcRequest = grpc.invoke(NgoAPI.streamEvents, {
                request: salesRequest, // calling stremeventsAPI with required options
                host: environmental.HOST,
                metadata: {Authorization: `Bearer ${accessToken}`},
                onHeaders: ((header) => {
                    console.log("header", header)
                }),
                onMessage: ((message) => {
                   sales.push(message.toObject())
                    localforage.setItem("salesrecord",sales).then((records) => {
                        if(records.length > 84){
                            console.log(records)
                            setSalesRecord(records)
                            setIsLoading(false)
                            setCustomizeRecords(groupPostsbyUserID(salesRecord, "eventtype"))
                        }else{
                            setIsLoading(true)
                        }
                            
                    })
                }),
                onEnd: ((res) => {
                    console.log(res)
                })
                
            });
    }

    function handleLogout () {
        setAccessToken('')
        // grpcRequest.close()
        localforage.setItem("salesrecord",'')
    }

    const value = {
      states: {
        accessToken,
        salesRecord,
        isLoading,
        customizeRecords
      },
      actions: {
        setAccessToken,
        handleLogout,
        fetchSalesRecord,
        setIsLoading,
        groupPostsbyUserID,
        setCustomizeRecords
      },
    };

    return (
      <SalesContext.Provider value={value}>
        {children}
      </SalesContext.Provider>
    );
  }
