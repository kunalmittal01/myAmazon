import './App.css'
import Layout from './Layout'
import store from './store'
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store} >
        <Layout />
      </Provider>
    </>
  )
}

export default App
