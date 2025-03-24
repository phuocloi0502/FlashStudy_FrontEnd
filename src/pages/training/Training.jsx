import React, { useEffect, useState, useRef, useMemo } from "react";
import { Button, Card, Flex, Radio, Modal, Row, Col, Spin, Tour } from "antd";
import { IoMdSettings } from "react-icons/io";
import "./training.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapterList } from "../../redux/slide/chapterSlide";
import { FlashCard } from "../../components/card/FlashCard";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { setFlipped, setIsClicked } from "../../redux/slide/MyState";
import {
  fetchDataOnce,
  getDataForStatusIsTrue,
  getFilteredVocabulary,
  getIsTheFirst,
  getRealTimeData,
  setData,
  setIsTheFirst,
  shuffleArray,
} from "../../services/fetchData";
export const Training = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const chapterList = useSelector((state) => state.chapterSlice.chapterList);
  const location = useLocation();
  const { level, chapterNumber, sessionNumber } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const dragRef = useRef(false);
  const dragTimeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dataForFlashCard, setDataForFlashCard] = useState([]);
  const [dataFromFirebase, setDataFromFirebase] = useState(null);

  const UID = localStorage.getItem("UID");
  const vocabularyIdCurrent =
    dataForFlashCard?.[currentCardIndex]?.vocabulary_id;

  const lessonId = location.state?.lesson_id;
  const sessionNumber_text = sessionNumber.match(/\d+/)[0];
  const chapter_number_text = chapterNumber.match(/\d+/)[0];
  const PATCH = `vocabulary_status/${UID}/lessonId_${lessonId}/vocabularyId_${vocabularyIdCurrent}`;
  const PATCH_GET_DATA = `vocabulary_status/${UID}/lessonId_${lessonId}`;
  const PATCH_GET_DATA_IS_THE_FIRST = `is_the_first_status/${UID}`;

  const levelItem = {
    "JLPT-N1": "N1",
    "JLPT-N2": "N2",
    "JLPT-N3": "N3",
    "JLPT-N4": "N4",
    "JLPT-N5": "N5",
  };
  // get value list vocabulary
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
  // init value radio
  const statusVocabularyList = ["Tất cả", "Thuộc", "Chưa thuộc"];
  const [statusVocabulary, setStatusVocabulary] = useState("Tất cả"); // State lưu giá trị đã chọn
  const faces = ["Kanji", "Nghĩa"];
  const [face, setFace] = useState("Kanji");
  const showExample = ["Có", "Không"];
  const [isShowExample, setIsShowExample] = useState("Có");
  const [loading, setLoading] = useState();
  const [countV, setCountV] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const [theFirst, setTheFirst] = useState(false);

  // get data from firebase
  useEffect(() => {
    setCurrentCardIndex(0);
    setLoading(true); // Bắt đầu tải dữ liệu
    getIsTheFirst(PATCH_GET_DATA_IS_THE_FIRST)
      .then((data) => {
        //  console.log("the first: ", data?.isTheFirst);

        setTheFirst(data?.isTheFirst);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Xảy ra lỗi, dừng loading
      });
    fetchDataOnce(PATCH_GET_DATA)
      .then((data) => {
        setDataFromFirebase(data);
        setLoading(false); // Tải xong
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Xảy ra lỗi, dừng loading
      });
    setCountV(1);
  }, [statusVocabulary, refresh]);
  // handle radio
  const onChangeStatusVocabulary = (e) => {
    setStatusVocabulary(e.target.value); // Cập nhật state khi chọn radio mới
  };
  let statusVocabularyColor;
  if (statusVocabulary == "Thuộc") {
    statusVocabularyColor = "status-green";
  } else if (statusVocabulary == "Chưa thuộc") {
    statusVocabularyColor = "status-red";
  } else {
    statusVocabularyColor = "status-blue";
  }
  const filteredDataForFlashCard = useMemo(() => {
    if (statusVocabulary === "Thuộc") {
      return getFilteredVocabulary(dataFromFirebase, listVocabulary, true);
    } else if (statusVocabulary === "Chưa thuộc") {
      return getFilteredVocabulary(dataFromFirebase, listVocabulary, false);
    }
    return listVocabulary; // Default case for "Tất cả"
  }, [statusVocabulary, dataFromFirebase, listVocabulary]);

  const onChangeFace = (e) => {
    setFace(e.target.value);
  };
  const onChangeShowExample = (e) => {
    setIsShowExample(e.target.value);
  };

  // handle flash card

  const [styles, api] = useSpring(() => ({
    x: 0,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)", // Đặt giá trị mặc định cho boxShadow
    touchAction: "none",
    config: { tension: 900, friction: 90 },
  }));

  const minX = -50; // Giới hạn kéo tối thiểu
  const maxX = 50; // Giới hạn kéo tối đa
  const isClicked = useSelector((state) => state.MyState.isClicked);
  const flipped = useSelector((state) => state.MyState.flipped);

  const bind = useDrag(
    ({ down, movement: [mx], cancel }) => {
      const clampedX = Math.min(Math.max(mx, minX), maxX); // Giới hạn giữa minX và maxX
      let boxShadowColor = `0px 0px 0px rgba(0,0,0,0)`; // Giá trị mặc định

      if (down) {
        dragRef.current = true;
        setIsDragging(true);
        if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);

        if (clampedX > 5) {
          setData(PATCH, lessonId, vocabularyIdCurrent, true);
          boxShadowColor = `0px 0px 100px rgba(0, 255, 0, 0.5)`; // Màu xanh lá
        } else if (clampedX < -5) {
          setData(PATCH, lessonId, vocabularyIdCurrent, false);
          boxShadowColor = `0px 0px 100px rgba(255, 0, 0, 0.5)`; // Màu đỏ
        }
      } else {
        dragTimeoutRef.current = setTimeout(() => {
          dragRef.current = false;
          setIsDragging(false);
        }, 200);
      }

      // Cập nhật animation
      api.start({
        x: down ? clampedX : 0,
        boxShadow: boxShadowColor,
      });

      // Xử lý thay đổi currentCardIndex khi ngừng kéo

      if (!down) {
        if (isClicked) {
          dispatch(setFlipped(!flipped));
          dispatch(setIsClicked(!isClicked));
          setTimeout(() => {
            setCurrentCardIndex(
              (prevIndex) => (prevIndex + 1) % filteredDataForFlashCard?.length
            );
            setCountV(countV + 1);
          }, 600);
        } else {
          setCurrentCardIndex(
            (prevIndex) => (prevIndex + 1) % filteredDataForFlashCard?.length
          );
          setCountV(countV + 1);
        }
      }
    },
    { axis: "x" }
  );
  //handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // xu li du lieu hien thi

  useEffect(() => {
    if (listVocabulary && listVocabulary.length > 0) {
      setDataForFlashCard(shuffleArray(filteredDataForFlashCard));
    }
  }, [filteredDataForFlashCard]);

  // huong dan
  const [openTour, setOpenTour] = useState(true);
  const cardRef = useRef(null);
  const settingsRef = useRef(null);
  const isStudiedRef = useRef(null);
  const faceRef = useRef(null);
  const showExampleRef = useRef(null);
  const steps = [
    {
      // title: "Bước 1: Đăng nhập",
      description: "Nếu từ này chưa thuộc thì kéo thẻ qua trái",

      target: () => cardRef.current,
      nextButtonProps: { children: "Tiếp", type: "primary" },
    },
    {
      // title: "Bước 1: Đăng nhập",
      description: "Ngược lại nếu thuộc rồi thì kéo thẻ qua phải",
      target: () => cardRef.current,
      prevButtonProps: { children: "Trước" },
      nextButtonProps: { children: "Tiếp", type: "primary" },
    },
    {
      //  title: "Bước 3: Cài đặt",
      description: "Bấm vào đây để chọn cách luyện tập.",
      target: () => settingsRef.current,
      prevButtonProps: { children: "Trước" },
      nextButtonProps: {
        children: "Tiếp",
        type: "primary",
        onClick: () => {
          setIsModalOpen(true);
        },
      },
    },
    {
      //  title: "Bước 3: Cài đặt",
      description: "Chọn các từ thuộc hay chưa thuộc để ôn tập",
      target: () => isStudiedRef.current,
      prevButtonProps: { children: "Trước" },
      nextButtonProps: { children: "Tiếp", type: "primary" },
    },
    {
      //  title: "Bước 3: Cài đặt",
      description: "Mặt trước hiển thị kanji hay nghĩa",
      target: () => faceRef.current,
      prevButtonProps: { children: "Trước" },
      nextButtonProps: { children: "Tiếp", type: "primary" },
    },
    {
      //  title: "Bước 3: Cài đặt",
      description: "Có hiển thị ví dụ không",
      target: () => showExampleRef.current,
      prevButtonProps: { children: "Trước" },
      nextButtonProps: {
        children: "Hoàn tất",
        onClick: () => {
          setIsModalOpen(false);
          setOpenTour(false);
          setIsTheFirst(PATCH_GET_DATA_IS_THE_FIRST, false);
        },
      },
    },
  ];
  const handleOnCloseTour = () => {
    setIsModalOpen(false);
    setOpenTour(false);
    setIsTheFirst(PATCH_GET_DATA_IS_THE_FIRST, false);
  };
  return (
    <div className="training-wrap">
      <Spin spinning={loading} fullscreen={true} />
      {theFirst ? (
        <Tour
          open={openTour}
          onClose={handleOnCloseTour}
          steps={steps}
          gap={20}
        />
      ) : (
        <></>
      )}

      <div className="training-title content-title">
        <h3>
          Flash Card {level}
          <br /> Bài {sessionNumber_text} :
          <span> {listVocabulary?.[0]?.lesson}</span>
        </h3>
        <br />
      </div>
      <div className="training-content-wrap">
        <div className="training-content-header">
          <div className="option-area">
            <div className="show-model-button" ref={settingsRef}>
              <Button onClick={showModal} icon={<IoMdSettings />}>
                Cài đặt
              </Button>
            </div>
            <Modal
              title="Cài đặt"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Lưu"
              cancelText="Hủy"
            >
              <Row justify={"center"} ref={isStudiedRef}>
                <Col span={7}>
                  {" "}
                  <span>Hiển thị: </span>
                </Col>
                <Col span={9}>
                  {" "}
                  <Radio.Group
                    onChange={onChangeStatusVocabulary}
                    value={statusVocabulary}
                  >
                    {statusVocabularyList.map((option) => (
                      <Radio key={option} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Col>
              </Row>
              <Row justify={"center"} ref={faceRef}>
                <Col span={7}>
                  {" "}
                  <span>Mặt trước: </span>
                </Col>
                <Col span={9}>
                  <Radio.Group onChange={onChangeFace} value={face}>
                    {faces.map((option) => (
                      <Radio key={option} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Col>
              </Row>
              <Row justify={"center"} ref={showExampleRef}>
                <Col span={7}>
                  <span>Ví dụ: </span>
                </Col>
                <Col span={9}>
                  <Radio.Group
                    onChange={onChangeShowExample}
                    value={isShowExample}
                  >
                    {showExample.map((option) => (
                      <Radio key={option} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Col>
              </Row>
            </Modal>
            <div className={`status-vocabulary ${statusVocabularyColor}`}>
              <span> {statusVocabulary}</span>
            </div>
            <div className="count-vocabulary">
              <span>
                {filteredDataForFlashCard?.length == 0 ? (
                  <></>
                ) : (
                  <>
                    {currentCardIndex + 1} / {filteredDataForFlashCard?.length}
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="flash-card-area" ref={cardRef}>
            {filteredDataForFlashCard?.length == 0 ? (
              <>
                <h2>Không có từ vựng</h2>
              </>
            ) : (
              <>
                {filteredDataForFlashCard?.length == countV - 1 ? (
                  <>
                    {" "}
                    <Flex align="center" justify="center" vertical>
                      <h2>Hết</h2>
                      <Button
                        onClick={() => {
                          setRefresh(!refresh);
                        }}
                        style={{ margin: 100 }}
                      >
                        Học lại
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <>
                    <animated.div
                      style={{ ...styles }}
                      className="background-wrapper"
                      {...bind()}
                    >
                      <FlashCard
                        data={dataForFlashCard?.[currentCardIndex]}
                        isDragging={isDragging}
                        isBack={face}
                        isShowExample={isShowExample}
                      />
                    </animated.div>
                  </>
                )}
              </>
            )}
          </div>
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
                        setCurrentCardIndex(0);
                        nav(
                          `/tu-vung/${level}/chapter-${chapter?.chapter_number}/lesson-${lesson?.lesson_number}/luyen-tap`,
                          {
                            state: { lesson_id: lesson?.lesson_id },
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
