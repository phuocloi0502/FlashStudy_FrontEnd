export const dataTable = (rawData) => {
  const data = rawData?.map((item) => ({
    key: item.vocabulary_id,
    ...item,
  }));
  return data;
};
