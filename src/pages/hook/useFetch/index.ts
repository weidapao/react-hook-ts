import { useEffect, useMemo, useState } from 'react';

const useFetch = <T>(initialUrl: string, initialParams: { [key: string]: any }={}) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [params, setParams] = useState(initialParams)
  const [url, setUrl] = useState(initialUrl)
  const [count, setCount] = useState(0);
  const reFetch = () => {
    setCount(count => count + 1);
  };
  const queryString = Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
  useEffect(() => {
    const fetchFn = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${queryString}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchFn();
  }, [url, params, count]);
  return [data, error, loading, reFetch,setUrl,setParams] as const;
};

export default useFetch;
