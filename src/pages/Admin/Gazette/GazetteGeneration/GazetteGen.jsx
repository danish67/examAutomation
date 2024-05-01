import React, { useState,useEffect } from "react";


function GazetteGen() {
      const [batch, setBatch] = useState("");
      const [batches, setBatches] = useState([]);
      const [department, setDepartment] = useState("");
      const [departments, setDepartments] = useState([]);
        const [errors, setErrors] = useState({});
        const [deptID, setDeptID] = useState();

  // Static data for demonstration

    useEffect(() => {
      fetchDepartments();
    }, []);

    useEffect(() => {
      fetchBatches();
    }, [department]);

  const getValueFromLabel = async (label) => {
    try {
      const dept = departments.find((dept) => dept.label === label);
      // console.log("dept");
      // console.log(dept.value);
      // Simulate an asynchronous operation (e.g., API call)
      setDeptID(dept.value);
      // await someAsyncOperation();

      setMaxValuefunction();
      // Update the state (setDeptID) with the obtained value

      console.log("selected deptID yeh hai");
      console.log(deptID);

      return dept.value;
    } catch (error) {
      console.error("Error:", error);
      // Handle errors if necessary
    }
  };
    const fetchBatches = async () => {
      console.log(deptID);
      if (deptID !== null && deptID !== undefined) {
        try {
          const token = `Token ${localStorage.getItem("token")}`;
          const response = await fetch(
            "http://127.0.0.1:8000/clgadmin/ViewBatches/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify({
                department: deptID,
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data.result);
            setBatches(data.result);
          } else {
            console.error("Failed to fetch Batches");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
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
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


  return (
    <div className="mt-10 ml-10 space-y-12">
      <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
        Generate Gazette
      </h2>
      <div className="sm:col-span-3">
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
              const selectedDepartment = e.target.value;
              console.log(selectedDepartment);
              setDepartment(selectedDepartment);
              getValueFromLabel(selectedDepartment);
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
      <div className="sm:col-span-3">
        <label
          htmlFor="Batch"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Batch
        </label>
        <div className="mt-2">
          <select
            id="batch"
            name="batch"
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value);
              handleChange("batch");
            }}
            disabled={!department}
            className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
              errors.batch && "border-red-500"
            }`}
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.value} value={batch.value}>
                {batch.label}
              </option>
            ))}
          </select>
          {errors.batch && (
            <p className="text-red-500 text-sm mt-1">{errors.batch}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Generate Gazette
        </button>
      </div>
    </div>
  );
}

export default GazetteGen;
