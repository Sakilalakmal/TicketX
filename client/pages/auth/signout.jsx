import { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";

function Signout() {
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  const handleSignout = async () => {
    await doRequest();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="text-center">
        <h3 className="mb-4">Are you sure you want to sign out?</h3>
        {errors}
        <button className="btn btn-primary btn-lg" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Signout;
