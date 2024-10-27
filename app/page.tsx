"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getMakesForVehicleType } from "@/app/lib/actions";
import { Make } from "@/app/lib/definitions";
import ArrowRight from "@/app/components/arrow-right";
import Link from "next/link";
import { getYears } from "@/app/lib/utils";
import Button from "@/app/components/button";
import Select from "@/app/components/select";
import Label from "./components/label";

const years = getYears();

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [makeId, setMakeId] = useState<number | null>(null);
  const [year, setYear] = useState(years[0]);

  const doesResultExists = makeId && year ? true : false;

  const handleChangeMake = (event: ChangeEvent<HTMLSelectElement>) => {
    setMakeId(+event.target.value);
  };

  const handleChangeYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(+event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchMakes = async () => {
      const fetchedMakes = await getMakesForVehicleType();
      setMakes(fetchedMakes);
    };

    fetchMakes();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-72 flex-col items-center p-8 pb-20 sm:w-96 sm:p-12">
      <h1 className="m-2 text-xl font-bold">Car Dealer App</h1>
      <h2 className="m-2 text-lg font-semibold">Find your car 🏎️</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-8 flex flex-col">
          <Label htmlFor="make-select" className="text-gray-500">
            Select a car model:
          </Label>
          <Select
            id="make-select"
            value={makeId ? makeId : ""}
            onChange={handleChangeMake}
            className="w-72 sm:w-96"
          >
            <option value="" disabled>
              Car model
            </option>
            {makes.length > 0 &&
              makes.map(({ makeId, makeName }: Make) => (
                <option key={makeId} value={makeId}>
                  {makeName}
                </option>
              ))}
          </Select>
        </div>
        <div className="m-8 flex flex-col">
          <Label htmlFor="year-select" className="text-gray-500">
            Select a year:
          </Label>
          <Select
            id="year-select"
            value={year}
            onChange={handleChangeYear}
            className="w-72 sm:w-96"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex justify-center">
          <Link
            href={doesResultExists ? `/result/${makeId}/${year}` : "#"}
            className={
              doesResultExists
                ? "inline-block cursor-pointer"
                : "inline-block cursor-not-allowed"
            }
          >
            <Button disabled={!doesResultExists}>
              Next
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
