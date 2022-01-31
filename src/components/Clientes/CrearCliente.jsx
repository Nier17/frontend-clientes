import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Bag from "../Bag";
import { useImmer } from "use-immer";
import Adapter from "../../helpers/Adapter";
import FormCrearCliente from "../FormCrearCliente";
import ClientesAPI from "../../api/ClientesAPI";

const CrearCliente = () => {
  const [data, setData] = useImmer({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationText, setNotificationText] = useState(undefined);
  const [notificationTextType, setNotificationTextType] = useState("error");

  useEffect(() => {
    if (isSubmitting) {

      const formatted = Adapter.toDatabase("crearCliente", data);
      ClientesAPI.createCliente(formatted).then(() => {
        setNotificationText("Se registró al cliente con éxito.");
        setNotificationTextType("information");
        setIsSubmitting(false);
      });
    }
  }, [isSubmitting]);
  return (
    <BagStyled
      header={
        <Header>
          <Title>Crear cliente</Title>
        </Header>
      }
    >
      <FormCrearCliente
        initData={{ nombre: "", apellido: "", fecnac: "" }}
        onSubmit={(data) => {
          setData(data);
          setIsSubmitting(true);
        }}
        notificationText={notificationText}
        notificationTextType={notificationTextType}
        isSubmiting={isSubmitting}
        onClickNotification={() => setNotificationText(undefined)}
      ></FormCrearCliente>
    </BagStyled>
  );
};

const BagStyled = styled(Bag)`
  flex: 1 0 0;
  @media (max-width: 400px) {
    max-width: 500px;
    width: 100%;
  }
`;
const Header = styled.div`
  margin-bottom: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 1.2em;
`;
export default CrearCliente;
