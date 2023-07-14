import logo from "../assets/logoOfLyL.svg";

export const defaultImg = logo;

type User = {
  id: string;
  username: string;
  role: string;
};

/**
 * 服务器地址
 */
export const imageServerUrl = "http://localhost:8000/";
export const serverUrl = "http://localhost:8001/";

/**
 * lottie文件传输地址
 */
export const lottieUrl = "https://roll0814.cn/ftp-lottie/lyl/";

/**
 * 文件上传接口
 */
export const uploadActionUrl = serverUrl + "person/upload";

/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = async(token: string) =>
  sessionStorage.setItem("token", token);

export const setUser = async(user: User) => {
  sessionStorage.setItem("id", user.id);
  sessionStorage.setItem("username", user.username);
  sessionStorage.setItem("role", user.role);
};

/**
 * 退出登录
 */
export const logout = async() => {
  sessionStorage.clear(); // 清空保存的Token和用户信息
};


/**
 * 获取token
 * @returns
 */
export const getToken = async() => sessionStorage.getItem("token");

export const getUser = async() => {
  const user = {
    id: sessionStorage.getItem("id"),
    username: sessionStorage.getItem("username"),
    role: sessionStorage.getItem("role"),
  };
  return user;
};

/**
 * 图片处理
 * @param img
 * @returns
 */
export const dalImg = (img: string) => {
  if (img) {
    if (img.startsWith("http")) return img;
    return serverUrl + img;
  }
  return defaultImg;
};
