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
    const [evenType, setEvenType] = useState([])
    const [customizeRecords, setCustomizeRecords] = useState()
    let grpcRequest

    const groupPostsbyUserID = (arrayGroupbyvlaue, userID) => {
        // grouping based on eventype before display
        return arrayGroupbyvlaue?.reduce((result, currentValue) => {
          (result[currentValue[userID]] = result[currentValue[userID]] || []).push(
            currentValue
          );
          return result;
        }, {});
    };

    const timeout = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  

    function fetchSalesRecord (eventAction){
            const sales = []
            const tentID = new UUID()
            const salesRequest = new StreamEventsRequest()
            tentID.setUuid(environmental.TENANTID)
            salesRequest.setTenantid(tentID) //ref passing tenantID as wrapper
            salesRequest.setEventtype('sales')
            salesRequest.addEventaction(eventAction)
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
                        if(records.length > 10){
                            setSalesRecord(records)
                            setIsLoading(false)
                        }else{
                            setIsLoading(true)
                        }
                            
                    }).then(() =>{
                        if(customizeRecords){
                          setCustomizeRecords(groupPostsbyUserID(salesRecord, "eventtype"))
                          Object.entries(customizeRecords).map(([key, value]) => {
                            if(evenType.includes(key) === false){
                              const _eventType = [...evenType]
                              _eventType.push(key)
                              setEvenType(_eventType)
  
                            }
                          })
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
        customizeRecords,
        evenType
      },
      actions: {
        setAccessToken,
        handleLogout,
        fetchSalesRecord,
        setIsLoading,
        groupPostsbyUserID,
        setCustomizeRecords,
        setEvenType
      },
    };

    return (
      <SalesContext.Provider value={value}>
        {children}
      </SalesContext.Provider>
    );
  }
