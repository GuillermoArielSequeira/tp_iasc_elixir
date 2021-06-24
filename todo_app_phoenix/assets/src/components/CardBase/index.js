import React from "react";
import classNames from "classnames";
import "./index.scss";

const CardBase = ({ children, className }) => {
  return (
    <section className={classNames("card-base", className)}>
      <div className={classNames("card-base-container", className)}>
        {children}
      </div>
    </section>
  );
};

export default CardBase;
