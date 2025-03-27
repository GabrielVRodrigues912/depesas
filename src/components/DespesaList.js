import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DespesaList = ({ despesas }) => {
  // Estados para o filtro de categoria e categorias disponíveis
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Função para deletar a despesa
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/despesas/${id}`);
      // Após a remoção, atualizar a lista
      alert('Despesa removida com sucesso!');
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  };

  // Função para buscar as categorias
  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Executar a função fetchCategorias quando o componente for montado
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Filtra as despesas pela categoria
  const despesasFiltradas = despesas.filter(despesa =>
    despesa.categoria.toLowerCase().includes(filtroCategoria.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Lista de Despesas</h2>
      
      {/* Filtro de categoria em dropdown */}
      <div className="filtro-categoria">
        <label htmlFor="filtroCategoria">Filtrar por categoria:</label>
        <select
          id="filtroCategoria"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas</option>
          {/* Renderiza as categorias do backend */}
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela para exibir as despesas */}
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {despesasFiltradas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.categoria}</td>
              <td>{despesa.valor}</td>
              <td>{despesa.data}</td>
              <td>{despesa.descricao}</td>
              <td>
                <button onClick={() => handleDelete(despesa.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DespesaList;
