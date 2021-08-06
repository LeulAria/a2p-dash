import { useCallback, useEffect, useState } from "react";

const useSearch = (data: any, searchKey = "") => {
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setLoading(false);
    const filteredData = data.filter((d: any) => {
      if (JSON.stringify(Object.values(d)).includes(searchKey.toLocaleLowerCase())) {
        return true;
      }
      return false;
    });
    setFiltered(filteredData);
    setLoading(true);
  }, [data]);

  const reFilter = useCallback(
    (searchKey) => {
      setLoading(false);
      const filteredData = data.filter((d: any) => {
        if (
          JSON.stringify(JSON.stringify(Object.values(d)).toLowerCase()).includes(
            searchKey.toLocaleLowerCase(),
          )
        ) {
          return true;
        }
        return false;
      });
      setFiltered(filteredData);
      setLoading(true);
    },
    [data],
  );

  return { filtered, loading, reFilter };
};

export default useSearch;
