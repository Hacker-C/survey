import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { FullPageErrorFallback } from './components/ErrorBoundary/FullPageErrorFallback'
import { router } from '~/router'

function App() {
  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  )
}

export default App
