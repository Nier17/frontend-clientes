import React from "react";
import styled, { css } from "styled-components";

const Question = ({ text, isRequired, className }) => (
  <Container className={className}>
    <ContainerText isRequired={isRequired}>{text}</ContainerText>
  </Container>
);

Question.defaultProps = {
  text: "",
  isRequired: false,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContainerText = styled.div`
  ${(props) =>
    props.isRequired &&
    css`
      :after {
        content: " *";
        color: #f44336;
      }
    `}
`;

export default Question;
