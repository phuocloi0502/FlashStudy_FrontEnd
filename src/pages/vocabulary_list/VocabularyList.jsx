import React, { useEffect } from "react";
import "./vocabulary_list.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Space, Table, Button, Spin } from "antd";
import { IoPlayCircleOutline } from "react-icons/io5";
import { changeLessonIdCurrent } from "../../redux/slide/LessonSlide";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { dataTable } from "../../../utils/constanst";
import { fetchChapterList } from "../../redux/slide/chapterSlide";
export const VocabularyList = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const levelItem = {
    "JLPT-N1": "N1",
    "JLPT-N2": "N2",
    "JLPT-N3": "N3",
    "JLPT-N4": "N4",
    "JLPT-N5": "N5",
  };
  const { level, chapterNumber, sessionNumber } = useParams();

  const location = useLocation();
  const lessonId = location.state?.ss_id;
  const sessionNumber_text = sessionNumber.match(/\d+/)[0];
  const chapter_number_text = chapterNumber.match(/\d+/)[0];

  const chapterList = useSelector((state) => state.chapterSlice.chapterList);
  const loading = useSelector((state) => state.chapterSlice.loading);
  useEffect(() => {
    dispatch(fetchChapterList(levelItem[level]));
  }, []);

  const findLessonByNumber = (chapterNumber, lessonId) => {
    const chapter = chapterList?.find(
      (chapter) => chapter.chapter_number == chapterNumber
    );
    return chapter?.lessonList?.find((lesson) => lesson.lesson_id === lessonId);
  };
  const listVocabulary = findLessonByNumber(
    chapter_number_text,
    lessonId
  )?.vocabularyList;

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

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "id",
      responsive: ["lg"],
      render: (text, record, index) => (
        <div className="table-index-wrap">
          {index + 1} <br />
          <div className="play-icon">
            <IoPlayCircleOutline />
          </div>
        </div>
      ),
    },
    {
      title: "Từ vựng",
      dataIndex: "kanji",
      key: "kanji",
      render: (text, record, index) => (
        <div className="vocabulary-item">
          <div className="kanji-area">{record.kanji}</div>
          <div className="furigana-area">{record.furigana}</div>
          <div className="mean-area">{record.meaning}</div>
        </div>
      ),
    },
    {
      title: "Ví dụ",
      dataIndex: "example",
      key: "example",

      render: (text, record, index) => {
        if (typeof text !== "string") {
          return <div>Không có ví dụ hợp lệ</div>;
        }

        const rubyText = convertToRuby(
          record.example.replace(/(\s*\n\s*)+/g, "<br>")
        );

        return (
          <div className="vocabulary-item">
            <div className="example-area">
              <p dangerouslySetInnerHTML={{ __html: rubyText }} />
            </div>
            <div
              className="example-mean-area"
              dangerouslySetInnerHTML={{
                __html: record.example_meaning?.replace(/\/+/g, "<br>"),
              }}
            ></div>
          </div>
        );
      },
    },
  ];
  window.scrollTo({
    top: 0, // Cuộn đến vị trí đầu trang
    behavior: "smooth", // Tạo hiệu ứng cuộn mượt
  });

  return (
    <div className="vocabulary-list-wrap">
      <Spin spinning={loading} fullscreen={true} />
      <div className="vocabulary-list-title content-title">
        <h3>
          Từ vựng {level} <br /> Chủ đề{" "}
          <span>{listVocabulary?.[0]?.lesson}</span>
        </h3>
        <br />
        <Button
          type="primary"
          onClick={() => {
            nav(
              `/tu-vung/${level}/chapter-${chapter_number_text}/lesson-${sessionNumber_text}/luyen-tap`,
              {
                state: { lesson_id: lessonId },
              }
            );
          }}
        >
          {" "}
          Luyện tập với Flash Card
        </Button>
      </div>
      <div className="vocabulary-list-content-wrap">
        <div className="vocabulary-list">
          {chapterList.length > 0 ? (
            <Table
              columns={columns}
              dataSource={dataTable(listVocabulary)}
              pagination={false}
              rowKey={(record) => record.key}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="muc-luc-area">
          {" "}
          <h2>Mục lục</h2>
          {chapterList?.map((chapter) => (
            <div className="chapter-item" key={chapter?.chapter_number}>
              {" "}
              <div className="chapter-title">
                <span>Chapter {chapter?.chapter_number}</span>
                <strong>{chapter?.chapter_name}</strong>
              </div>
              <div className="session-wrap">
                {chapter?.lessonList?.map((lesson) => (
                  <div className="session-item" key={lesson?.lesson_id}>
                    <span>Bài {lesson?.lesson_number}</span>
                    <strong
                      onClick={() => {
                        window.scrollTo({
                          top: 0, // Cuộn đến vị trí đầu trang
                          behavior: "smooth", // Tạo hiệu ứng cuộn mượt
                        });
                        const ss_id = lesson?.lesson_id;
                        nav(
                          `/tu-vung/JLPT-${chapter?.level_id}/chapter-${chapter.chapter_number}/lesson-${lesson.lesson_number}`,
                          {
                            state: { ss_id: ss_id },
                          }
                        );
                      }}
                      className={` ${
                        lessonId == lesson?.lesson_id ? "session-current" : ""
                      }`}
                    >
                      {lesson?.lesson_name}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
