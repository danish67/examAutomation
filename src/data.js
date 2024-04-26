export const menu = {
  admin: [
    {
      id: 1,
      title: "Dashboard",
      listItems: [
        {
          id: 1,
          title: "Main",
          url: "/admin/home",
          icon: "home.png",
        },
      ],
    },
    {
      id: 2,
      title: "Student",
      listItems: [
        {
          id: 1,
          title: "Add Student",
          url: "/admin/addStudent",
          icon: "add.png",
        },
        {
          id: 2,
          title: "Student Details",
          url: "/admin/studentDeatils",
          icon: "user.svg",
        },
      ],
    },
    {
      id: 3,
      title: "Faculty",
      listItems: [
        {
          id: 1,
          title: "Faculty Details",
          url: "/admin/facultyDetails",
          icon: "faculty.png",
        },
        // {
        //     id: 2,
        //     title: "Student Details",
        //     url: "/studentDeatils",
        //     icon: "user.svg",
        // },
      ],
    },
    {
      id: 4,
      title: "School",
      listItems: [
        // {
        //     id: 1,
        //     title: "Add School",
        //     url: "/addSection",
        //     icon: "setting.svg",
        // },
        {
          id: 2,
          title: "School Details",
          url: "/admin/sectionDetails",
          icon: "school.png",
        },
      ],
    },
    {
      id: 5,
      title: "Department",
      listItems: [
        {
          id: 1,
          title: "Add Department",
          url: "/admin/addDepartment",
          icon: "add.png",
        },
        {
          id: 2,
          title: "Department Details",
          url: "/admin/deptDetails",
          icon: "department.png",
        },
      ],
    },
    {
      id: 6,
      title: "Batches",
      listItems: [
        {
          id: 1,
          title: "Add Batch",
          url: "/admin/addBatch",
          icon: "add.png",
        },
        {
          id: 2,
          title: "Batch Details",
          url: "/admin/batchDetails",
          icon: "batch.png",
        },
      ],
    },
    {
      id: 7,
      title: "Curriculum",
      listItems: [
        {
          id: 1,
          title: "Add Curriculum",
          url: "/admin/addCurriculum",
          icon: "add.png",
        },
        {
          id: 2,
          title: "Curriculum Details",
          url: "/admin/curriculumDetails",
          icon: "subject.png",
        },
      ],
    },
    {
      id: 8,
      title: "Exam",
      listItems: [
        {
          id: 1,
          title: "Add Exam",
          url: "/admin/addExam",
          icon: "add.png",
        },
        // {
        //     id: 3,
        //     title: "Assign Exam",
        //     url: "/admin/assignExam",
        //     icon: "assignexam.png",
        // },
        {
          id: 2,
          title: "Exam Details",
          url: "/admin",
          icon: "examdetails.png",
        },
      ],
    },
    // {
    //     id: 8,
    //     title: "Subjects",
    //     listItems: [
    //         {
    //             id: 1,
    //             title: "Add Subject",
    //             url: "/admin/addSubject",
    //             icon: "add.png",
    //         },
    //         {
    //             id: 2,
    //             title: "Subject Details",
    //             url: "/admin/fetchSubjects",
    //             icon: "subject.png",
    //         },
    //     ],
    // },
    {
      id: 9,
      title: "Marks",
      listItems: [
        {
          id: 1,
          title: "Assign Marks",
          url: "/admin",
          icon: "marks.png",
        },
      ],
    },
  ],
  student: [
    {
      id: 1,
      title: "Dashboard",
      listItems: [
        {
          id: 1,
          title: "Main",
          url: "/student/home",
          icon: "home.png",
        },
      ],
    },
    {
      id: 2,
      title: "Dashboard 2",
      listItems: [
        {
          id: 1,
          title: "Example 2",
          url: "/student/example2",
          icon: "home.png",
        },
      ],
    },
    {
      id: 3,
      title: "Dashboard 3",
      listItems: [
        {
          id: 1,
          title: "Example 3",
          url: "/student/example3",
          icon: "home.png",
        },
      ],
    },
  ],
  faculty: [
    {
      id: 1,
      title: "Dashboard",
      listItems: [
        {
          id: 1,
          title: "Main",
          url: "/faculty/home",
          icon: "home.png",
        },
      ],
    },
    {
      id: 2,
      title: "View Students",
      listItems: [
        {
          id: 1,
          title: "View Students",
          url: "/faculty/viewstudents",
          icon: "home.png",
        },
      ],
    },
  ],
};
