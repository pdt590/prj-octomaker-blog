import Compressor from "compressorjs";
import marked from "marked";
import * as tocbot from "tocbot";

export function reloadAll() {
  localStorage.setItem("reloading", "");
  localStorage.removeItem("reloading");
}

export function formatString(string, length) {
  let short = string.substr(0, length);
  if (/^\S/.test(string.substr(length))) {
    if (length < string.length) {
      return short.replace(/\s+\S*$/, "") + " ...";
    } else {
      return short.replace(/\s+\S*$/, "");
    }
  }
  return length < string.length ? short + " ..." : short;
}

export function initToC() {
  tocbot.init({
    // Where to render the table of contents.
    tocSelector: ".toc",
    // Where to grab the headings to build the table of contents.
    contentSelector: ".toc-content",
    // Which headings to grab inside of the contentSelector element.
    headingSelector: "h1, h2",
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,
    // How many heading levels should not be collapsed.
    collapseDepth: 2,
    // Optional callback to change heading labels. 
    headingLabelCallback: (string) => {
      return formatString(string, 50);
    }
  });
}

export function initFbComment() {
  window.fbAsyncInit = function() {
    FB.init({
      appId: "192142251994813",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v3.1"
    });
  };

  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  setTimeout(() => {
    FB.XFBML.parse();
  }, 1000);
}

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
  let quality = 0.6;
  if (isGif(image)) {
    return image;
  }
  if (image.size < maxSize) {
    quality = 0.8;
  }
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: quality,
      convertSize: maxSize,
      minWidth: 1200,
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

export function fetchEmbedId(value) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = value.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function fetchUrl(value) {
  const regExp = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
  const match = value.match(regExp);
  return match;
}

export function renderer() {
  const renderer = new marked.Renderer();
  renderer.paragraph = text => {
    if (text.includes("@embed")) {
      return `<figure class="image is-16by9">
      <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/${fetchEmbedId(
        fetchUrl(text)[2]
      )}" frameborder="0" allowfullscreen></iframe>
      </figure>`;
    }
    return `<p>${text}</p>`;
  };
  return renderer;
}

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
  // remove all special characters except spaces
  title = title.replace(
    /[^a-z0-9A-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/g,
    ""
  );

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
