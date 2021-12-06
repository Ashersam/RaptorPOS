import SalesContextProvider from '../component/context/SalesContext.js'
import Login from '../component/Login.js'

export default function Home() {
  return (
    <>
      <SalesContextProvider>
        <Login />
      </SalesContextProvider>
    </>
  )
}
