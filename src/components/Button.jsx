import React, { useImperativeHandle, useRef } from "react";
import styled, { css } from "styled-components";
import Spinner from "./Spinner";

const Button = ({
  text,
  iconSVGLeft,
  type,
  isLoading,
  className,
  disabled,
  innerRef,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef();

  useImperativeHandle(innerRef, () => ({
    click: () => {
      buttonRef.current.click();
    },
  }));

  return (
    <Container className={className}>
      <ButtonWrapper>
        <ButtonStyled
          ref={buttonRef}
          onClick={onClick}
          className="button"
          type={type}
          isLoading={isLoading}
          disabled={isLoading || disabled}
          {...rest}
        >
          {iconSVGLeft && <IconSVGLeft as={iconSVGLeft} />}
          {text && <Label>{text}</Label>}
        </ButtonStyled>
        {isLoading && <SpinnerStyled />}
      </ButtonWrapper>
    </Container>
  );
};

Button.defaultProps = {
  type: "primary",
};

const Container = styled.div`
  user-select: none;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Label = styled.div`
  text-align: center;
`;

const IconSVGLeft = styled.div`
  width: 16px;
  height: 16px;

  min-width: 16px;
  min-height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 5px 5px 0px;

  & ~ ${Label} {
    margin-left: 5px;
  }
`;

const ButtonStyled = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 15px;
  font-weight: 600;
  width: 100%;
  min-height: 42px;
  font-size: 1em;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  ${(props) => {
    if (props.type === "primary")
      return css`
        background-color: #284b63;
        color: white;

        ${IconSVGLeft} {
          fill: white;
        }
      `;
    // else if (props.type === "error-primary")
    //   return css`
    //     background-color: #fbe5e5;
    //     color: #f44336;

    //     ${IconSVGLeft} {
    //       fill: #f44336;
    //     }
    //   `;
  }}

  ${(props) =>
    (props.isLoading || props.disabled) &&
    css`
      cursor: not-allowed;
      opacity: 0.2;
    `}
`;

const SpinnerStyled = styled(Spinner)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  margin: auto;
  cursor: not-allowed;
`;

export default React.forwardRef((props, ref) => (
  <Button innerRef={ref} {...props} />
));
