import { useEffect } from 'react'
import { grpc } from "@improbable-eng/grpc-web";
import { StreamEventsRequest, UUID } from './my-protos/testapi_pb'
import {NgoAPI} from './my-protos/testapi_pb_service'
import { environmental } from '../environmental';

const SalesRecord = ({ OBTAINED_TOKEN, setAccessToken }) => {

    useEffect(() => {
        const salesRequest = new StreamEventsRequest()
        // const tentID = new UUID()
        // tentID.setUuid(environmental.TENANTID)
        salesRequest.setTenantid(environmental.TENANTID) //ref passing tenantID "4a5cb02a-72e1-4ba7-a237-10946261a13f"
        salesRequest.setEventtype('sales')
        salesRequest.addEventaction('create')
        salesRequest.setLastindex(0)
        grpc.invoke(NgoAPI.streamEvents, { // calling stremeventsAPI with required options
              host: environmental.HOST,
              metadata: {Authorization: `Bearer ${OBTAINED_TOKEN}`}, // passing the prop token obtained from login
              onHeaders: ((headers) => {
                console.log("onHeaders", headers);
              }),
              onMessage: ((message) => {
                console.log("onMessage", message);
              }),
              onEnd: res => {
                console.log(res)
                const { status, statusMessage, trailers } = res;
                console.log("onEnd", status, statusMessage, trailers);
              }
            });
    },[])
    

    return (
        <div>
            <h1>hiiiiii {OBTAINED_TOKEN}</h1>
            <button className="bg-green-500 float-right hover:bg-green-700 
                            text-white uppercase text-sm font-semibold 
                            px-4 py-2 rounded"
            onClick={() => setAccessToken('')}
            >
              LOGOUT
            </button>
        </div>
    )
}

export default SalesRecord
