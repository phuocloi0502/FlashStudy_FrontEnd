import React from "react";
import "./box.scss";
export const Box = ({ onClick, title, des, type, size, fontSize }) => {
  let className = `bg-img ${type}-color ${fontSize}`;
  let classSize = `image-content-wrap ${size}`;

  return (
    <div className={classSize} onClick={onClick}>
      <div className={className}>
        <div className="bg-img-content">
          <div className="header-content">Kỳ thi năng lực tiếng nhật</div>
          <div className="main-content">{title}</div>
          <div className="des-content">{des}</div>
        </div>
      </div>
    </div>
  );
};
