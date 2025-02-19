import React, { useState, useRef, useEffect } from "react";
import "./flash_card.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFlipped, setIsClicked } from "../../redux/slide/MyState";
import { Flex } from "antd";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import ReactAudioPlayer from "react-audio-player";

export const FlashCard = ({ data, isBack, isDragging, isShowExample }) => {
  // const [flipped, setFlipped] = useState(false);
  const dispatch = useDispatch();
  const flipped = useSelector((state) => state.MyState.flipped);
  const isClicked = useSelector((state) => state.MyState.isClicked);
  const handleCardClick = (e) => {
    if (isDragging) {
      e.preventDefault(); // Ngừng sự kiện click khi đang kéo
      return; // Không xử lý sự kiện click
    } else {
      dispatch(setFlipped(!flipped));
      dispatch(setIsClicked(!isClicked));
    }
  };
  useEffect(() => {
    if (isClicked) {
      dispatch(setFlipped(!flipped));
      dispatch(setIsClicked(!isClicked));
    }
  }, [isBack]);
  const convertToRuby = (text) => {
    // Kiểm tra nếu text là chuỗi
    if (typeof text !== "string") {
      return text;
    }

    // Sử dụng regular expression để tìm các cặp Kanji và Hiragana trong dấu ngoặc
    return text.replace(
      /([一-龯]+)（([ぁ-んァ-ン]+)）/g,
      (match, kanji, hiragana) => {
        // Tạo ruby markup với <ruby> và <rt> cho Hiragana
        return `<ruby><rb>${kanji}</rb><rt>${hiragana}</rt></ruby>`;
      }
    );
  };
  const example = convertToRuby(data?.example.replace(/(\s*\n\s*)+/g, "<br>"));
  const example_meaning = data?.example_meaning
    ?.replace(/\/+/g, "<br>") // Thay thế dấu "/" bằng <br>
    .replace(/\s?(B:)/g, "<br>$1"); // Thêm <br> trước "B:"
  // console.log(data);

  // handle audio

  const audioRefs = useRef({});

  const handleSoundCardClick = (e, vocabulary_id) => {
    if (audioRefs.current[vocabulary_id]) {
      const audioElement = audioRefs.current[vocabulary_id].audioEl.current;
      audioElement.currentTime = 0;
      audioElement.play();
    }

    e.stopPropagation();
  };
  return (
    <div
      className={`flash-card ${flipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className={`flash-card-front ${isBack != "Kanji" ? "is-back" : ""}`}>
        <h3>{data?.kanji}</h3>

        {isBack != "Kanji" ? (
          <>
            {" "}
            <span className="fl-furigana">{data?.furigana}</span>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={`flash-card-back ${isBack == "Kanji" ? "is-back" : ""}`}>
        {isBack == "Kanji" ? (
          <>
            <span className="fl-furigana">{data?.furigana} </span>{" "}
          </>
        ) : (
          <></>
        )}
        <span className="fl-meaning">{data?.meaning}</span>

        {isShowExample == "Có" ? (
          <>
            {isBack == "Kanji" ? (
              <Flex align="center" vertical gap={20}>
                {data?.example == "Không có ví dụ" ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <span
                      className="fl-example"
                      dangerouslySetInnerHTML={{ __html: example }}
                    ></span>
                    <span
                      className="fl-example-meaning"
                      dangerouslySetInnerHTML={{ __html: example_meaning }}
                    ></span>
                  </>
                )}
              </Flex>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="play-icon-card">
          <IoPlayCircleOutline
            size={40}
            color="black"
            onClick={(e) => {
              handleSoundCardClick(e, data?.vocabulary_id);
            }}
          />
          <ReactAudioPlayer
            ref={(el) => (audioRefs.current[data?.vocabulary_id] = el)}
            src={data?.sound_url}
          />
        </div>
      </div>
    </div>
  );
};
