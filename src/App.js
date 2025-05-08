// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DespesaForm from './components/DespesaForm';
import DespesaList from './components/DespesaList';
import ResumoDespesas from './components/ResumoDespesas';
import './App.css';

function App() {
  const [despesas, setDespesas] = useState([]);
  const [resumo, setResumo] = useState({ total_geral: 0, por_categoria: {} });

  const fetchDespesas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/despesas');
      setDespesas(response.data);
    } catch (error) {
      console.error('Erro ao obter despesas:', error);
    }
  };

  const fetchResumo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/despesas/resumo');
      setResumo(response.data);
    } catch (error) {
      console.error('Erro ao obter resumo de despesas:', error);
    }
  };

  const handleDespesaAdded = () => {
    fetchDespesas();
    fetchResumo();
  };

  const handleExcluirDespesa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/despesas/${id}`);
      fetchDespesas();
      fetchResumo();
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  useEffect(() => {
    fetchDespesas();
    fetchResumo();
  }, []);

  return (
    <div className="App container">
      <h1>Gestão de Despesas</h1>
      
      <ResumoDespesas resumo={resumo} />
      
      <DespesaForm onDespesaAdded={handleDespesaAdded} />
      
      <DespesaList despesas={despesas} onExcluir={handleExcluirDespesa} />
    </div>
  );
}

export default App;
