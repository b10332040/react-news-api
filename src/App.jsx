import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { HomePage, NotFoundPage, SearchPage,SourcesPage, WorldPage } from '/pages'
import { Footer, Navbar } from '/layouts'
import { Loading, ToTopButton } from '/components'
import { AppProvider, NewsProvider } from '/contexts'
import { useEffect, useState } from 'react'

/**
 * 共用佈局
 * @returns 
 */
const BasicLayout = () => {
  const [isLoading, setIsLoading]  = useState(true)

  const handleLoading = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    window.addEventListener('load', handleLoading)
    return () => {
      window.removeEventListener('load', handleLoading)
    }
  }, [])

  return (
    <AppProvider>
    <NewsProvider>
      {
        (isLoading) &&
        <div className='fixed z-[100] top-0 left-0 bottom-0 right-0 bg-[--theme-gray-50]'>
          <Loading />
        </div>
      }
      <Navbar />
        <div className='min-h-[100vh]'>
          <Outlet />
        </div>
      <Footer />
      <ToTopButton />
    </NewsProvider>
    </AppProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:encodeKeyword' element={<SearchPage />} />
          <Route path='sources/:id' element={<SourcesPage />} />
          <Route path='country' element={<WorldPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
