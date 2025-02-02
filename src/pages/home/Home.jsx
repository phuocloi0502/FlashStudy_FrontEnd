import React from "react";
import "./home.scss";
import { TbVocabulary } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { AiTwotoneInsurance } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";

import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "../../components/box/Box";
export const Home = (props) => {
  const nav = useNavigate();

  return (
    <div className="home-page-wrap">
      <div className="home-page-title">
        <h3>Flash Study</h3>
        <h4>Học nhanh, nhớ nhanh !</h4>
      </div>
      <div className="home-page-content ">
        <div className="box-wrap ">
          {" "}
          <div className="box-icon">
            <span className="vocabulary-color">
              {" "}
              <TbVocabulary />
            </span>{" "}
            <h2 className="box-content"> Từ vựng </h2>
            <Button
              type="primary"
              onClick={() => {
                nav("tu-vung");
              }}
            >
              Học ngay
            </Button>
          </div>
          <div className="box-title">
            10 000 từ vựng JLPT với cấp độ N1, N2, N3, N4, N5.
          </div>
          <div className="box-des">
            {" "}
            Các từ vựng được sắp xếp theo chủ đề và có câu ví dụ đi kèm, giúp
            bạn không chỉ dễ dàng liên kết các từ với nhau mà còn nhớ cách sử
            dụng chúng.
          </div>
        </div>
        <Box
          title="JPLT"
          des="10 000 từ vựng"
          type="vocabulary"
          fontSize="big-font"
          size="home-size-desktop"
        />
      </div>
      <div className="home-page-content">
        <div className="box-wrap">
          {" "}
          <div className="box-icon v">
            <span className="grammar-color">
              {" "}
              <FaBook />
            </span>{" "}
            <h2 className="box-content"> Ngữ pháp </h2>
            <Button
              type="primary"
              onClick={() => {
                nav("ngu-phap");
              }}
            >
              Học ngay
            </Button>
          </div>
          <div className="box-title">
            1000 ngữ pháp JLPT với cấp độ N1, N2, N3, N4, N5.
          </div>
          <div className="box-des">
            {" "}
            Các ngữ pháp phổ biến hay xuất hiện trong kì thi JLPT và được sử
            dụng phổ biến được sắp xếp cụ thể và giải thích chi tiết rõ ràng.
          </div>
        </div>
        <Box
          title="JPLT"
          des="1000 ngữ pháp"
          type="grammar"
          fontSize="big-font"
          size="home-size-desktop"
        />
      </div>
      <div className="home-page-content">
        <div className="box-wrap">
          {" "}
          <div className="box-icon v">
            <span className="kanji-color">
              {" "}
              <AiTwotoneInsurance />
            </span>{" "}
            <h2 className="box-content"> Kanji </h2>
            <Button
              type="primary"
              onClick={() => {
                nav("kanji");
              }}
            >
              Học ngay
            </Button>
          </div>
          <div className="box-title">
            2136 kanji JLPT với cấp độ N1, N2, N3, N4, N5.
          </div>
          <div className="box-des">
            "Chúng tôi không chỉ cung cấp Kanji, mà còn cả văn hóa. Mỗi ký tự
            Kanji đều ẩn chứa câu chuyện và văn hóa Nhật Bản, hãy cùng khám
            phá!"
          </div>
        </div>
        <Box
          title="JPLT"
          des="2136 kanji"
          type="kanji"
          fontSize="big-font"
          size="home-size-desktop"
        />
      </div>
      <div className="home-page-content">
        <div className="box-wrap">
          {" "}
          <div className="box-icon v">
            <span className="blog-color">
              {" "}
              <FaBlog />
            </span>{" "}
            <h2 className="box-content"> Mẹo hay </h2>
            <Button
              type="primary"
              onClick={() => {
                nav("blog");
              }}
            >
              Xem ngay
            </Button>
          </div>
          <div className="box-title">
            "Tăng động lực học tiếng Nhật qua từng câu nói!"{" "}
          </div>
          <div className="box-des">
            "Khám phá sự sâu sắc trong từng câu nói Nhật Bản!" Những câu châm
            ngôn đầy cảm hứng không chỉ giúp bạn học Kanji mà còn hiểu sâu hơn
            về văn hóa Nhật Bản.
          </div>
        </div>
        <Box
          title="JPLT"
          des="Các mẹo hay"
          type="blog"
          fontSize="big-font"
          size="home-size-desktop"
        />
      </div>
    </div>
  );
};
