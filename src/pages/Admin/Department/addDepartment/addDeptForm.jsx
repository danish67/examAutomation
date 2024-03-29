import { useState, useEffect } from "react";

function AddDepartmentForm() {
  const [section, setSection] = useState("");
  const [deptname, setDeptname] = useState("");
  const [sections, setSections] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const token =
      `Token ${localStorage.getItem('token')}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/ViewSection/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSections(data.result);
      } else {
        console.error("Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
      const validateForm = () => {
        let errors = {};
        if (!deptname) {
          errors.deptname = "Department name is required";
        }
        if (!section) {
          errors.section = "Section is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
     if (!validateForm()) {
       return;
     }
    try {
      const token =
      `Token ${localStorage.getItem('token')}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/departmentAdding/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name: deptname,
            section: section,
          }),
        }
      );

      if (response.ok) {
        console.log("Department added successfully");

        alert("Department added successfully!");
        setDeptname("");
        setSection("");
      } else {
        const data = await response.json();
        console.error("Failed to add Department:", data.Error);

        alert(`Failed to add Department: ${data.Error}`);
      }
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred while processing your request.");
    }
  };


  const clearAll = () => {
    setDeptname("");
    setSection("");
    setErrors({});
  };

   const handleChange = (field) => {
     setErrors({
       ...errors,
       [field]: "", // Clear the error message for the specified field
     });
   };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
      <div className="mt-5 ml-5 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
            Department Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="deptname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Department Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="deptname"
                  name="deptname"
                  value={deptname}
                  onChange={(e) => {setDeptname(e.target.value);
                    handleChange("deptname");
                  }}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.deptname && "border-red-500"
                  }`}
                />
                {errors.deptname && (
                  <p className="text-red-500 text-sm mt-1">{errors.deptname}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="section"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Section
              </label>
              <div className="mt-2">
                <select
                  id="section"
                  name="section"
                  value={section}
                  onChange={(e) => {setSection(e.target.value);
                  handleChange("section");}}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    errors.section && "border-red-500"
                  }`}
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section.value} value={section.value}>
                      {section.label}
                    </option>
                  ))}
                </select>
                {errors.section && (
                  <p className="text-red-500 text-sm mt-1">{errors.section}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={clearAll}
          >
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
}

export default AddDepartmentForm;
