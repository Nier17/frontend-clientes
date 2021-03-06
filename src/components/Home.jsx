import React, { useEffect, useRef, useMemo, useState } from "react";
import ClientesAPI from "../api/ClientesAPI";
import Table from "./Table";
import styled, { css } from "styled-components";
import HelperDate from "../helpers/HelperDate";
import Bag from "./Bag";
import { PieChart } from "react-minimal-pie-chart";
import Chart from "react-apexcharts";

const Home = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesPie, setClientesPie] = useState([]);
  useEffect(() => {
    ClientesAPI.getClientes(setClientes);
  }, []);
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  function printChart() {
    var arrClientes = clientes;
    var pieArr = [];
    arrClientes.forEach((e) => {
      var count = arrClientes.filter((x) => x.nombre === e.nombre).length;
      e.value = count;
    });
    arrClientes.forEach((e) => {
      pieArr.push({ value: e.value, label: e.nombre });
    });
    var unique = pieArr.filter(
      (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    );
    var categorias = [];
    var datos = [];
    unique.forEach((e) => {
      categorias.push(e.label);
      datos.push(e.value);
    });
    var objChart = {
      options: {
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: categorias,
        },
      },
      series: [
        {
          name: "número de clientes con ese nombre",
          data: datos,
        },
      ],
    };
    setChart(objChart);
  }

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
    setClientesPie(unique);
  }, [clientes]);

  useEffect(() => {
    printChart();
  }, [clientes]);

  const tableRef = useRef();
  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        with: 2,
        Cell: ({ value }) => <Label>{value}</Label>,
      },
      {
        Header: "Nombre",
        accessor: "nombre",
        with: 2,
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Apellido",
        accessor: "apellido",
        with: 2,
        Cell: ({ value }) => <Label>{value || ""}</Label>,
      },
      {
        Header: "Fecha de nacimiento",
        accessor: "fecnac",
        with: 2,
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
      <DrawsContainer>
        <PieContainer>
          <Label>Distribuciones de edades de los clientes</Label>
          <PieChart
            data={clientesPie}
            label={({ dataEntry }) => dataEntry.label}
            radius={40}
            labelPosition={108}
            labelStyle={{
              fontSize: "6px",
              fontFamily: "sans-serif",
            }}
          />
        </PieContainer>
        <BarsContainer>
          <Label>Nombres más comunes por cliente</Label>
          <div style={{ marginTop: 20 }}></div>
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width={500}
            height={400}
          />
        </BarsContainer>
      </DrawsContainer>
      <Label>Lista de clientes</Label>
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
  @media (max-width: 340px) {
    margin-left: 300px;
  }
  @media (max-width: 700px) {
    margin-left: 300px;
  }
`;
const DrawsContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 966px) {
    display: block;
  }
`;
const PieContainer = styled.div`
  width: 360px;
  @media (max-width: 400px) {
    max-width: 300px;
  }
  /* margin: 20px;
  padding: 20px; */
`;
const BarsContainer = styled.div`
  /* margin-left: 100px; */
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
