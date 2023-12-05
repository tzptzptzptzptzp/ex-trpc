import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { trpc } from "./utils/trpc";

const URL = "http://localhost:2222/:";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${URL}trpc`,
        }),
      ],
    })
  );
  return <div>TodoList</div>;
}

export default App;
