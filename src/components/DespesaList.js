import React from 'react';


const DespesaList = ({ despesas }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/despesas/${id}`);
      // Após a remoção, atualizar a lista
      alert('Despesa removida com sucesso!');
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Despesas</h2>
      <ul>
        {despesas.map((despesa) => (
          <li key={despesa.id}>
            <span>{despesa.categoria} - {despesa.valor} ({despesa.data}) - {despesa.descricao}</span>
            <button onClick={() => handleDelete(despesa.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DespesaList;
