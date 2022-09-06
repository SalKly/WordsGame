import { useEffect, useState } from "react";
import axios from "axios";

//Here we simply make the fetching either geting or posting in one place using axios in order to keep the app dry

function useFetch(url, postData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (postData) {
      setLoading(true);
      axios
        .post(url, {
          score: postData,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {

          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    else {
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

  }, [url, postData]);

  // const refetch = () => {
  //   setLoading(true);
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return { data, loading, error };
}

export default useFetch;