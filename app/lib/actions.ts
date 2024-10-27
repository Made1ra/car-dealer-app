const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export async function getMakesForVehicleType() {
  const response = await fetch(
    `${BASE_URL}/GetMakesForVehicleType/car?format=json`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.Results.map(
    ({ MakeId, MakeName }: { MakeId: number; MakeName: string }) => ({
      makeId: MakeId,
      makeName: MakeName,
    }),
  );
}

export async function getModelsForMakeIdYear(makeId: number, year: number) {
  const response = await fetch(
    `${BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.Results.map(
    ({
      Model_ID,
      Make_Name,
      Model_Name,
    }: {
      Model_ID: number;
      Make_Name: string;
      Model_Name: string;
    }) => ({
      modelId: Model_ID,
      makeName: Make_Name,
      modelName: Model_Name,
    }),
  );
}
