import React, { useEffect, useRef, useMemo, useState } from "react";
import ClientesAPI from "../api/ClientesAPI";
import Table from "./Table";
import styled, { css } from "styled-components";
import HelperDate from "../helpers/HelperDate";
import Bag from "./Bag";
import { PieChart } from "react-minimal-pie-chart";
import HelperObj from "../helpers/HelperObj";

const Home = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesPie, setClientesPie] = useState([]);
  useEffect(() => {
    ClientesAPI.getClientes(setClientes);
  }, []);

  useEffect(() => {}, [clientes]);

  useEffect(() => {
    var arrClientes = clientes;
    var pieArr = [];
    arrClientes.forEach((e) => {
      var edad = HelperDate.getAgeByFecNac(e.fecnac);
      e.edad = edad;
      var count = arrClientes.filter(
        (x) => HelperDate.getAgeByFecNac(x.fecnac) === edad
      ).length;
      e.value = count;
    });
    arrClientes.forEach((e) => {
      pieArr.push({ value: e.value, label: e.edad });
    });
    var unique = pieArr.filter(
      (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    );
    unique.forEach((e) => {
      let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      e.color = randomColor;
    });

    console.log(unique);
    setClientesPie(unique);
    console.log(pieArr);
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
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Label>Distribuciones de edades de los clientes</Label>
      <PieContainer>
        <PieChart
          data={clientesPie}
          label={({ dataEntry }) => dataEntry.label}
          radius={30}
          labelPosition={112}
          labelStyle={{
            fontSize: "2px",
            fontFamily: "sans-serif",
          }}
        />
      </PieContainer>

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
const PieContainer = styled.div`
  width: 600px;
  width: 600px;
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

export default Home;
