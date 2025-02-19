import React from "react";
import "./vocabulary.scss";
import { Box } from "../../components/box/Box";
import { useNavigate } from "react-router-dom";
import { Flex, Image } from "antd";
import banner from "../../assets/banner.webp";
export const Vocabulary = (props) => {
  const nav = useNavigate();
  const handleClick = (level) => {
    nav(`/tu-vung/${level}`);
  };
  return (
    <div className="vocabulary-page-wrap">
      <div className="vocabulary-page-header">
        <h2>🚀 Học nhanh - Nhớ lâu!</h2>
        <p>
          <strong>10.000 từ vựng JLPT</strong> <hr /> <em>Flashcard TANGO</em>
        </p>
        <Image
          preview={false}
          width={300}
          src={banner}
          alt=""
          style={{ borderRadius: "50%", border: "2px solid #ada2a2" }}
        />
      </div>

      <div className="vocabulary-page-content">
        <Flex wrap gap={20} justify="center">
          <Box
            title="JPLT N1"
            des="3000 TỪ VỰNG"
            type="n1"
            fontSize="small-font"
            size="box-size-desktop"
            onClick={() => handleClick("JLPT-N1")}
          />
          <Box
            onClick={() => handleClick("JLPT-N2")}
            title="JPLT N2"
            des="2500 TỪ VỰNG"
            type="n2"
            fontSize="small-font"
            size="box-size-desktop"
          />
          <Box
            onClick={() => handleClick("JLPT-N3")}
            title="JPLT N3"
            des="2000 TỪ VỰNG"
            type="n3"
            fontSize="small-font"
            size="box-size-desktop"
          />
          <Box
            onClick={() => handleClick("JLPT-N4")}
            title="JPLT N4"
            des="1500 TỪ VỰNG"
            type="n4"
            fontSize="small-font"
            size="box-size-desktop"
          />
          <Box
            onClick={() => handleClick("JLPT-N5")}
            title="JPLT N5"
            des="1000 TỪ VỰNG"
            type="n5"
            fontSize="small-font"
            size="box-size-desktop"
          />
        </Flex>
        {/* <div className="vocabulary-page-content-item">
            <Box
              title="JPLT N1"
              des="3000 TỪ VỰNG"
              type="n1"
              fontSize="small-font"
              size="box-size-desktop"
              onClick={() => handleClick("JLPT-N1")}
            />
          </div>
          <div className="vocabulary-page-content-item">
            <Box
              onClick={() => handleClick("JLPT-N2")}
              title="JPLT N2"
              des="2500 TỪ VỰNG"
              type="n2"
              fontSize="small-font"
              size="box-size-desktop"
            />
          </div>
          <div className="vocabulary-page-content-item">
            <Box
              onClick={() => handleClick("JLPT-N3")}
              title="JPLT N3"
              des="2000 TỪ VỰNG"
              type="n3"
              fontSize="small-font"
              size="box-size-desktop"
            />
          </div>
        </div>
        <div className="vocabulary-page-content-item-wrap">
          <div className="vocabulary-page-content-item">
            <Box
              onClick={() => handleClick("JLPT-N4")}
              title="JPLT N4"
              des="1500 TỪ VỰNG"
              type="n4"
              fontSize="small-font"
              size="box-size-desktop"
            />
          </div>
          <div className="vocabulary-page-content-item">
            <Box
              onClick={() => handleClick("JLPT-N5")}
              title="JPLT N5"
              des="1000 TỪ VỰNG"
              type="n5"
              fontSize="small-font"
              size="box-size-desktop"
            />
          </div> */}
      </div>
    </div>
  );
};
