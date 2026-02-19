import React from "react";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import UserAddressCard from "./UserAddressCard";

const Addresses = () => {
  const { user } = useAppSelector((store) => store);

  const addresses = user.user?.addresses || [];
return (
  <div className="w-full">

    {/* Section Header */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white rounded-3xl shadow-lg p-8 mb-10">

      <h2 className="text-2xl font-bold tracking-wide">
        Saved Addresses
      </h2>
      <p className="text-indigo-100 mt-2 text-sm">
        Manage your delivery locations
      </p>
    </div>

    {/* Address Grid */}
    {addresses.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg p-6 
                       hover:shadow-2xl transition-all duration-300"
          >
            <UserAddressCard item={item} />
          </div>
        ))}
      </div>
    ) : (
      /* Empty State */
      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                        bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 text-xl font-bold">
            📍
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          No Addresses Found
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          You have not added any delivery address yet.
        </p>
      </div>
    )}

  </div>
);

};

export default Addresses;
