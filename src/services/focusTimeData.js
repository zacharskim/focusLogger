import axios from "axios";

//const baseUrl = "http://localhost:3001/";
const baseUrl = "https://focus-back.fly.dev/";

const getFocusTimes = () => {
  const req = axios.get(`${baseUrl}`);

  return req.then((res) => res);
};

const addFocusTime = async (intetion, length, email, tag, tagColor) => {
  const focusTimeObj = {
    userEmail: email,
    tagColor: tagColor,
    intention: intetion,
    tag: tag,
    localTime: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    length: length,
  };

  //this get's spit out in the js console...
  const req = await axios.post(baseUrl, focusTimeObj);
  return req.data;
};

const deleteFocusTime = (id, focusTimeObj) => {
  axios.delete(`${baseUrl}${id}`, focusTimeObj);
  console.log("deleted this boi", focusTimeObj);
  //does return true need to be here??
  return true;
};

const updateFocusTime = (id, newFocusTimeObj) => {
  const req = axios.put(`${baseUrl}${id}`, newFocusTimeObj);

  return req.data;
};

const api = {
  getFocusTimes,
  addFocusTime,
  deleteFocusTime,
  updateFocusTime,
};

export default api;
