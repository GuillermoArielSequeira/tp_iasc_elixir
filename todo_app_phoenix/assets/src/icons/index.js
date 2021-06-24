import React from "react";
import Check from "./check";
import Delete from "./delete";
import Edit from "./edit";
import Close from "./close";

const availableIcons = {
  check: Check,
  delete: Delete,
  edit: Edit,
  close: Close,
};

export const getIcon = (
  id,
  color = "black",
  height = "20px",
  width = "20px",
  marginLeft = "8px"
) => {
  if (!id) return null;

  const Icon = availableIcons[id];
  return <Icon style={{ height, width, color, marginLeft }} />;
};
