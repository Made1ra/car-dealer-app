"use client";

import { useParams } from "next/navigation";
import { getModelsForMakeIdYear } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { Model } from "@/app/lib//definitions";

export default function Result() {
  const { makeId, year } = useParams();
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      if (typeof makeId === "string" && typeof year === "string") {
        const fetchedModels = await getModelsForMakeIdYear(+makeId, +year);
        setModels(fetchedModels);
      }

      setIsLoading(false);
    };

    fetchModels();
  }, [makeId, year]);

  return (
    <div className="mx-auto flex min-h-screen w-72 flex-col items-center p-8 pb-20 sm:w-96 sm:p-12">
      <h1 className="mb-8 text-xl font-bold">Searched cars:</h1>
      {isLoading ? (
        <p className="text-lg font-semibold">Loading...</p>
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
  );
}
