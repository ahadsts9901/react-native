import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import App from './src/App'

const Main = () => {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  )
}

export default Main