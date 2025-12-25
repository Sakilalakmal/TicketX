"use client";

import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";

function CurrentUser({ initialUser }) {
  const [user, setUser] = useState(initialUser);

  const { doRequest, errors } = useRequest({
    url: "/api/users/currentuser",
    method: "get",
    body: {},
    onSuccess: (data) => setUser(data.currentUser),
  });
  return <div>{user ? `Signed in as ${user.email}` : "Not signed in"}</div>;
}

export default CurrentUser;
