import axios from "axios";

const URLClientes = "http://143.198.120.82:3000/clientes";
const URLPromedio = "http://143.198.120.82:3000/promedio";

async function getClientes(setClientes) {
  const a = await axios.get(URLClientes);
  setClientes(a.data);
}

const createCliente = (data) =>
  new Promise((res, rej) => {
    axios
      .post(URLClientes, data)
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });

async function getPromedio(setPromedio) {
  const a = await axios.get(URLPromedio);
  setPromedio(a.data);
}

export default {
  getClientes,
  createCliente,
  getPromedio,
};
