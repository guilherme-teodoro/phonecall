import React from "react";

export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      {children}
    </form>
  );
};

export const Input = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      className="p-3 border h-12 bg-white border-gray-400 rounded shadow-sm appearance-none w-full"
      ref={ref}
    />
  );
});

export const Textarea = React.forwardRef((props, ref) => {
  return (
    <textarea
      {...props}
      className="p-3 border border-gray-400 rounded shadow-sm appearance-none w-full"
      ref={ref}
    />
  );
});

export const Label = ({ htmlFor, children }) => {
  return (
    <label
      className="font-bold uppercase text-gray-600 block text-sm mb-1"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export const Field = ({ children }) => {
  return <div>{children}</div>;
};

export const ErrorMsg = ({ children }) => {
  return <span className="text-red-500">{children}</span>;
};
