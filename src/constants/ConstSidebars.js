import { ReactComponent as MenuSVG } from "../assets/menu.svg";
import { ReactComponent as ListSVG } from "../assets/list.svg";
import { ReactComponent as HomeSVG } from "../assets/home.svg";
import { ReactComponent as PromedioSVG } from "../assets/calculator.svg";
import { ReactComponent as AddClienteSVG } from "../assets/add-user.svg";

const sidebarProductor = [
  {
    title: "Inicio",
    path: "/home",
    exact: false,
    icon: HomeSVG,
  },
  {
    title: "Creación de cliente",
    path: "/creacioncliente",
    exact: false,
    icon: AddClienteSVG,
  },
  {
    title: "Lista de clientes",
    path: "/listaclientes",
    exact: false,
    icon: ListSVG,
  },
  {
    title: "Ver promedio de edades",
    path: "/promedio",
    exact: false,
    icon: PromedioSVG,
  },
];

export { sidebarProductor };
