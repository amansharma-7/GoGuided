import { useState } from "react";

const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({ identifier, data, params, query }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFunc({ identifier, data, params, query });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      throw err;
    }
  };

  return { request, loading, error };
};

export default useApi;
