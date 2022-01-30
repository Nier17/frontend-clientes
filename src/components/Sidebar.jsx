import React, { useState, useEffect, useRef, useMemo } from "react";
import { ReactComponent as ArrowDownSVG } from "../assets/arrow-down.svg";

import styled, { css, keyframes } from "styled-components";
import { Link, NavLink, useRouteMatch, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarData, istrue, onClickSidebar }) => {
  const location = useLocation();

  const [stateExpand, setStateExpand] = useState({ index: undefined });

  const indexes = useMemo(() => {
    return getIndexes(sidebarData, location.pathname);
  }, [sidebarData, location.pathname]);

  useEffect(() => {
    if (indexes === undefined) setStateExpand({ index: undefined });
    else if (indexes.length === 2) setStateExpand({ index: indexes[0] });
  }, [indexes]);

  return (
    <>
      {istrue && (
        <Container>
          {sidebarData.map((item, index) => {
            const isSelected = indexes?.[0] === index;
            const isExpanded = stateExpand?.index === index;
            const hasChild = item.child !== undefined;
            return (
              <ItemContainer key={index}>
                <CustomLink
                  $istrue={isSelected}
                  exact
                  onClick={() => {
                    if (hasChild) {
                      if (isExpanded) setStateExpand({ index: undefined });
                      else setStateExpand({ index });
                    } else {
                      setStateExpand({ index: undefined });
                      onClickSidebar();
                      if (typeof item.onClick === "function") item.onClick();
                    }
                  }}
                  to={item.path || "#"}
                  style={{ display: "flex" }}
                >
                  <IconSVG $istrue={isSelected} as={item.icon} />
                  <Title $istrue={isSelected}>{item.title}</Title>
                  {hasChild && (
                    <>
                      {isExpanded ? (
                        <IconSVGRightUp
                          as={ArrowDownSVG}
                          $istrue={isSelected}
                        />
                      ) : (
                        <IconSVGRightDown
                          as={ArrowDownSVG}
                          $istrue={isSelected}
                        />
                      )}
                    </>
                  )}
                </CustomLink>
                {hasChild && isExpanded && (
                  <div style={{ display: "flex" }}>
                    <VerticalLine></VerticalLine>
                    <div style={{ flex: "1 0 0" }}>
                      {item.child.map((subItem, subIndex) => {
                        const isSubItemSelected =
                          isSelected && indexes?.[1] === subIndex;
                        return (
                          <SubItemContainer key={subItem.title}>
                            <SubCustomLink
                              $istrue={isSubItemSelected}
                              to={subItem.path}
                              style={{ display: "flex" }}
                              onClick={() => {
                                onClickSidebar();
                              }}
                            >
                              <Title $istrue={isSubItemSelected}>
                                {subItem.title}
                              </Title>
                            </SubCustomLink>
                          </SubItemContainer>
                        );
                      })}
                    </div>
                  </div>
                )}
              </ItemContainer>
            );
          })}
        </Container>
      )}
    </>
  );
};

Sidebar.defaultProps = {
  onClick: () => {},
  sidebarData: [],
  istrue: false,
  onClickSidebar: () => {},
};

const getIndexes = (array = [], pathname) => {
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item.path === pathname) return [index];
    else if (item.child !== undefined && Array.isArray(item.child)) {
      const indexArr = getIndexes(item.child, pathname);
      if (indexArr !== undefined) return [index, ...indexArr];
    }
  }
  return undefined;
};

const Title = styled.p`
  align-self: center;
  ${(props) => {
    if (props.$istrue) {
      return css`
        color: white;
      `;
    }
  }}
`;

const SubItemContainer = styled.div`
  margin-left: 50px;
`;

const VerticalLine = styled.div`
  background-color: #dbdbdb;
  width: 0.5%;
  margin-left: 44px;
  margin-top: 10px;
`;

const CustomLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  min-width: 260px;
  background-color: rgb(40, 75, 99, 0.1);

  /* margin: 10px 0px 10px 0; */
  padding: 1px 30px 1px 10px;
  :hover {
    background-color: rgb(40, 75, 99, 0.2);
  }
  ${(props) => {
    if (props.$istrue) {
      return css`
        background-color: #284b63;

        :hover {
          background-color: #284b63;
        }
      `;
    }
  }}
`;

const ItemContainer = styled.div``;

const SubCustomLink = styled(Link)`
  color: #000000;
  margin: 10px 10px 10px -30px;
  padding: 14px;
  :hover {
    background-color: rgba(51, 196, 148, 0.1);
    border-radius: 12px;
  }
  ${(props) => {
    if (props.$istrue) {
      return css`
        background-color: rgba(51, 196, 148, 1);
        border-radius: 12px;
        :hover {
          background-color: rgba(51, 196, 148, 1);
          border-radius: 12px;
        }
      `;
    }
  }}
`;

const openClose = keyframes`
 0% {   width: 0%; }
 /* 33% {   width: 100px; }
 66% {   width: 200px; } */
 100% { width: 100%;  }
`;

const Container = styled.div`
  @media (max-width: 490px) {
    max-width: 100vw;
    width: 100%;
    position: sticky;
    top: 78px;
    height: calc(100vh - 78px);
    overflow-y: auto;
  }
  min-width: 300px;
  max-width: 300px;
  width: 100%;
  overflow-y: auto;
  background-color: white;
  position: sticky;
  top: 78px;
  height: calc(100vh - 78px);

  & > *:not(:last-child) {
    margin: 0px 0px 10px 0px;
  }
`;
const IconSVG = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  padding: 20px;
  cursor: pointer;
  ${(props) => {
    if (props.$istrue) {
      return css`
        fill: #ffffff;
      `;
    } else {
      return css`
        fill: #284b63;
      `;
    }
  }}
`;

const IconSVGRightDown = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  align-self: center;
  margin-left: auto;
  /* margin: 10px 10px 10px auto; */
  fill: #33c494;
  cursor: pointer;
  ${(props) => {
    if (props.$istrue) {
      return css`
        fill: #ffffff;
      `;
    } else {
      return css`
        fill: #33c494;
      `;
    }
  }}
`;
const IconSVGRightUp = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  /* margin-left: 10px; */
  align-self: center;
  transform: rotate(180deg);
  margin-left: auto;

  /* margin: 10px 10px 10px auto; */
  fill: #33c494;
  cursor: pointer;
  ${(props) => {
    if (props.$istrue) {
      return css`
        fill: #ffffff;
      `;
    } else {
      return css`
        fill: #33c494;
      `;
    }
  }}
`;

export default Sidebar;
