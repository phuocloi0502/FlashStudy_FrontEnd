import React from "react";
import "./vocabulary.scss";
import { Box } from "../../components/box/Box";
import { useNavigate } from "react-router-dom";
export const Vocabulary = (props) => {
  const nav = useNavigate();
  const handleClick = (level) => {
    nav(`/tu-vung/${level}`);
  };
  return (
    <div className="vocabulary-page-wrap">
      <div className="vocabulary-page-header content-title">
        <h3>Từ vựng JLPT theo cấp độ</h3>
        <h4>
          Các từ vựng được sắp xếp theo chủ đề và có câu ví dụ đi kèm, giúp bạn
          không chỉ dễ dàng liên kết các từ với nhau mà còn nhớ cách sử dụng
          chúng.
        </h4>
      </div>
      <hr />
      <div className="vocabulary-page-content">
        <div className="vocabulary-page-content-item-wrap">
          <div className="vocabulary-page-content-item">
            <Box
              title="JPLT N1"
              des="3000 TỪ VỰNG"
              type="n1"
              fontSize="small-font"
              size="box-size-desktop"
              onClick={() => handleClick("JLPT-N1")}
            />
            <div className="des-wrap">
              <div
                className="des-header"
                onClick={() => handleClick("JLPT-N1")}
              >
                {" "}
                3000 Từ vựng JLPT N1
              </div>
              <div className="des-description">
                Tổng hợp 3000 Từ vựng thông dụng trong cuộc sống
              </div>
              <div className="des-nihongo">
                はじめての日本語能力試験 N1 単語 3000
              </div>
              <div className="des-link">Học miễn phí ngay</div>
            </div>
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
            <div className="des-wrap">
              <div
                className="des-header"
                onClick={() => handleClick("JLPT-N2")}
              >
                {" "}
                2500 Từ vựng JLPT N2
              </div>
              <div className="des-description">
                Tổng hợp 2500 Từ vựng thông dụng trong cuộc sống
              </div>
              <div className="des-nihongo">
                はじめての日本語能力試験 N2 単語 2500
              </div>
              <div className="des-link">Học miễn phí ngay</div>
            </div>
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
            <div className="des-wrap">
              <div
                className="des-header"
                onClick={() => handleClick("JLPT-N3")}
              >
                {" "}
                2000 Từ vựng JLPT N3
              </div>
              <div className="des-description">
                Tổng hợp 2000 Từ vựng thông dụng trong cuộc sống
              </div>
              <div className="des-nihongo">
                はじめての日本語能力試験 N3 単語 2000
              </div>
              <div className="des-link">Học miễn phí ngay</div>
            </div>
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
            <div className="des-wrap">
              <div
                className="des-header"
                onClick={() => handleClick("JLPT-N4")}
              >
                {" "}
                1500 Từ vựng JLPT N4
              </div>
              <div className="des-description">
                Tổng hợp 1500 Từ vựng thông dụng trong cuộc sống
              </div>
              <div className="des-nihongo">
                はじめての日本語能力試験 N4 単語 1500
              </div>
              <div className="des-link">Học miễn phí ngay</div>
            </div>
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
            <div className="des-wrap">
              <div
                className="des-header"
                onClick={() => handleClick("JLPT-N5")}
              >
                {" "}
                1000 Từ vựng JLPT N5
              </div>
              <div className="des-description">
                Tổng hợp 1000 Từ vựng thông dụng trong cuộc sống
              </div>
              <div className="des-nihongo">
                はじめての日本語能力試験 N5 単語 1000
              </div>
              <div className="des-link">Học miễn phí ngay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
