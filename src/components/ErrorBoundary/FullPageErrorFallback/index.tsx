export function FullPageErrorFallback({ error }: { error: Error | null }) {
  return (
    <FullPage>
      <div>{ error?.message }</div>
    </FullPage>
  )
}

function FullPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      { children }
    </div>
  )
}
