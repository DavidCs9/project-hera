import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";

function App() {
  const { data, isLoading, isError } = useQuery(
    trpc.general.hello.queryOptions("Alecita")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <div>{data}</div>;
}

export default App;
