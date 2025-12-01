import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(null);

      const response = await fn();

      setData(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, refetch: fetchData };
};

export { useFetch };
