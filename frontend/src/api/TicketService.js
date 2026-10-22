import axios from "axios";
import { toast } from "react-toastify";

const api = "https://localhost:7295/api/ticket/";
const defaultHeaders = {
  headers: {
    "X-User": "cata.navarrete.95@gmail.com",
  },
};

export const ticketPostApi = async (payload) => {
  try {
    const data = await axios.post(api, payload, defaultHeaders);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Error while creating ticket")
  }
};

export const ticketGetApi = async (query) => {
  const { search, page, pageSize, status, priority, sortBy, desc } = query;
  try {
    const data = await axios.get(
      api,
      {
        params: {
          search,
          page,
          pageSize,
          status,
          priority,
          sortBy,
          desc
        },
      },
      defaultHeaders,
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Error while fetching tickets")
  }
};

export const ticketPutApi = async (id, payload) => {
  try {
    const data = await axios.put(
      `${api}${id}`,
      payload,
      defaultHeaders,
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Error while updating ticket")
  }
};

export const ticketPatchApi = async (id, payload) => {
  try {
    const data = await axios.patch(
      `${api}${id}/status`,
      payload,
      defaultHeaders,
    );
    return data;
  } catch (error) {
    toast.error("Error while updating ticket status")
  }
};
