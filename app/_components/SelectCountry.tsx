import { getCountries } from '@/app/_lib/data-service';

type Props = {
  defaultCountry: string | null;
  name: string;
  id: string;
  className: string;
}

export default async function SelectCountry({ defaultCountry, name, id, className }: Props) {
  const countries = await getCountries();
  const defaultFlag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${defaultFlag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
