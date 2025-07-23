import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Profielkaart */}
      <div className="bg-white rounded-2xl shadow border p-6 flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full shadow mb-4"
        />
        <h2 className="text-lg font-semibold text-blue-600">Chet Faker</h2>
        <p className="text-gray-500 text-sm">@chetfaker</p>
        <p className="mt-2 text-center text-gray-600 text-sm">
          “I like the way you work it. No diggity. I wanna bag it up.”
        </p>

        <div className="flex justify-between mt-6 w-full text-center text-sm text-gray-500">
          <div className="flex-1">
            <p className="text-lg text-black font-semibold">12</p>
            Files
          </div>
          <div className="flex-1">
            <p className="text-lg text-black font-semibold">2GB</p>
            Used
          </div>
          <div className="flex-1">
            <p className="text-lg text-black font-semibold">24,6$</p>
            Spent
          </div>
        </div>

        <div className="mt-6 w-full">
          <h3 className="text-center font-semibold">Team Members</h3>
          <ul className="text-sm mt-2 text-gray-700 space-y-1">
            <li>DJ Khaled ✅</li>
            <li>Creative Tim ✅</li>
            <li>Flume ❌</li>
          </ul>
        </div>

        <div className="mt-6 w-full">
          <h3 className="text-center font-semibold">Mijn Leagues</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              Rocket League Division A{" "}
              <span className="text-xs bg-green-100 text-green-800 rounded px-2 py-0.5 ml-1">
                Active
              </span>
            </li>
            <li>
              Valorant Spring Cup{" "}
              <span className="text-xs bg-gray-200 text-gray-800 rounded px-2 py-0.5 ml-1">
                Finished
              </span>
            </li>
            <li>
              Apex Legends Tournament{" "}
              <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 ml-1">
                Ongoing
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Formulierkaart */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Username" className="input" />
            <input type="email" placeholder="Email address" className="input" />
            <input type="text" placeholder="First Name" className="input" />
            <input type="text" placeholder="Last Name" className="input" />
            <input type="text" placeholder="Address" className="input col-span-2" />
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="Country" className="input" />
            <input type="text" placeholder="Postal Code" className="input col-span-2" />
          </div>
          <textarea
            placeholder="About Me"
            rows={4}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <div className="text-right">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
