// import React from "react";
// import TextField from "@mui/material/TextField";
// type Props = {
//   name: string;
//   type: string;
//   label: string;
// };
// const CustomizedInput = (props: Props) => {
//   return (
//     <TextField
//       margin="normal"
//       InputLabelProps={{ style: { color: "white" } }}
//       name={props.name}
//       label={props.label}
//       type={props.type}
//       InputProps={{
//         style: {
//           width: "400px",
//           borderRadius: 10,
//           fontSize: 20,
//           color: "white",
//         },
//       }}
//     />
//   );
// };

// export default CustomizedInput;








import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
};

const CustomizedInput = (props: Props) => {
  const { name, type, label, onChange } = props;

  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={name}
      label={label}
      type={type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
      onChange={onChange} // Pass the onChange prop to TextField
    />
  );
};

export default CustomizedInput;

