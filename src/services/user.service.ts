import { post } from "../utils/request";
import { setToken, setUser } from "../utils/tools";

type LoginData = {
  username: string;
  password: string;
};

/**
 * 登录接口
 * @param data
 * @returns
 */
export const loginAPI = async (data: LoginData) => {
  try {
    const response = await post("/user/login", data);

    if (response.code === 0) {
      setToken(response.result.token); // 将Token保存到sessionStorage中
      setUser({
        id: response.result.id,
        username: response.result.username,
        role: response.result.role,
      });
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 登录接口
 * @param data
 * @returns
 */
export const registerAPI = async (data: any) => post("/user/register", data);
