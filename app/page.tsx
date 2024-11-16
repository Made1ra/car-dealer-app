import { Suspense } from "react";

import Form from "@/app/components/form";
import Makes from "@/app/components/makes";

function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-72 flex-col items-center p-8 pb-20 sm:w-96 sm:p-12">
      <h1 className="m-2 text-xl font-bold">Car Dealer App</h1>
      <h2 className="m-2 text-lg font-semibold">Find your car 🏎️</h2>
      <Form>
        <Suspense fallback={null}>
          <Makes />
        </Suspense>
      </Form>
    </div>
  );
}

export default Home;
