import React, { useEffect, useState } from "react";
import "./vocabulary_des.scss";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChapterList } from "../../redux/slide/chapterSlide";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
export const Chapter = (props) => {
  window.scrollTo({
    top: 0, // Cuộn đến vị trí đầu trang
    behavior: "smooth", // Tạo hiệu ứng cuộn mượt
  });
  const { vocabularyLevel } = useParams();
  const levelItem = {
    "JLPT-N1": "N1",
    "JLPT-N2": "N2",
    "JLPT-N3": "N3",
    "JLPT-N4": "N4",
    "JLPT-N5": "N5",
  };
  // const [chapterList, setChapterList] = useState(null);
  const dispatch = useDispatch();
  const chapterList = useSelector((state) => state.chapterSlice.chapterList);
  const loading = useSelector((state) => state.chapterSlice.loading);
  useEffect(() => {
    dispatch(fetchChapterList(levelItem[vocabularyLevel]));
  }, [vocabularyLevel]);

  if (chapterList != null) {
    Object.values(chapterList).forEach((element) => {
      //  console.log(element);
    });
  }
  // console.log(loading);

  const half = chapterList?.length ? Math.ceil(chapterList.length / 2) : 0; // Kiểm tra nếu chapterList có dữ liệu
  const leftColumn = chapterList?.slice(0, half);
  const rightColumn = chapterList?.slice(half);

  // console.log(chapterList);

  const nav = useNavigate();

  return (
    <div className="chapter-wrap">
      <Spin spinning={loading} fullscreen={true} />
      <div className="content-title">
        <h3>Từ vựng {vocabularyLevel}</h3>
        <h4>
          Từ vựng được sắp xếp theo chủ đề và có câu ví dụ đi kèm. Chọn bài và
          bắt đầu học nào!
        </h4>
      </div>
      <div className="chapter-content">
        <div className="chapter-column">
          {leftColumn?.map((chapter) => (
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
                        const ss_id = lesson?.lesson_id;
                        nav(
                          `/tu-vung/JLPT-${chapter?.level_id}/chapter-${chapter.chapter_number}/lesson-${lesson.lesson_number}`,
                          {
                            state: { ss_id: ss_id },
                          }
                        );
                      }}
                    >
                      {lesson?.lesson_name}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="chapter-column">
          {rightColumn?.map((chapter) => (
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
                        const ss_id = lesson?.lesson_id;
                        nav(
                          `/tu-vung/JLPT-${chapter?.level_id}/chapter-${chapter.chapter_number}/lesson-${lesson.lesson_number}`,
                          {
                            state: { ss_id: ss_id },
                          }
                        );
                      }}
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
