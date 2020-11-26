import { useCallback, useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const fetchFn = useCallback(() => {
    setLoading(true);
    fetch(url).then(response => {
      response
        .json()
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    });
  }, [url])

  useEffect(() => {
    fetchFn();
  }, [fetchFn]);
  return { data, error, loading};
};

export default useFetch;
