import React, { useEffect, useRef, useMemo, useState } from "react";
import ClientesAPI from "../../api/ClientesAPI";
import Table from "../Table";
import styled, { css } from "styled-components";
import axios from "axios";
import HelperDate from "../../helpers/HelperDate";
import Bag from "../Bag";
const URL = "http://143.198.120.82:3000/clientes";

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  async function getData() {
    const a = await axios.get(URL);
    setClientes(a.data);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(clientes);
  }, [clientes]);

  const tableRef = useRef();
  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 2,
        disableSortBy: true,
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

export default ListarClientes;
