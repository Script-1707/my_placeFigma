import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Pesquisa from './pages/Pesquisa'
import FichaImovel from './pages/FichaImovel'
import Login from './pages/Login'
import Registo from './pages/Registo'
import PublicarImovel from './pages/PublicarImovel'
import AgendarVisita from './pages/AgendarVisita'
import PedidoAssistido from './pages/PedidoAssistido'
import DetalhesPedido from './pages/DetalhesPedido'
import PainelCaptador from './pages/PainelCaptador'
import CandidaturaCaptador from './pages/CandidaturaCaptador'
import Admin from './pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Pesquisa />} />
          <Route path="/imoveis/:id" element={<FichaImovel />} />
          <Route path="/imoveis/:id/agendar" element={<AgendarVisita />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Registo />} />
          <Route path="/publicar" element={<PublicarImovel />} />
          <Route path="/pedido-assistido" element={<PedidoAssistido />} />
          <Route path="/pedido-assistido/:id" element={<DetalhesPedido />} />
          <Route path="/captador/painel" element={<PainelCaptador />} />
          <Route path="/captador/candidatura" element={<CandidaturaCaptador />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
