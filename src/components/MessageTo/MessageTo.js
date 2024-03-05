import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable */
import CreateButton from "./CreateButton/CreateButton";

import InputPost from "./InputPost/InputPost";

import styles from "./MessageTo.module.css";

import MessageToToggleButton from "./MessageToToggleButton/MessageToToggleButton";

import fetchBackgroundImageUrls from "components/Api/fetchBackgroundImageUrls";

import "../../styles/color.css";
import usePostPaper from "components/Api/usePostPaper";

const COLORS = ["beige", "purple", "blue", "green"];

const MessageTo = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [select, setSelect] = useState("Color");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickCreateButton = () => {
    try {
      const recipientData =
        select === "Color"
          ? {
              name: name,
              backgroundColor: selectedColor || "beige",
            }
          : {
              name: name,
              backgroundColor: selectedColor || "beige",
              backgroundImageURL: photos[selectedPhoto],
            };

      usePostPaper(recipientData).then((v) => {
        navigate(`${v.id}`);
      });
    } catch (error) {
      throw new Error("Error in useEffect:", error);
    }
  };

  useEffect(() => {
    fetchBackgroundImageUrls().then((v) => {
      setPhotos(v);
    });
  }, []);

  const onChange = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleError = () => {
    if (!name) {
      setError(true);
    }
  };

  return (
    <div className={styles.PostPageBody}>
      <InputPost
        name={name}
        error={error}
        onChange={onChange}
        handleError={handleError}
      />
      <div className={styles.Center}>
        <div className={styles.ChooseText}>
          <div className={styles.ChooseView}>배경화면을 선택해 주세요.</div>
          <div className={styles.ChooseColorImage}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </div>
        </div>
        <MessageToToggleButton
          COLORS={COLORS}
          photos={photos}
          selectedColor={selectedColor}
          selectedPhoto={selectedPhoto}
          setSelectedColor={setSelectedColor}
          setSelectedPhoto={setSelectedPhoto}
          select={select}
          setSelect={setSelect}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      <CreateButton name={name} onClick={handleClickCreateButton} />
    </div>
  );
};

export default MessageTo;
