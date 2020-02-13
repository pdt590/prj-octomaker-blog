import Compressor from "compressorjs";

export function windowPopup(url, title, w, h) {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `
  );

  if (window.focus) newWindow.focus();
}

export const acceptedImages =
  ".png, .PNG, .jpeg, .JPEG, .jpg, .JPG, .gif, .GIF";

export const isImage = file => {
  const acceptedFiles = [
    ".png",
    ".PNG",
    ".jpeg",
    ".JPEG",
    ".jpg",
    ".JPG",
    ".gif",
    ".GIF"
  ];
  if (!file) return false;
  const ext = file.name.slice(file.name.lastIndexOf("."));
  if (!acceptedFiles.includes(ext)) return false;
  return true;
};

export const isGif = file => {
  const acceptedFiles = [".gif", ".GIF"];
  if (!file) return false;
  const ext = file.name.slice(file.name.lastIndexOf("."));
  if (!acceptedFiles.includes(ext)) return false;
  return true;
};

export function compressImage(image) {
  const maxSize = 1500000;
  const quality = 0.5;
  if (image.size < maxSize || isGif(image)) {
    return image;
  }
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: quality,
      convertSize: maxSize,
      success(result) {
        resolve(result);
      },
      error(e) {
        console.error("[ERROR-Compressor]", e.message);
        reject(e);
      }
    });
  });
}

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

export function fetchKey(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function fetchDesc(value) {
  const matches = [];
  value.replace(/<p>(.*?)<\/p>/g, function() {
    matches.push(arguments[1]);
  });
  if (matches[0]) {
    return matches[0];
  } else {
    return "";
  }
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
