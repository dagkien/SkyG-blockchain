export const caesar = function (key) {
  this.key = key;
  function shiftMsg(msg, k) {
    let result = "";
    for (let i = 0; i < msg.length; i++) {
      result += String.fromCharCode(msg.charCodeAt(i) + k);
    }
    return result;
  }

  this.encrypt = function (msg) {
    return shiftMsg(msg, this.key);
  };

  this.decrypt = function (msg) {
    return shiftMsg(msg, -this.key);
  };
};
