import * as yup from "yup";
// import ConstDate from "../../../constants/ConstDate";
// import HelperObj from "../../../helpers/HelperObj";

const toDatabase = (type, data) => {
  let formatted = undefined;

  switch (type) {
    case "registerUser":
      const schemaDatabase = yup.object({
        nombre: yup.string().trim(),
        apellido: yup.string().trim(),
        // fechaNacimiento: yup.number().transform((value, originalValue) => {
        //   const mesId = originalValue?.mes?.id;
        //   const añoId = originalValue?.año?.id;
        //   const díaId = originalValue?.día?.id;
        //   const date = ConstDate.getDate(díaId, mesId, añoId);
        //   return date.getTime();
        // }),
      });

      formatted = schemaDatabase.cast(data, {
        context: data,
        stripUnknown: true,
      });
      break;

    default:
      break;
  }

  // let cleaned = HelperObj.clean(formatted);

  // return cleaned;
  return 5;
};

export default { toDatabase };
