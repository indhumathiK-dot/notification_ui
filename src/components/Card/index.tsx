import React from "react";

import "./styles.scss";

type Tprops = {
  title: string;
  icon: any;
  url: string;
};

export const Card: React.FC<Tprops> = ({ title, icon, url }) => {
  return (
    <a target="_blank" href={url} className="card-wrapper">
      <div className="card-ic">
        <div className="circle-layer">
          <img src={icon} />
        </div>
      </div>
      <div className="card-des">{title}</div>
    </a>
  );
};
