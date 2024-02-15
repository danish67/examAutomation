import { useState } from "react";

function AddSectionForm() {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = 'Token 4db920ca6c10ea25038961bf398fed4bd620316f56d7624339fbb1fee7d59175'; 
      const response = await fetch("http://127.0.0.1:8000/clgadmin/add_section/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          section_name: sectionName,
        }),
      });
  
      if (response.ok) {

        console.log("Section added successfully");

        alert("Section added successfully!");
      } else {

        const data = await response.json();
        console.error("helloo Failed to add section:", data.Error);
   
        alert(`Failed to add section: ${data.Error}`);
      }
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred while processing your request.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 ml-10 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">Section Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="sectionName" className="block text-sm font-medium leading-6 text-gray-900">
                Section Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="sectionName"
                  name="sectionName"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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

export default AddSectionForm;
