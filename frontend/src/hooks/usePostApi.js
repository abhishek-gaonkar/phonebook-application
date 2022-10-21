import { useCallback, useEffect, useState } from "react";

function usePostApi(
  apiCallback,
  apiCallbackParams = [],
  apiTransformFn = undefined
) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [postData, setPostData] = useState(undefined);

  const triggerPostApi = useCallback((data) => setPostData(data), []);

  useEffect(() => {
    if (data) setError(undefined);
  }, [data]);

  useEffect(() => {
    if (error) setData(undefined);
  }, [error]);

  useEffect(() => {
    if (postData) {
      setLoading(true);

      apiCallback
        .apply(null, [postData, ...apiCallbackParams])
        .then((resData) => {
          setData(apiTransformFn?.(resData) || resData);
        })
        .catch((err) => {
          setError(err.response);
        })
        .finally(() => {
          setLoading(false);
          setPostData(undefined);
        });
    }
  }, [postData, apiCallback, apiCallbackParams, apiTransformFn]);

  return { data, loading, error, triggerPostApi };
}

export default usePostApi;
