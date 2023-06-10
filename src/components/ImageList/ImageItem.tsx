import React, { FC } from "react";
import styles from "./ImageList.module.css";
import ModalImage from "components/Modal/ModalImage";

type Props = {
  item: Image;
  onSelected: (val: Image) => void;
};

const ImageItem: FC<Props> = ({ item, onSelected }) => {
  return (
    <div
      onClick={() => {
        onSelected && onSelected(item);
      }}
      className={styles["item-container"]}
    >
      <img
        src={item?.urls?.regular}
        alt={item?.alt_description}
        className={styles["item-image"]}
      />
      <div className={styles["item-description"]}>
        <span className="text-center">{item?.description || "No Title"}</span>
      </div>
      <div className={styles["item-profile"]}>
        <img
          className={styles["item-profile-image"]}
          src={item?.user?.profile_image?.medium}
          alt={item?.user?.name}
        />
        <span className={styles["item-profile-name"]}>{item?.user?.name}</span>
      </div>
    </div>
  );
};

export default ImageItem;
