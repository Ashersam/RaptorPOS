import { useCallback, useContext, useEffect, useState } from 'react'
import Accordion from './Accordion';
import { SalesContext } from './context/SalesContext';
import { ChevronDownIcon, SearchCircleIcon } from '@heroicons/react/solid';
import LoadingScreen from './LoadingScreen';
import DropDown from './DropDown';

const SalesRecord = () => {

  const [filterList, setFilterList] = useState([])
  const [selectedfilter, setSelectedFilter] = useState('')
  const [query, setQuery ] = useState("")
  const [filteredData, setFilteredData] = useState()
  const [eventAction, setEventAction] = useState('create')
  const {
    states: {
      salesRecord,
      isLoading,
      customizeRecords,
      evenType
    },
    actions: {
      handleLogout,
      fetchSalesRecord,
      setCustomizeRecords,
      groupPostsbyUserID,
      setEvenType
    }
  } = useContext(SalesContext);

  useEffect(() => {
    fetchSalesRecord(eventAction)
    handleGrouping() // api fetch on comp 
  }, [])

  function handleGrouping() {
    setCustomizeRecords(groupPostsbyUserID(salesRecord, "eventtype"))
  }

  useEffect(() => {
    handleGrouping()
  },[salesRecord ,isLoading])

  useEffect(() => {
    handleSearchFilter()
  })

 
  const handleSearchFilter = useCallback(
    (filter) => {
      const _filterList = []
      if(filter)
      Object.entries(filter).map(([keys, list]) => {
      if(!Array.isArray(list)){
        _filterList.push(keys)
      }
      else{
        Object.entries(list).forEach(([key, value]) => {
          _filterList.push(value.key+"_"+keys)
        })
      }
      setFilterList(_filterList)
    })
    }, [filterList]
  )

  const handleSeachData = useCallback(
    (_query, data, filterType) => {
      setQuery(_query)
      const _filteredData = []
      let _selectedFilter = filterType
      let temp = _selectedFilter?.split("_")
        const selectedFilter = temp[temp?.length-1]
        temp?.splice(-1)
        const subfilter = temp?.join("_")
        if(selectedFilter === 'eventtupleList'){
          data
          .map(item => ({...item, child: item[selectedFilter].filter(child => {
              if(child.value.includes(query.toLowerCase())){
                if(child.key===subfilter){
                  console.log(child.key)
                  console.log(item)
                  _filteredData.push(item)
                }
                }
              })
          }))
        } else {
          const filtered = data.filter(
            (item) => Object.keys(item).some((key) => (item[key].toString().toLowerCase().includes(query.toLowerCase()))),
            );
            _filteredData.push(filtered[0])
        }
        setFilteredData(_filteredData)
    },[query])
    
  const OrderItemGroup = ({recordtype}) => (
    <>
    {customizeRecords && Object.entries(customizeRecords).map(([key, value]) =>(
      <>
      {key=== recordtype && (
        <>
        <section key={value} className="py-1 bg-blue Gray-50">
        <div onClick={() => handleSearchFilter(value[0])} className="flex items-center justify-center">
          <div className="flex border-5 rounded">
          
            <input type="text" className="px-4 py-2 w-80" onKeyUp={(e) => handleSeachData(e.target.value, value, selectedfilter)} onChange={(e) => handleSeachData(e.target.value, value, selectedfilter)} placeholder="Search..." />
              <DropDown 
              filterList={filterList} 
              selectedfilter={selectedfilter}
              setSelectedFilter={setSelectedFilter}
              />
              <button className="flex items-center justify-center px-4 border-l">
                <SearchCircleIcon
                className="h-5 absolute pointer-events-none w-5 text-primary"
                aria-hidden="true" />
              </button>
          </div>
        </div>
            <div key={value}  className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-green-800 border border-separate ">
                    <tr>
                    {Object.entries(value[0]).map(([key, head]) => (
                      <>
                        <th className="px-6 bg-blueGray-500 text-blueGray-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-6 border-r-6 whitespace-nowrap font-bold text-left">
                          {key}
                      </th>
                      </>
                    ))}
                    </tr>
                    <tbody>
                    {(query ? filteredData : value).map((val) => (
                      <tr>
                      {val && Object.entries(val).map(([key, head]) => (
                            <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-6 border-r-6 whitespace-nowrap font-semibold text-left">    
                            {!Array.isArray(head)&& (head)}
                            {Array.isArray(head) && head.map((headers) => (
                              <>
                                <tr>
                                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text uppercase border-l-6 border-r-6 whitespace-nowrap font-bold text-left">
                                    {headers.key}
                                  </th>
                                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-6 border-r-6 whitespace-nowrap font-semibold text-left">
                                    {headers.value}
                                  </th>
                                </tr>
                                </>
                            ))}
                            </td>
                      
                      ))}
                      </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
        </>
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
                <span style={{ width: '100%'}} className="font-semibold uppercase text-gray-500 w-600 text-lg">
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
          {evenType.map((type, index) =>(
            <>
            <Accordion  
            open={index === evenType.length-1 ? false : true} 
            title={type} 
            setSelectedFilter={setSelectedFilter}>
            {OrderItemGroup({recordtype: type})}
            </Accordion>
            </>
          ))}
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
