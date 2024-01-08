import React, { useContext, useRef } from 'react'
import {
  StateCreator,
  StoreApi,
  createStore,
  useStore as useExternalStore
} from 'zustand'
import { useShallow } from 'zustand/react/shallow'

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

export const useCreateContext = <T>(store: StateCreator<T, [], []>) => {
  const Context = React.createContext<StoreApi<T>>({} as StoreApi<T>)

  const Provider = ({ children }: any) => {
    const storeRef = useRef<StoreApi<T> | undefined>()
    if (!storeRef.current) {
      storeRef.current = createStore<T>(store)
    }
    return React.createElement(
      Context.Provider,
      { value: storeRef.current },
      children
    )
  }

  function useStore(): T
  function useStore<U>(selector: (state: ExtractState<StoreApi<T>>) => U): U
  function useStore<U>(selector?: (state: ExtractState<StoreApi<T>>) => U): U {
    const store = useContext(Context)
    return useExternalStore(store, selector!)
  }

  return { Provider, Context, useStore }
}
