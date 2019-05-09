export const getVesselData = dataGenerationLength => {
  const data = [];
  for (let i = 0; i < dataGenerationLength; i++) {
    data.push({
      LAT: getRndIntegerFixedTo3Digits(-90, 90),
      LON: getRndIntegerFixedTo3Digits(-180, 180),
      SPEED: getRndFloorInteger(0, 100),
      COURSE: getRndFloorInteger(0, 359),
      HEADING: getRndFloorInteger(0, 359),
      SHIPNAME: getRndText(),
      SHIPTYPE: getRndFloorInteger(3, 9),
      SHIP_ID: i,
    });
  }

  return data;
};

const getRndFloorInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRndIntegerFixedTo3Digits = (min, max) => {
  return +(Math.random() * (max - min) + min).toFixed(3);
};

const getRndText = () => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
