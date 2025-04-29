const Delete = (id) => {
    let url = `http://localhost:3000/delete/${id}`;
    console.log(url);
    fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error("Erro ao deletar:", error));
};

export default Delete;