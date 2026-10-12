import { Route, Routes } from 'react-router-dom'
import RomanticJourney from './components/RomanticJourney'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RomanticJourney />} />
        <Route path='*' element={<RomanticJourney />} />
      </Routes>
    </>
  )
}

export default App

