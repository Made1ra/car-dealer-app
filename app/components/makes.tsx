import { Make } from "@/app/lib/definitions";
import { getMakesForVehicleType } from "@/app/lib/actions";

export default async function Makes() {
  const makes: Make[] = await getMakesForVehicleType();

  return (
    <>
      {makes.length > 0 &&
        makes.map(({ makeId, makeName }) => (
          <option key={makeId} value={makeId}>
            {makeName}
          </option>
        ))}
    </>
  );
}
