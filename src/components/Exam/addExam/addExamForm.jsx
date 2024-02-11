import { useState } from "react";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function AddExamForm() {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [scheme, setScheme] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        {/* Existing form content */}
        {/* You can integrate the new fields here */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Batch Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="scheme" className="block text-sm font-medium leading-6 text-gray-900">
                Department Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="scheme"
                  name="scheme"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                Section
              </label>
              <div className="mt-2">
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="engineering">Engineering</option>
                  <option value="science">Pharmacy</option>
                  <option value="arts">Architecure</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExamForm;
