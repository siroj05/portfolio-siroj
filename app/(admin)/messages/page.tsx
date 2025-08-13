import { Suspense } from "react";
import MessagesPage from "./components/messages";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesPage />
    </Suspense>
  );
}

