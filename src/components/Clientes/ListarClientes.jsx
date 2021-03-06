import React, { useEffect, useRef, useMemo, useState } from "react";
import ClientesAPI from "../../api/ClientesAPI";
import Table from "../Table";
import styled, { css } from "styled-components";
import HelperDate from "../../helpers/HelperDate";
import Bag from "../Bag";

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    ClientesAPI.getClientes(setClientes);
  }, []);

  useEffect(() => {}, [clientes]);

  const tableRef = useRef();
  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 2,
        Cell: ({ value }) => <Label>{value}</Label>,
      },
      {
        Header: "Nombre",
        accessor: "nombre",
        width: 2,
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Apellido",
        accessor: "apellido",
        width: 2,
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Fecha de nacimiento",
        accessor: "fecnac",
        width: 2,
        Cell: ({ value }) => (
          <Label className="toRight">
            {value && HelperDate.toFormat(new Date(value), "DD/MM/YY")}
          </Label>
        ),
      },
    ],

    []
  );
  return (
    <BagStyled>
      <Header>
        <Title>Lista de clientes</Title>
      </Header>
      <Table ref={tableRef} columns={COLUMNS} data={clientes} />
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

export default ListarClientes;
