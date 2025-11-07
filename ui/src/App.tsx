
import { NavLink, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import Monitor from './pages/Monitor'

export default function App() {
  const linkClass = ({isActive}:{isActive:boolean}) => 
    'px-3 py-2 rounded-lg ' + (isActive ? 'bg-black text-white' : 'hover:bg-gray-200')
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Perception UI</h1>
        <nav className="space-x-2">
          <NavLink to="/" className={linkClass} end>总览</NavLink>
          <NavLink to="/monitor" className={linkClass}>监控</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/monitor" element={<Monitor />} />
      </Routes>
    </div>
  )
}
