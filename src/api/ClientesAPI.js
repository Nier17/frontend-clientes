import axios from "axios";

const URLClientes = "http://143.198.120.82:3000/clientes";

const getClientes = () => {
  axios
    .get(URLClientes)

    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// const createCliente = (data) => {
//   console.log(data);
//   axios.post(URLClientes, data).then((res) => {});
// };

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

export default {
  getClientes,
  createCliente,
};
