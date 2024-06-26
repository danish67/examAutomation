import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCurriculum() {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [scheme, setScheme] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [deptID, setDeptID] = useState();
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    handleDepartmentChange(department);
    console.log("abe 2nd me haiu");
  }, [startYear]);
  // useEffect(() => {
  //   getValueFromLabel();
  // }, [department]);
  const getValueFromLabel = async (label) => {
    try {
      const dept = departments.find((dept) => dept.label === label);
      console.log("dept");
      console.log(dept.value);

      // Simulate an asynchronous operation (e.g., API call)
      // await someAsyncOperation();

      // Update the state (setDeptID) with the obtained value
      setDeptID(dept.value);

      console.log("selected deptID");
      console.log(deptID);

      return dept.value;
    } catch (error) {
      console.error("Error:", error);
      // Handle errors if necessary
    }
  };

  const someAsyncOperation = () => {
    // Simulate an asynchronous operation, for example, an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Async operation completed");
        resolve();
      }, 1000); // Simulating a 1-second delay
    });
  };

  const fetchDepartments = async () => {
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/ViewDepartment/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.result);
        console.log("Yaha aarha");
        console.log(departments);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleDepartmentChange = (selectedSection) => {
  //   const associatedDepartment = departments.find(dept => dept.section === selectedSection);
  //   setDepartment(associatedDepartment.name);

  //   let endYearValue = startYear ? new Date(startYear) : null;
  //   if (selectedSection === "School of Pharmacy" || selectedSection === "School of Architecture") {
  //     endYearValue.setFullYear(endYearValue.getFullYear() + 5);
  //   } else if (selectedSection === "School of Engineering") {
  //     endYearValue = new Date(endYearValue.getFullYear() + 4, endYearValue.getMonth(), endYearValue.getDate());
  //   }
  //   setEndYear(endYearValue);
  // };

  const handleDepartmentChange = (selectedSection) => {
    console.log("Selected Section:", selectedSection);

    if (selectedSection && selectedSection !== department) {
      console.log("selectedSection:", selectedSection);

      // Update the state only if the selectedSection is different from the current department
      setDepartment(selectedSection);
      console.log(department);
      // Calculate and set end year based on start year and department
    }
    if (startYear) {
      let endYearValue = new Date(startYear);
      if (selectedSection === "Architecture") {
        endYearValue.setFullYear(endYearValue.getFullYear() + 5);
      } else {
        endYearValue.setFullYear(endYearValue.getFullYear() + 4);
      }
      console.log(endYearValue);
      setEndYear(endYearValue);
      console.log("endYear");
      console.log(endYear);
    }
  };
  const validateForm = () => {
    let errors = {};
    if (!department) {
      errors.department = "Department is required";
    }
    if (!startYear) {
      errors.startYear = "Start Year is required";
    }
    if (!endYear) {
      errors.endYear = "End Year is required";
    }
    if (!scheme) {
      errors.scheme = "Scheme is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (field) => {
    setErrors({
      ...errors,
      [field]: "", // Clear the error message for the specified field
    });
  };
  const handleSubmit = async (event) => {
    // setDepartment(associatedDepartment.value);

    event.preventDefault();

    // await getValueFromLabel(department);
    if (!validateForm()) {
      return;
    }
    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const updatedDeptID = await getValueFromLabel(department);
      console.log("updatedDeptID" + updatedDeptID);
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/BatchAdding/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            department: updatedDeptID,
            start_year: startYear.getFullYear(),
            end_year: endYear.getFullYear(),
            scheme: scheme,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data); // Display success message
        // Clear input fields after successful submission
        setStartYear("");
        setEndYear("");
        setDepartment("");
        setScheme("");
      } else {
        const data = await response.json();
        console.error("Failed to add batch:", data.error);
        alert(`Failed to add batch: ${data.error}`); // Display error message
        // alert("nahi ho rha"); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const clearAll = () => {
    setStartYear("");
    setEndYear("");
    setDepartment("");
    setScheme("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
      <div className="mt-10 ml-10 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
            Curriculum Information
          </h2>
          <div className="mt-10 sm:col-span-3">
            <label
              htmlFor="scheme"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Scheme Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="scheme"
                name="scheme"
                value={scheme}
                onChange={(e) => {
                  setScheme(e.target.value);
                  handleChange("scheme");
                }}
                className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.scheme && "border-red-500"
                }`}
              />
              {errors.scheme && (
                <p className="text-red-500 text-sm mt-1">{errors.scheme}</p>
              )}
            </div>
          </div>
          <div className="mt-10 sm:col-span-3">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Is Revised
              </legend>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="yes"
                    name="isRevised"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="yes"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="no"
                    name="isRevised"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="no"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="mt-10 sm:col-span-3">
            <label
              htmlFor="department"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Department
            </label>
            <div className="mt-2">
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  handleChange("department");
                }}
                className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                  errors.department && "border-red-500"
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.value} value={department.label}>
                    {department.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
          </div>
          <div className="mt-10 col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add Subjects 
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 pt-6 pb-10">
              <div className="text-center">
                {/* <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                /> */}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
              
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
            Clear All
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

export default AddCurriculum;
