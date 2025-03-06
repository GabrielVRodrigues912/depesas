import React, { useState, useEffect } from 'react';
import DespesaForm from './components/DespesaForm';
import DespesaList from './components/DespesaList';
import axios from 'axios';
import './App.css'; 

function App() {
  const [despesas, setDespesas] = useState([]);
  
  // Função para buscar despesas da API
  const fetchDespesas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/despesas');
      setDespesas(response.data);
    } catch (error) {
      console.error('Erro ao obter despesas:', error);
    }
  };

  // Atualiza a lista de despesas quando uma nova despesa é adicionada
  const handleDespesaAdded = () => {
    fetchDespesas(); // Recarregar a lista de despesas
  };

  useEffect(() => {
    fetchDespesas();
  }, []);

  return (
    <div className="App">
      <h1>Gestão de Despesas</h1>
      <DespesaForm onDespesaAdded={handleDespesaAdded} />
      <DespesaList despesas={despesas} />
    </div>
  );
}

export default App;
