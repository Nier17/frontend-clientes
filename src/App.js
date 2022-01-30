import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <Board></Board>
    </>
  );
}

export default App;
// import "./App.css";
// import React, { useContext, useState, useEffect } from "react";
// import styled, { createGlobalStyle, css } from "styled-components";
// import Sidebar from "./components/Sidebar";
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import { sidebarProductor } from "./constants/ConstSidebars";
// import { ReactComponent as MenuSVG } from "./assets/menu.svg";
// import Home from "./components/Home";

// const App = () => {
//   const [showSidebar, setShowSidebar] = useState(
//     window.matchMedia("(min-width: 500px)").matches
//   );
//   const [windowSize, setWindowSize] = useState(
//     window.matchMedia("(min-width: 500px)").matches
//   );

//   function returnShowSidebar() {
//     if (windowSize === true) {
//       return;
//     }

//     if (windowSize === false) {
//       setShowSidebar(false);
//     }
//   }

//   useEffect(() => {
//     const handler = (e) => setWindowSize(e.matches);
//     window.matchMedia("(min-width: 500px)").addEventListener("change", handler);
//   }, []);

//   const isTinyScreen = windowSize === false;

//   return (
//     <>
//       <Router>
//         <GlobalStyles />
//         <>
//           <Menu>
//             <MenuIconSVG
//               as={MenuSVG}
//               onClick={() => setShowSidebar(!showSidebar)}
//             ></MenuIconSVG>
//           </Menu>
//           <Container>
//             <Sidebar
//               sidebarData={sidebarProductor}
//               istrue={showSidebar}
//               onClickSidebar={returnShowSidebar}
//             />
//             <Content isHidden={showSidebar && isTinyScreen}>
//               <Switch>
//                 <Route path="/" component={Home} />
//                 <Route path="/cr" component={Home} />
//                 <Route path="/" component={Home} />
//                 <Route path="/" component={Home} />
//               </Switch>
//             </Content>
//           </Container>
//         </>
//       </Router>
//     </>
//   );
// };

// App.defaultProps = {};

// const GlobalStyles = createGlobalStyle`

//   body {
//     background-color: #f3f3f4;
//   }

// `;

// const Container = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   transition: all 1s;
// `;
// const Menu = styled.div`
//   width: 100%;
//   z-index: 999;
//   background-color: white;
//   position: sticky;
//   top: 0px;
//   height: 78px;

//   padding: 0 15px;
//   box-sizing: border-box;

//   display: flex;
//   align-items: center;
//   box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 5%);
// `;
// const MenuIconSVG = styled.div`
//   width: 20px;
//   height: 20px;
//   min-width: 20px;
//   min-height: 20px;
//   padding: 10px 10px 10px 10px;
//   margin: 10px 10px 10px 10px;
//   fill: #33c494;
//   background-color: rgba(51, 196, 148, 0.1);
//   border-radius: 12px;
//   cursor: pointer;
// `;
// const Content = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   padding: 35px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 400px) {
//     padding: 15px;
//   }

//   ${(props) => {
//     if (props.isHidden)
//       return css`
//         display: none;
//       `;
//   }}
// `;

// export default App;
