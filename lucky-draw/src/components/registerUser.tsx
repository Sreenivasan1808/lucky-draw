// src/RegistrationForm.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHandPointDown } from "react-icons/fa";
import Modal from "./modal";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [entries, setEntries] = useState([]);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validatePhone = (phone) => phone.length === 10;

  const checkPhoneExists = async (phone) => {
    try {
      const response = await axios.get("http://localhost:5000/api/entries");
      const phoneExists = response.data.some((entry) => entry.phone === phone);
      setIsPhoneValid(!phoneExists);
      setIsPhoneChecked(true);
    } catch (error) {
      console.error("Error checking phone number:", error);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    setIsPhoneChecked(false); // Reset phone checked status
    if (validatePhone(phoneValue)) {
      checkPhoneExists(phoneValue);
    } else {
      setIsPhoneValid(true); // Allow submission if phone is invalid (for easier testing)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!isPhoneValid) {
      alert("Phone number already given.");
      return;
    }

    try {
      // Skip database insertion if name is 'admin' and phone is '1234567890'
    //   if (name === "admin" && phone === "1234567890") {
    //     localStorage.setItem("adminLoggedIn", "true");
    //     navigate("/admin-dashboard");
    //     return;
    //   }

      // Post entry to the database
      await axios.post("http://localhost:5000/api/entries", { name, phone });
      setEntries([...entries, { name, phone }]);

      // Reset form fields
      setName("");
      setPhone("");
      setIsPhoneChecked(false); // Reset phone checked status after successful submission
      setShowModal(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding entry.");
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="flex relative min-h-screen bg-red-400 bg-opacity-50 w-full">     
      <div className=" w-[60%] ml-[13%] items-center">
        {/* Form and Entries Display */}
        <div className="relative z-10 w-full flex flex-col p-6 h-full justify-center">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-700 w-[55%]">
            Lucky Draw Registration
          </h1>
          <form onSubmit={handleSubmit} className="mb-4 w-[55%]">
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="phone"
            >
              Mobile Number:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className={`block w-full border border-gray-300 p-2 rounded mb-4 ${
                !isPhoneValid && isPhoneChecked ? "border-red-500" : ""
              }`}
              required
              maxLength="10"
            />
            <button
              type="submit"
              className={`w-full bg-pink-400 text-white py-2 rounded ${
                !validatePhone(phone) || !isPhoneValid
                  ? "cursor-not-allowed opacity-50"
                  : "bg-pink-600"
              }`}
              disabled={!validatePhone(phone) || !isPhoneValid}
            >
              Submit
            </button>
            <a href="/admin-login" className="text-center text-gray-600 flex justify-center">Are you the admin? Click here</a>
             
          </form>

          {/* <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Registered Entries</h2>
                    <ul>
                    {entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <li key={index} className="border-b border-gray-200 py-2">
                            <span className="font-medium">{entry.name}</span> - <span>{entry.phone}</span>
                            </li>
                            ))
                            ) : (
                                <p>No entries found.</p>
                                )}
                                </ul>
                            </div> */}
        </div>
      </div>
      {/* Right side */}
      <div className="min-h-screen rounded-2xl bg-[#EAFDF8] w-[40%] absolute z-10 right-1 flex flex-col justify-center items-center p-4">
        <h1 className=" md:text-6xl text-pink-600 poppins-extrabold text-center m-2 sm:text-lg">
          Will you be the lucky winner?
        </h1>
        <h2 className="md:text-2xl text-pink-400 text-center poppins-semibold m-2 p-2 flex items-center gap-3 sm:text-base">
          
          <span className="rotate-90">
            <FaHandPointDown className="md:h-12 md:w-12 animate-bounce mx-2 sm:h-6 sm:w-6" />
          </span>
          Register Now
        </h2>
      </div>
      {showModal && <Modal className="z-20 " setShowModal={setShowModal} />} 
    </div>
  );
};

export default RegistrationForm;
