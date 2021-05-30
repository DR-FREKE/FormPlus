import AppRoute from "./routes/app.route";
import "./styles/global.css";
import Layout from "./components/Layout";

const App = () => (
  <>
    <Layout>
      <AppRoute />
    </Layout>
  </>
);

export default App;
