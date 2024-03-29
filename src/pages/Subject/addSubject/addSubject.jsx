import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function AddSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [scheme, setScheme] = useState("");
  const [semester, setSemester] = useState();
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subjectDept, setSubjectDept] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setSubjectDept([]);
    setSelectedDepartments(selectedList);
    // console.log(selectedItem);
    // console.log(selectedList);

    // console.log("selectedDepartments" + selectedDepartments);
  };
  const onRemove = (selectedList, removedItem) => {
    setSubjectDept([]);
    setSelectedDepartments(selectedList);
    // console.log("removedItem" + removedItem);
    // console.log("selectedDepartments" + selectedDepartments);
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
  const setMaxValuefunction = () => {
    console.log("yeh department hai" + department);
    try {
      if (department === "Architecture") {
        setMaxValue(10);
      } else {
        setMaxValue(8);
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
    // console.log("SubjectName: " + subjectName);
    // console.log("SubjectCode: " + subjectCode);
    // console.log("Scheme: " + scheme);
    // console.log("semester: " + semester);
    // console.log("department: " + department);
    selectedDepartments.forEach((item) => {
      subjectDept.push(item.value);
      // console.log(item.value);
    });
    setLoading(true);

    console.log(subjectDept);
    console.log(typeof subjectDept);

    try {
      const token = `Token ${localStorage.getItem("token")}`;
      const response = await fetch(
        "http://127.0.0.1:8000/clgadmin/add_subject/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name: subjectName,
            subjectcode: subjectCode,
            scheme: scheme,
            semester: semester,
            department: subjectDept,
          }),
        }
      );

      if (response.ok) {
        console.log("Subject added successfully");

        // alert("Subject added successfully!");
        setAlertSeverity("success");
        setAlertMessage("Subject added successfully!");
        setSubjectName("");
        setSubjectCode("");
        setScheme("");
        setSemester("");
        setDepartment("");
        setSubjectDept([]);
        setSelectedDepartments([]);
      } else {
        const data = await response.json();
        setSubjectDept([]);
        // setSelectedDepartments([]);
        console.error("Failed to add Subject:", data.Error);
        // alert(`Failed to add Subject: ${data.Error}`);
        setAlertSeverity("error");
        setAlertMessage(`Failed to add Subject: ${data.Error}`);
      }
    } catch (error) {
      console.error("Error:", error);

      // alert("An error occurred while processing your request.");
      setAlertSeverity("error");
      setAlertMessage("An error occurred while processing your request.");
    } finally {
      setLoading(false); // Stop loading when API request finishes
    }
  };
  const validateForm = () => {
    let errors = {};
    if (!subjectCode) {
      errors.subjectCode = "Subject Code is required";
    }
    if (!subjectName) {
      errors.subjectName = "Subject Name is required";
    }
    if (!scheme) {
      errors.scheme = "Scheme is required";
    }
    if (!semester) {
      errors.semester = "Semester is required";
    }
    if (!subjectDept) {
      errors.subjectDept = "Department is required";
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
    setSubjectName("");
    setSubjectCode("");
    setScheme("");
    setSemester("");
    setDepartment("");
    setSubjectDept([]);
    setSelectedDepartments([]);
  };

  return (
    <div>
      {/* Alert component rendering based on state */}
      {alertSeverity && alertMessage && (
        <div className="absolute flex justify-center items-center ml-30 ">
          <Alert
            variant="filled"
            severity={alertSeverity}
            onClose={() => {
              setAlertSeverity("");
              setAlertMessage("");
            }}
            style={{ width: "fit-content" }}
          >
            {alertMessage}
          </Alert>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mt-10 ml-10 space-y-12">
          {/* Existing form content */}
          {/* You can integrate the new fields here */}
          <div className=" border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-xl leading-7 text-gray-900">
              Subject Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="scheme"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subject Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="subjectcode"
                    name="subjectcode"
                    value={subjectCode}
                    onChange={(e) => {
                      setSubjectCode(e.target.value);
                      handleChange("subjectCode");
                    }}
                    className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.subjectCode && "border-red-500"
                    }`}
                  />
                  {errors.subjectCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subjectCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="scheme"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subject Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="subjectname"
                    name="subjectname"
                    value={subjectName}
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                      handleChange("subjectName");
                    }}
                    className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.subjectName && "border-red-500"
                    }`}
                  />
                  {errors.subjectName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subjectName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="scheme"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Scheme
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
                    className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.scheme && "border-red-500"
                    }`}
                  />
                  {errors.scheme && (
                    <p className="text-red-500 text-sm mt-1">{errors.scheme}</p>
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
                    onChange={(e) => {
                      setSemester(e.target.value);
                      handleChange("semester");
                    }}
                    className={`block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.semester && "border-red-500"
                    }`}
                  />
                  {errors.semester && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.semester}
                    </p>
                  )}
                </div>
              </div>
              //! Yaha Validation daalna bacha hai 
              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Department
                </label>
                <div className="mt-2">
                  <Multiselect
                    key={selectedDepartments.length}
                    options={departments}
                    selectedValues={selectedDepartments}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="label"
                    closeIcon="cancel"
                    placeholder="Select Department"
                    style={{
                      multiselectContainer: {
                        width: "100%",
                      },
                      chips: {
                        background: "#6366F1",
                      },
                      searchBox: {
                        border: "none",
                        "border-bottom": "1px solid blue",
                        "border-radius": "0px",
                      },
                    }}
                  />
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
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size={24} sx={{ color: "white" }} />
                </Box>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSubject;
