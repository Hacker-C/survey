import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ErrorBoundary from './components/ErrorBoundary'
import { FullPageErrorFallback } from './components/ErrorBoundary/FullPageErrorFallback'
import { router } from '~/router'

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
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider >
    </ErrorBoundary>
  )
}

export default App
