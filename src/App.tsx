import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import PlanPage from './components/PlanPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
