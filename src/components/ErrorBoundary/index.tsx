import React from 'react'
import type { PropsWithChildren } from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

class ErrorBoundary extends React.Component<PropsWithChildren<{ fallbackRender: FallbackRender }>> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}

export default ErrorBoundary
