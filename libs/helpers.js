import Compressor from "compressorjs";

export function compressImage(image) {
  let quality = 0.6;
  if (image.size > 1000000) {
    quality = 0.4;
  }
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: quality,
      convertSize: 1000000,
      checkOrientation: false,
      success(result) {
        resolve(result);
      },
      error(e) {
        console.log(e.message);
        reject(e);
      }
    });
  });
}

const checkImage = file => {
  const acceptedFiles = [".png", ".PNG", ".jpeg", ".JPEG", ".jpg", ".JPG"];
  const ext = file.name.slice(file.name.lastIndexOf("."));
  if (!acceptedFiles.includes(ext)) return false;
  return true;
};

export const isImage = value => {
  if (Array.isArray(value)) {
    for (let file of value) {
      if (!checkImage(file)) return false;
    }
  } else if (value) {
    const file = value;
    if (!checkImage(file)) return false;
  }
  return true;
};

export const lessThan = inputValue => value => {
  return value < inputValue ? true : false;
};

export const isEmbedURL = value => {
  if (value) {
    if (
      value.includes("youtube") ||
      value.includes("vimeo") ||
      value.includes("slideshare") ||
      value.includes("codepen") ||
      value.includes("gist") ||
      value.includes("jsFiddle") ||
      value.includes("googleSlide") ||
      value.includes("soundcloud")
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// universally unique identifier
export function genId(length) {
  let uiid = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < length; i++) {
    uiid += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  const minutesNow = Math.floor(Date.now() / (1000 * 60));
  return minutesNow + uiid;
}

export function genUrl(title, uuid) {
  if (uuid) {
    return title.replace(/\s+|[,\/?]/g, "-").toLowerCase() + "-" + uuid;
  } else {
    return title.replace(/\s+|[,\/?]/g, "-").toLowerCase();
  }
}

export function fetchId(url) {
  return url.split("-").pop();
}

// TODO
export function fetchTitle(url) {
  url.split("-").pop();
  return url.join("");
}

export function fetchKey(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function fetchDesc(value) {
  const matches = [];
  value.replace(/<p>(.*?)<\/p>/g, function () {
    matches.push(arguments[1]);
  });
  return matches[0];
}

export function deepCopy(arg) {
  return JSON.parse(JSON.stringify(arg));
}

export function authMessage(arg) {
  let message = "";
  switch (arg.code) {
    case "auth/email-already-in-use":
      message = "Email đã được sử dụng";
      break;
    case "auth/user-not-found":
      message = "Tài khoản không tồn tại";
      break;
    case "auth/wrong-password":
      message = "Mật khẩu không chính xác";
      break;
    case "auth/invalid-action-code":
      message = "Mã xác nhận không hợp lệ";
      break;
    default:
      message = "Có lỗi xảy ra";
  }
  return message;
}
