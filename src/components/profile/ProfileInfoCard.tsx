import React, { useState } from "react";

type Props = {
  info: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    location: string;
    address: string;
    phone: string;
    joined: string;
  };
  bgColor: string;
};

const ProfileInfoCard = ({ info, bgColor }: Props) => {
  // Lokale state om formulier te kunnen invullen
  const [formData, setFormData] = useState(info);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Basisvalidatie voorbeeld
    if (field === "email" && !value.includes("@")) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else if (value.trim() === "") {
      setErrors({ ...errors, [field]: "This field is required" });
    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const renderInput = (
    id: keyof typeof formData,
    label: string,
    type: string = "text"
  ) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={formData[id]}
        onChange={(e) => handleChange(id, e.target.value)}
        className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 text-white bg-white/10
          ${
            errors[id]
              ? "border-red-400 focus:ring-red-300"
              : "border-white/20 focus:ring-white/30"
          }`}
      />
      {errors[id] && (
        <span className="text-xs text-red-400 mt-1">{errors[id]}</span>
      )}
    </div>
  );

  return (
    <div
      className="rounded-xl shadow-md p-6 text-white h-full md:min-h-[340px] flex flex-col justify-start"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-lg font-semibold mb-6">Account Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {renderInput("fullName", "Full Name")}
        {renderInput("username", "Username")}
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        {renderInput("age", "Age", "number")}
        {renderInput("gender", "Gender")}
        {renderInput("location", "Location")}
        {renderInput("address", "Address")}
        {renderInput("phone", "Phone", "tel")}
        {renderInput("joined", "Joined")}
      </div>
    </div>
  );
};

export default ProfileInfoCard;
