import { forwardRef } from "react";

interface WordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const WordInput = forwardRef(function WordInput(
  { label, name, ...rest }: WordInputProps,
  ref
) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type="text"
        placeholder="What do you think..."
        name={name}
        {...rest}
        ref={ref}
      />
    </div>
  );
});

export { WordInput };
