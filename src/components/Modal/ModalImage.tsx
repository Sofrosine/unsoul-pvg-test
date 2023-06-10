import clsx from "clsx";
import styles from "./ModalImage.module.css";
import { FC, useRef } from "react";
import IcClose from "assets/icons/ic-close-white.svg";
import IcDownload from "assets/icons/ic-download-white.svg";
import constants from "config/constants";
import axios from "axios";

type Props = {
  selectedImage: Image;
  onClose: () => void;
};

const ModalImage: FC<Props> = ({ selectedImage, onClose }) => {
  const toDataURL = async (url: any) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const imageUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "image.png"); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const handleDownload = () => {
    axios
      .get(
        `${selectedImage?.links?.download_location}&client_id=${constants.clientKey}`
      )
      .then((response) => {
        let url = response.data.url;
        toDataURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal flex items-center justify-center">
      <div
        className={clsx(
          "modal-content flex items-center justify-center",
          styles["modal-image-content"]
        )}
      >
        <img
          src={selectedImage?.urls?.full}
          alt={selectedImage?.alt_description}
          className={styles["modal-image"]}
        />
        <div className={styles["modal-image-utils-container"]}>
          <div
            onClick={() => {
              handleDownload();
            }}
            className={styles["modal-image-download"]}
          >
            <img src={IcDownload} alt="ic-download" />
          </div>
          <div
            onClick={() => onClose && onClose()}
            className={styles["modal-image-close"]}
          >
            <img src={IcClose} alt="ic-close" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
