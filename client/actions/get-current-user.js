import axios from "axios";

<<<<<<< HEAD
//* Helper function to fetch current user from the auth service
//* Must be called from within getServerSideProps
=======
// Helper function to fetch current user from the auth service
// Must be called from within getServerSideProps
>>>>>>> 53ac270b93fd98510d6795522ed56f6e1f8f27bc
export async function fetchCurrentUser(context) {
  // Inside Kubernetes, we need to call the ingress-nginx service directly
  // because 'ticketing.dev' resolves to localhost inside the container
  try {
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
          // Forward cookies from the incoming request
          ...(context.req.headers.cookie && {
            Cookie: context.req.headers.cookie,
          }),
        },
      }
    );

    return response.data.currentUser || null;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}
