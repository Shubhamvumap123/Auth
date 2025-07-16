import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function UserDetails() {
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...user!
  });
  const [error, setError] = useState("");

 const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:3000/api/me",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.user) {
      updateUser(res.data.user);
      setEditing(false);
      setError("");
    } else {
      setError("Failed to update user. Please try again.");
    }
  } catch (err) {
    console.error("Update error:", err);
    setError("An error occurred. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
          />
          {editing ? (
            <>
              <input
                className="text-lg font-semibold text-center border px-2 py-1 rounded mb-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="text-sm text-gray-600 text-center border px-2 py-1 rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
            </>
          )}
        </div>


        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex justify-between items-center pt-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    ...user!,
                    phone: "123-456-7890",
                    address: "123 Main St, City, Country",
                  });
                  setError("");
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
