import React, { useMemo, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ConnectedFocusError } from "focus-formik-error";
import * as yup from "yup";
import styled from "styled-components";
import produce from "immer";
import { InputField } from "./WithFormik";
import Spinner from "./Spinner";
import HelperObj from "../helpers/HelperObj";
import NotificationBox from "./NotificationBox";
import Question from "./Question";
import Button from "./Button";
const FormCrearCliente = ({
  initData,
  onSubmit,
  isOnEdit,
  onClose,
  notificationText,
  isSubmitting,
  onClickNotification,
  notificationTextType,
}) => {
  const initDataFormatted = useMemo(
    () =>
      produce(initData, (draft) => {
        let init = {
          nombre: "",
          apellido: "",
          fecnac: "",
        };
        return HelperObj.mixin(init, draft);
      }),
    [initData]
  );
  const notificationRef = useRef();
  useEffect(() => {
    if (notificationText && notificationRef.current) {
      notificationRef.current.scrollIntoViewIfNeeded(); //reemplace this. It's not supported in major browers.
    }
  }, [notificationText]);
  const validate = (values) => {
    const errors = {};
    return errors;
  };

  return (
    <Formik
      enableReinitialize={true}
      validate={validate}
      initialValues={initDataFormatted}
      validationSchema={yup.object({
        nombre: yup.string().required("Es obligatorio completar este dato."),
        apellido: yup.string().required("Es obligatorio completar este dato."),
        fecnac: yup.string().required("Es obligatorio completar este dato."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(HelperObj.clean(values));
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        handleChange,
      }) => (
        <Form>
          <ConnectedFocusError />
          <Container>
            {notificationText && (
              <WrapperNotification ref={notificationRef}>
                <NotificationBox
                  type={notificationTextType}
                  text={notificationText}
                  onClick={onClickNotification}
                />
              </WrapperNotification>
            )}
            <ContainerQuestion>
              <QuestionStyled text="Nombres" isRequired={true} />
              <InputStyled
                type="text"
                name="nombre"
                placeholder="Nombres"
                // hasError={touched.nombre && errors.nombre}
              />
            </ContainerQuestion>
            <ContainerQuestion>
              <QuestionStyled text="Apellidos" isRequired={true} />
              <InputStyled
                type="text"
                name="apellido"
                placeholder="Apellidos"
                // hasError={touched.apellido && errors.apellido}
              />
            </ContainerQuestion>

            <ContainerQuestion>
              <QuestionStyled text="Fecha de nacimiento" isRequired={true} />
              <InputStyled
                type="text"
                name="fecnac"
                placeholder="formato: dd/mm/yyyy"
                // hasError={touched.correo && errors.correo}
              />
            </ContainerQuestion>

            <ButtonWrapper>
              <StyledButton
                type="primary"
                text={"Registrar"}
                onClick={() => {
                  submitForm();
                }}
              >
                enviar
              </StyledButton>
            </ButtonWrapper>
          </Container>

          {isSubmitting && (
            <WrapperSpinner>
              <Spinner />
            </WrapperSpinner>
          )}
        </Form>
      )}
    </Formik>
  );
};
FormCrearCliente.defaultProps = {
  notificationTextType: "error",
};

const InputStyled = styled(InputField)`
  width: 10px;
`;
const Container = styled.div``;
const QuestionsFlex = styled.div`
  display: flex;
`;
const WrapperNotification = styled.div`
  margin-bottom: 50px;
  width: 650px;
  /* width: 44.5%; */
`;
const StyledNotification = styled(NotificationBox)`
  @media (max-width: 500px) {
    
  }
`;
const QuestionStyled = styled(Question)``;
const ContainerQuestion = styled.div`
  margin-bottom: 50px;
  width: 350px;
  ${QuestionStyled} {
    margin-bottom: 10px;
  }
`;
const WrapperSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ContainerQuestionLeft = styled.div`
  margin-bottom: 50px;
  width: 300px;

  /* width: 30%; */
  ${QuestionStyled} {
    margin-bottom: 10px;
  }
`;
const ContainerQuestionRight = styled.div`
  margin-left: 50px;
  margin-bottom: 50px;
  width: 300px;
  ${QuestionStyled} {
    margin-bottom: 10px;
  }
`;
const StyledButton = styled(Button)`
  width: 350px;
  align-self: baseline;
`;
const ButtonWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: end; */
  /* flex-wrap: wrap; */
  /* width: 650px; */

  /* width: 100%; */
`;

export default FormCrearCliente;
