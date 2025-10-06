import { patch } from "@/services/@shared/methods/patch";
import { Axios } from "axios";

import { del } from "./methods/del";
import { get } from "./methods/get";
import { post } from "./methods/post";
import { put } from "./methods/put";

export interface IApiMethods {
  create: (data: any, params?: string) => Promise<any>;
  deleteOne: (id: string, params?: string) => Promise<any>;
  getList: (params?: string) => Promise<any>;
  getOne: (id: string, params?: string) => Promise<any>;
  patch: (data: any, id: string, aditionalPath?: string) => Promise<any>;
  update: (data: Partial<any>, id: string) => Promise<any>;
  updatePut: (data: Partial<any>, id: string) => Promise<any>;
}

const apiMethods = (axios: Axios, path: string): IApiMethods => ({
  create: async (data: any, params?: string): Promise<any> => {
    if (params) {
      return await post(axios, path + `${params}`, data);
    } else {
      return await post(axios, path, data);
    }
  },
  deleteOne: async (id: string, params?: string) => {
    if (params) {
      return await del(axios, `${path}/${id}${params}`);
    } else {
      return await del(axios, `${path}/${id}`);
    }
  },
  getList: async (params?: string): Promise<any> => {
    if (params) {
      return await get(axios, `${path}${params}`);
    } else {
      return await get(axios, path);
    }
  },
  getOne: async (id: string, params?: string): Promise<any> => {
    if (params) {
      return await get(axios, `${path}/${id}${params}`);
    } else {
      return await get(axios, `${path}/${id}`);
    }
  },
  patch: async (data: Partial<any>, id: string, aditionalPath?: string) => {
    const secondPath = aditionalPath ? `/${aditionalPath}` : "";
    return await patch(axios, `${path}/${id}${secondPath}`, data);
  },
  update: async (data: Partial<any>, id: string) => {
    return await put(axios, `${path}/${id}`, data);
  },
  updatePut: async (data: Partial<any>, id: string) => {
    return await put(axios, `${path}/${id}`, data);
  },
});

export { apiMethods };
