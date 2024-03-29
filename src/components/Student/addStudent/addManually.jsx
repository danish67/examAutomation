import { useState, useEffect } from "react";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function AddManually() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [student_type, setStudent_type] = useState("");
  const [batch, setBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [deptID, setDeptID] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [department]);

  const validateForm = () => {
    let errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@aiktc\.ac\.in/.test(email)) {
      errors.email = "Email must be in the format example@aiktc.ac.in";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!student_type) {
      errors.student_type = "Student type is required";
    }
    if (!department) {
      errors.department = "Department is required";
    }
    if (!batch) {
      errors.batch = "Batch is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getValueFromLabel = async (label) => {
    try {
      const dept = departments.find((dept) => dept.label === label);
      // console.log("dept");
      // console.log(dept.value);

      // Simulate an asynchronous operation (e.g., API call)
      setDeptID(dept.value);
      await someAsyncOperation();

      // Update the state (setDeptID) with the obtained value

      console.log("selected deptID yeh hai");
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
      }, 500); // Simulating a 1-second delay
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/addStudentManually/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            category: category,
            gender: gender,
            student_type: student_type,
            batch: batch,
          }),
        }
      );

      if (response.ok) {
        console.log("Student added successfully");

        alert("Student added successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setCategory("");
        setGender("");
        setDepartment("");
        setBatch("");
        setStudent_type("");
      } else {
        const data = await response.json();
        console.error("Failed to add section:", data.Error);

        alert(`Failed to add section: ${data.Error}`);
      }
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred while processing your request.");
    }
  };

  const handleChange = (field) => {
    setErrors({
      ...errors,
      [field]: "", // Clear the error message for the specified field
    });
  };

  const clearAll = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCategory("");
    setGender("");
    setDepartment("");
    setBatch("");
    setStudent_type("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5 ml-10   space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
            Student Information
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    handleChange("firstName");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleChange("lastName");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleChange("email");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handleChange("category");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Category</option>
                  <option value="OPEN">OPEN</option>
                  <option value="EBC">EBC</option>
                  <option value="OBC">OBC</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    handleChange("gender");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student Type
              </label>
              <div className="mt-2">
                <select
                  id="student_type"
                  name="student_type"
                  value={student_type}
                  onChange={(e) => {
                    setStudent_type(e.target.value);
                    handleChange("student_type");
                  }}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Student Type</option>
                  <option value="E">E</option>
                  <option value="D">D</option>
                </select>
                {errors.student_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.student_type}
                  </p>
                )}
              </div>
            </div>
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
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                htmlFor="department"
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
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  disabled={!department}
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

export default AddManually;
