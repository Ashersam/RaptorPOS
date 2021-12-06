import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import { useContext, useEffect, useState } from 'react'
import Accordion from './Accordion';
import { SalesContext } from './context/SalesContext';
import LoadingScreen from './LoadingScreen';

const SalesRecord = () => {
  const {
    states: {
      salesRecord,
      isLoading,
      customizeRecords
    },
    actions: {
      handleLogout,
      fetchSalesRecord,
    }
  } = useContext(SalesContext);

  useEffect(() => {
    fetchSalesRecord() // api fetch on comp load
  }, [])

  // customizing the 
  const salesSummaryGroup = (
    <>
    {customizeRecords && Object.entries(customizeRecords).map(([key, value]) =>(
      <>
      {key=== 'sales_summary' && (
        <section classNameName="py-1 bg-blue Gray-50">
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <tr>
                    {value[0].eventtupleList.map((headers, index) => (
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          {headers.key}
                          </th>
                      ))}
                    </tr>
                    <tbody>
                        {value?.map((val, index) => (
                          <tr>
                          {val.eventtupleList.map(orderdetails => ( 
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {orderdetails.value}
                            </td>
                          ))}
                          </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </section>
      )}
      </>
    ))}
    </>
  )

  const orderItemGroup = (
    <>
    {customizeRecords && Object.entries(customizeRecords).map(([key, value]) =>(
      <>
      {key=== 'order_item' && (
        <section className="py-1 bg-blue Gray-50">
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <tr>
                    {value[0].eventtupleList.map((headers) => (
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          {headers.key}
                          </th>
                      ))}
                    </tr>
                    <tbody>
                        {value?.map((val) => (
                          <tr>
                          {val.eventtupleList.map(orderdetails => ( 
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {orderdetails.value}
                            </td>
                          ))}
                          </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </section>
      )}
      </>
    ))}
    </>
  )

  const ordersGroup = (
    <>
    {customizeRecords && Object.entries(customizeRecords).map(([key, value]) =>(
      <>
      {key=== 'order' && (
        <section className="py-1 bg-blueGray-50">
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <tr>
                    {value[0].eventtupleList.map((headers, index) => (
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          {headers.key}
                          </th>
                      ))}
                    </tr>
                    <tbody>
                        {value?.map((val, index) => (
                          <tr>
                          {val.eventtupleList.map(orderdetails => ( 
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {orderdetails.value}
                            </td>
                          ))}
                          </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </section>
      )}
      </>
    ))}
    </>
  )

    return (
        <>
        <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
            <div className="flex space-x-7 m-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-30" />
                <span className="font-semibold uppercase text-gray-500 text-lg">
                   Sales Record
                 </span>
            </div>
                <button 
                    className="bg-red-500 float-right hover:bg-red-700 
                    text-white uppercase text-sm font-semibold 
                    px-4 m-3 py-2 rounded"
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>
            </div>
        </div>
        </nav>
        
        <div>
        </div>
        {isLoading===false && salesRecord ? (
          <>
          <Accordion open={true} title='orderItem' groupElement={orderItemGroup} />
          <Accordion open={true} title='sales_summary' groupElement={salesSummaryGroup} />
          <Accordion open={false} title='orders' groupElement={ordersGroup} />
          </>
        ): (
            <div className='justify-between m-80'>
          <LoadingScreen />
          </div>
        )}
        </>
    )
}

export default SalesRecord
