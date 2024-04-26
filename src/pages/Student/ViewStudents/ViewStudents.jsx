import { useState, useEffect } from "react";
function ViewStudents(){
    useEffect(() => {
        fetchStudents();
      }, []);
    const [student, setstudents] = useState("");
    const fetchStudents = async () => {
        try {
          const token =
          `Token ${localStorage.getItem('token')}`;
        
          console.log(token)

          const response = await fetch(
            "http://127.0.0.1:8000/faculty/show_students_to_faculty/",
            {
            method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body:JSON.stringify({
                batch: 1,
                semester: 1,
              }),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            setstudents(data.result);
            
            console.log(student)
          } else {
            console.error("Failed to fetch sections");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };




    return(
        <div className="mt-10 ml-10 content-center">
            student
           
        </div>
        
    )
}

export default ViewStudents