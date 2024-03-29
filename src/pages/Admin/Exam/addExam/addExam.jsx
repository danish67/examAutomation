import { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function AddExam() {
  const [year, setYear] = useState("");
  const [batch, setBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [deptID, setDeptID] = useState();
  const [month, setMonth] = useState();
  const currentYear = new Date().getFullYear();
  const [typeOfExam, setTypeOfExam] = useState("");
  const [semester, setSemester] = useState();
  const[maxValue,setMaxValue] = useState();
  const [errors, setErrors] = useState({});



  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [department]);

  useEffect(() => {
    setMaxValuefunction();
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

  const setMaxValuefunction = () => {
    console.log("yeh department hai"+ department);
    try {
      if (department === "Architecture"){
        setMaxValue(10);
      }
      else{
        setMaxValue(8);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const someAsyncOperation = () => {
    // Simulate an asynchronous operation, for example, an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Async operation completed");
        resolve();
      }, 500); // Simulating a 1-second delay
    });
  };
  
  
  const fetchBatches = async () => {
    console.log(deptID);
    if (deptID !== null && deptID !== undefined){
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
          console.log(data.result)
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
  const handleSubmit = async (event) => {
    event.preventDefault();
      if (!validateForm()) {
        return;
      }

    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/add_exam/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            batch: batch,
            month: month,
            year: year.getFullYear(),
            typeofexam: typeOfExam,
            semester: semester,  
          }),
        }
      );

      if (response.ok) {
        console.log("Exam added successfully");

        alert("Exam added successfully!");
        setDepartment("");
        setBatch("");
        setMonth("");
        setYear("");
        setTypeOfExam("");
        setSemester("");
      } else {
        const data = await response.json();
        console.error("Failed to add Exam:", data.Error);

        alert(`Failed to add Exam: ${data.Error}`);
      }
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred while processing your request.");
    }
  };
   const validateForm = () => {
     let errors = {};
     if (!department) {
       errors.department = "Department is required";
     }
     if (!batch) {
       errors.batch = "Batch is required";
     }
     if (!month) {
       errors.month = "Month is required";
     }
     if (!year) {
       errors.year = "Year is required";
     }
     if (!typeOfExam) {
       errors.typeOfExam = "Type of Exam is required";
     }
     if (!semester) {
       errors.semester = "Semester is required";
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

  const clearAll = () => {
        setDepartment("");
        setBatch("");
        setMonth("");
        setYear("");
        setTypeOfExam("");
        setSemester("");
        setErrors({});
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 ml-10 space-y-12">
        {/* Existing form content */}
        {/* You can integrate the new fields here */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
            Exam Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
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

            <div className="sm:col-span-3">
              <label
                htmlFor="Month"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Month
              </label>
              <div className="mt-2">
                <select
                  id="month"
                  name="month"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    handleChange("month");
                  }}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    errors.month && "border-red-500"
                  }`}
                >
                  <option value="">Select Month</option>
                  <option value="May">May</option>
                  <option value="December">December</option>
                </select>
                {errors.month && (
                  <p className="text-red-500 text-sm mt-1">{errors.month}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
              <div className="mt-2">
                <DatePicker
                  selected={year}
                  onChange={(date) => {
                    setYear(date);
                    handleChange("year");
                  }}
                  showYearPicker
                  dateFormat="yyyy"
                  minDate={new Date(currentYear, 0)}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    errors.year && "border-red-500"
                  }`}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="typeOfExam"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type of Exam
              </label>
              <div className="mt-2">
                <select
                  id="typeOfExam"
                  name="typeOfExam"
                  value={typeOfExam}
                  onChange={(e) => {
                    setTypeOfExam(e.target.value);
                    handleChange("typeOfExam");
                  }}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    errors.typeOfExam && "border-red-500"
                  }`}
                >
                  <option value="">Select Type of Exam</option>
                  <option value="Regular">Regular</option>
                  <option value="Atkt">Atkt</option>
                </select>
                {errors.typeOfExam && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.typeOfExam}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="semester"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Semester
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  value={semester}
                  min={1}
                  max={maxValue}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    handleChange("semester");
                  }}
                  disabled={!department}
                  className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                    errors.semester && "border-red-500"
                  }`}
                />
                {errors.semester && (
                  <p className="text-red-500 text-sm mt-1">{errors.semester}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-semibold leading-6 text-gray-900"
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
};

export default AddExam;
