import "bootstrap/dist/css/bootstrap.css";
import HeaderComponents from "../components/HeaderComponents";

export default ({ Component, pageProps }) => {
  return (
    <>
      <HeaderComponents />
      <Component {...pageProps} />
    </>
  );
};
