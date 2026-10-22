import axios from "axios";
import { toast } from "react-toastify";

const api = "https://localhost:7295/api/comment/";
const defaultHeaders = {
  headers: {
    "X-User": "cata.navarrete.95@gmail.com",
  },
};

export const commentGetByTicketIdApi = async (id) => {
  try {
    const data = await axios.get(`${api}ticket/${id}`, {}, defaultHeaders);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Error while fetching comments by ticket id")
  }
};

export const commentPostApi = async (id, payload) => {
  try {
    const data = await axios.post(`${api}ticket/${id}`, payload,
      defaultHeaders,
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Error while creating comment")
  }
};
