const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  var css = message.search("Please") > -1 ? "err-msg" : "msg";

  return <div className={css}>{message}</div>;
};

export default Notification;
