import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { HomePage, SearchPage,SourcesPage, WorldPage } from '/pages'
import { Footer, Navbar } from '/layouts'
import { ToTopButton } from '/components'
import { AppProvider, NewsProvider } from '/contexts'

/**
 * 共用佈局
 * @returns 
 */
const BasicLayout = () => {
  return (
    <AppProvider>
    <NewsProvider>
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
          <Route path='search/:keyword' element={<SearchPage />} />
          <Route path='sources' element={<SourcesPage />} />
          <Route path='sources/:source' element={<SourcesPage />} />
          <Route path='world' element={<WorldPage />} />
          <Route path='world/:country' element={<WorldPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
