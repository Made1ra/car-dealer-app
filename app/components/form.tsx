"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent, FormHTMLAttributes } from "react";

import { getYears } from "@/app/lib/utils";
import Label from "@/app/components/label";
import Select from "@/app/components/select";
import Button from "@/app/components/button";
import ArrowRight from "@/app/components/arrow-right";

const years = getYears();

function Form({
  className,
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
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

  return (
    <form onSubmit={handleSubmit} className={className} {...props}>
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
          {children}
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
  );
}

export default Form;
