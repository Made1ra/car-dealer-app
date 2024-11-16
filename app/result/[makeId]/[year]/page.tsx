import { notFound } from "next/navigation";
import Link from "next/link";

import { Make, Model } from "@/app/lib//definitions";
import {
  getMakesForVehicleType,
  getModelsForMakeIdYear,
} from "@/app/lib/actions";
import { getYears } from "@/app/lib/utils";
import ArrowRight from "@/app/components/arrow-right";

export async function generateStaticParams() {
  try {
    const years = getYears();
    const makes: Make[] = await getMakesForVehicleType();
    if (!makes) {
      return [];
    }

    const makeIds = makes.map(({ makeId }) => {
      return {
        makeId: makeId.toString(),
      };
    });

    return years.flatMap((year) =>
      makeIds.map((makeId) => ({ ...makeId, year: year.toString() })),
    );
  } catch (error) {
    console.error(error);

    return [];
  }
}

export default async function Result({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params;
  if (!makeId || !year) {
    notFound();
  }

  const models: Model[] = await getModelsForMakeIdYear(+makeId, +year);

  return (
    <div>
      <Link
        href="/"
        className="mx-auto mt-8 flex w-fit justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 max-sm:px-2 max-sm:py-1"
      >
        <ArrowRight className="-rotate-180" />
        Go back
      </Link>
      <div className="mx-auto flex min-h-screen w-72 flex-col items-center p-8 pb-20 sm:w-96 sm:p-12">
        <h1 className="mb-8 text-xl font-bold">Searched cars:</h1>
        {models.length === 0 ? (
          <h2 className="text-lg font-semibold">No cars found 😥</h2>
        ) : (
          <ul>
            {models.map(({ modelId, modelName, makeName }) => (
              <li
                key={modelId}
                className="m-6 flex flex-col items-center justify-center"
              >
                <h2 className="text-lg font-semibold">{makeName} ✨</h2>
                <p>{modelName} 🏎️</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
