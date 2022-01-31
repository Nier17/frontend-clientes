import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Bag from "../Bag";
import ClientesAPI from "../../api/ClientesAPI";

const Promedio = () => {
  const [promedio, setPromedio] = useState();

  useEffect(() => {
    ClientesAPI.getPromedio(setPromedio);
  }, [promedio]);
  return (
    <BagStyled>
      <Header>
        <Title>Promedio</Title>
      </Header>
      <Label>El promedio de edades es: {promedio}</Label>
    </BagStyled>
  );
};
const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const BagStyled = styled(Bag)`
  flex: 1 0 0;
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

export default Promedio;
