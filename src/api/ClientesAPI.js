import axios from "axios";

const getClientes = () => {
  axios
    .get("http://159.223.161.105:3000/clientes")

    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
// axios.post(
//   "https://sistema.itdtelecom.com//api/v2/sms/sendSms",
//   {
//     phone: telefonoCelular,
//     message:
//       "Estimado productor, su solicitud de crédito en KunaCredit ha sido registrada.",
//     originator: 43434,
//   },
//   {
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZ2hvc2giLCJpYXQiOjE1OTQxMzg5MTksImV4cCI6MTY4ODc0NjkxOX0.8Gx8G2Bm97DSOysMRTHI7WcJJkUbmD_Hjjgiw0DrQ10iYS8wbmnvuskKb1kuLO9QyR5jq5j2GCxqjt1GL5OH4Q",
//     },
//   }
// );

export default {
  getClientes,
};
