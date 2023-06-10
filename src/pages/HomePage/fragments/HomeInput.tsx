import React, { FC, useState } from "react";
import styles from "pages/HomePage/Home.module.css";

type Props = {
  onSubmit: (isReset?: boolean) => void;
  onChange: (val: string) => void;
  value: string;
};

const HomeInput: FC<Props> = ({ value, onChange, onSubmit }) => {
  return (
    <div className={styles["home-input"]}>
      <input
        value={value}
        onChange={(e) => onChange(e?.currentTarget?.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(true);
          }
        }}
        placeholder="Search your image..."
        autoFocus
      />
      <button onClick={() => onSubmit()} className="button">
        Search
      </button>
    </div>
  );
};

export default HomeInput;
