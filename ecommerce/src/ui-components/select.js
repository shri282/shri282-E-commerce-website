import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function SelectUi(props) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={props.age}
        label="Age"
        onChange={props.handleChange}
      >
        <MenuItem className="menu-item" value={"All Categories"}>
          All
        </MenuItem>
        <MenuItem className="menu-item" value={"prod_name"}>
          ProdName
        </MenuItem>
        <MenuItem className="menu-item" value={"category"}>
          Category
        </MenuItem>
        <MenuItem className="menu-item" value={"type"}>
          Type
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectUi;
