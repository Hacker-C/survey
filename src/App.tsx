import { ConfigProvider } from 'antd'
import ErrorBoundary from './components/ErrorBoundary'
import { FullPageErrorFallback } from './components/ErrorBoundary/FullPageErrorFallback'
import { Router } from '~/router'

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
      </ConfigProvider >
    </ErrorBoundary>
  )
}

export default App
