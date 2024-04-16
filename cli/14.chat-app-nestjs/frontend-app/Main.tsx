import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import App from './src/App'
import { NavigationContainer } from '@react-navigation/native'

const Main = () => {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </NavigationContainer>
    </>
  )
}

export default Main