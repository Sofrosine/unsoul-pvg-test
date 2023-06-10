import React, { FC } from "react";
import ImageItem from "./ImageItem";
import styles from "./ImageList.module.css";

type Props = {
  data: Image[];
  loading?: boolean;
  onSelectedImage: (val: Image) => void;
};

const ImageList: FC<Props> = ({ data, loading, onSelectedImage }) => {
  return (
    <div className={styles["container"]}>
      {data?.length > 0 ? (
        data.map((val) => {
          return (
            <ImageItem
              onSelected={(val) => {
                onSelectedImage && onSelectedImage(val);
              }}
              item={val}
              key={val?.id}
            />
          );
        })
      ) : loading ? (
        <div />
      ) : (
        <span className="text-white">
          No images found, go search using another keyword
        </span>
      )}
    </div>
  );
};

export default ImageList;
