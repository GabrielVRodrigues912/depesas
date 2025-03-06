import React, { useState } from 'react';
import axios from 'axios';

const DespesaForm = ({ onDespesaAdded }) => {
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const despesa = { data, categoria, valor: parseFloat(valor), descricao };

    try {
      await axios.post("http://localhost:5000/api/despesas", despesa);
      onDespesaAdded();
      setData("");
      setCategoria("");
      setValor("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Data" 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Categoria" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Descrição" 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
        />
        <button type="submit">Adicionar Despesa</button>
      </form>
    </div>
  );
};

export default DespesaForm;
