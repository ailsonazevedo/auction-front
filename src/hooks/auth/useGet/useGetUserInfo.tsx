import { IProfile } from "@/@types/user/IProfile";
import { USER_LOCAL_STORAGE } from "@/constants/localStorage";
import secureLocalStorage from "react-secure-storage";

const useGetUserInfo = () => {
  const userData = () => {
    return secureLocalStorage.getItem(USER_LOCAL_STORAGE) as IProfile;
  };
  return { userData };
};

export { useGetUserInfo };
