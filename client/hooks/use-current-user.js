import { useEffect, useState } from "react";
import useRequest from "./use-request";

/**
 * Custom hook to get the current user
 * @param {Object} initialUser - Optional initial user data (from SSR)
 * @returns {Object} - { currentUser, loading, errors, refetch }
 */
export default function useCurrentUser(initialUser = null) {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  const { doRequest, errors } = useRequest({
    url: "/api/users/currentuser",
    method: "get",
    body: {},
    onSuccess: (data) => {
      setCurrentUser(data.currentUser);
      setLoading(false);
    },
  });

  useEffect(() => {
    // Only fetch if no initial user was provided
    if (!initialUser) {
      doRequest();
    }
  }, []);

  const refetch = async () => {
    setLoading(true);
    await doRequest();
  };

  return { currentUser, loading, errors, refetch };
}
