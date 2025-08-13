import { Suspense } from "react";
import MessagesPage from "./messages";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesPage />
    </Suspense>
  );
}

