import { useEffect, useRef } from 'react'

type EventType = keyof WindowEventMap
type HandlerType<E extends EventType> = (event: WindowEventMap[E]) => void

export function useAddEventListener<E extends EventType>(eventName: E, handler: HandlerType<E>, dependencies: any[]) {
  const savedHandler = useRef<HandlerType<E>>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function eventListener(event: WindowEventMap[E]) {
      savedHandler.current && savedHandler.current(event)
    }

    window.addEventListener(eventName, eventListener)

    return () => {
      window.removeEventListener(eventName, eventListener)
    }
  }, dependencies)
}
