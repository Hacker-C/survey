import { ConfigProvider } from 'antd'
import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { FullPageErrorFallback } from './components/ErrorBoundary/FullPageErrorFallback'
import { Router } from './Router'

function App() {
  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff'
          }
        }}
      >
        <Router />
        {/* <RouterProvider router={router}></RouterProvider> */}
      </ConfigProvider >
    </ErrorBoundary>
  )
}

export default App
