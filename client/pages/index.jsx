import CurrentUser from "../components/CurrentUser";
import { fetchCurrentUser } from "../actions/get-current-user";

function Index({ currentUser }) {
  return (
    <div>
      <CurrentUser initialUser={currentUser || ""} />
    </div>
  );
}

// getServerSideProps MUST be exported from the page file itself
export async function getServerSideProps(context) {
  const currentUser = await fetchCurrentUser(context);

  return {
    props: {
      currentUser,
    },
  };
}

export default Index;
