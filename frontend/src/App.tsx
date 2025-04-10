import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";

function App() {
  const query = useQuery(trpc.general.hello.queryOptions("Alecita"));

  return <div>{query.data}</div>;
}

export default App;
