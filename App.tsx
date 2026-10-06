import { HomeScreen } from './components/HomeScreen'
import { useState } from 'react'
import { CadastroItem } from './components/itensCadastrados'
import { Item } from './components/itensCadastrados'
import { CadastroRestaurante } from './components/CadastroRestaurante'

type Restaurante = {
  nome: string
  descricao: string
  foto: string | null
}

export default function App() {
  const [tela, settela] = useState<'Restaurante' | 'home' | 'cadastro'>('Restaurante')
  const [itens, setitens] = useState<Item[]>([])
  const [restaurante, setRestaurante] = useState<Restaurante>({
    nome: '',
    descricao: '',
    foto: null
  })
  function CadastreRestaurante(
    nome: string,
    descricao: string,
    foto: string | null
  ) { setRestaurante({
    nome,
    descricao,
    foto
  })
settela('home')
  }

  function adicionarItem(novoItem: Item) {
    setitens((listaAtual) => [
      ...listaAtual, novoItem])
    settela('home')

  }
  if (tela === 'Restaurante') {
    return (
      <CadastroRestaurante continuar={CadastreRestaurante} />
    )
  }
  if (tela === 'cadastro') {
    return <CadastroItem
      itens={itens}
      adicionarItem={adicionarItem}
      paraVoltar={() => settela('home')} />
  }
  return <HomeScreen
    itens={itens}
    quandoCadastrar={() => settela('cadastro')}
    restaurante={restaurante} />

}