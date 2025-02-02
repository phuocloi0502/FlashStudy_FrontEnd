import { ref, set, onValue, getDatabase, get } from "firebase/database";
import { database } from "../firebase";
import { data } from "react-router-dom";

export const setData = async (path, lessonId, vocabularyId, status) => {
  const data = {
    vocabulary_id: vocabularyId,
    status: status,
  };
  try {
    await set(ref(database, path), data);
  } catch (error) {
    console.log("Loi ghi du lieu: ", error);
  }
};
export const fetchDataOnce = async (path) => {
  const db = getDatabase();
  const dataRef = ref(db, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Trả về dữ liệu từ Firebase
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
// Hàm lắng nghe dữ liệu thời gian thực
export const getRealTimeData = (path, callback) => {
  const dataRef = ref(database, path); // Đường dẫn đến dữ liệu
  onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val(); // Lấy dữ liệu từ snapshot

      callback(data); // Gọi callback với dữ liệu mới
    } else {
      console.log("Không có dữ liệu tại đường dẫn:", path);
      callback(null);
    }
  });
};
export const shuffleArray = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }

  const newArray = [...array]; // Sao chép mảng để tránh thay đổi mảng gốc
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Lấy chỉ số ngẫu nhiên
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  return newArray;
};
export const getDataForStatusIsTrue = (data, isStatus) => {
  if (data != undefined) {
    return Object.values(data)
      .filter((item) => item.status === isStatus)
      .map((item) => item.vocabulary_id);
  }
  return null;
};
export const filterVocabularyByStatus = (vocabularyDetails, validIds) => {
  return vocabularyDetails.filter((vocab) =>
    validIds.includes(vocab.vocabulary_id)
  );
};
export const getFilteredVocabulary = (data, vocabularyDetails, isStatus) => {
  if (!data || !vocabularyDetails) return [];
  return vocabularyDetails.filter((vocab) =>
    Object.values(data).some(
      (item) =>
        item.status == isStatus && item.vocabulary_id == vocab.vocabulary_id
    )
  );
};
