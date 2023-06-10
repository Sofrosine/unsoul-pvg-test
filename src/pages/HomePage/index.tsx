import constants from "config/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import APICall from "utils/axios";
import styles from "pages/HomePage/Home.module.css";
import ImageList from "components/ImageList";
import HomeInput from "./fragments/HomeInput";
import ModalImage from "components/Modal/ModalImage";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPhotos();
  }, [page]);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const getPhotos = async (isReset?: boolean) => {
    if (!isLoading) {
      setLoading(true);
    }
    if (isReset) {
      setData([]);
      setTotalPages(0);
      setPage(1);
    }
    try {
      const response = await APICall.get("search/photos", {
        params: {
          query: search,
          page,
          per_page: 10,
        },
      });
      if (response.status === 200) {
        setData([...data, ...response?.data?.results]);
        setTotalPages(response?.data?.total_pages);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles["home-top-section"]}>
        <h1 className={styles["home-title"]}>UNSOUL IMAGES</h1>
        <code className={styles["home-subtitle"]}>
          images taken from unsplash
        </code>
        <HomeInput value={search} onChange={setSearch} onSubmit={getPhotos} />
      </div>
      <div className={styles["home-content"]}>
        <ImageList
          onSelectedImage={(val) => setSelectedImage(val)}
          data={data}
          loading={isLoading}
        />
        {isLoading && <div className="loader" style={{ marginTop: "24px" }} />}
        <div ref={observerTarget}></div>
      </div>
      {selectedImage && (
        <ModalImage
          onClose={() => setSelectedImage(null)}
          selectedImage={selectedImage!}
        />
      )}
    </div>
  );
};

export default HomePage;
