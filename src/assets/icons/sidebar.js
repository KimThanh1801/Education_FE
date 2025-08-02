
const sidebarItems = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Semester goals', icon: '🎯', href: '/semester-goals' },
  { label: 'Study Plans', icon: '📚', href: '/study-plans' },
  { label: 'Academic achievement', icon: '🏆', href: '/achievement' },
  { label: 'Logout', icon: '🚪', isLogout : true, href: '/login'},               
];

const sidebarItemsAdmin = [
  { label: 'Dashboard', icon: '📈', href: '/' },
  { label: 'Class Management', icon: '🏫', href: '/class-management' },
  { label: 'Teacher Management', icon: '🧑‍🏫', href: '/teacher-management' },
  { label: 'Student Management', icon: '🧑‍🎓', href: '/student-management' },
];

const sidebarItemsTeacher = [
  { label: 'Alert', icon: '📊', href: '/notifications' },
  { label: 'Logout', icon: '🚪', isLogout: true, href: '/login' },
];

const courses = [
{
  title: "TOEIC",
  teacher: "Le Nguyen Phuc Nhan",
  desc: "TOEIC measures English skills for the workplace, focusing on listening and reading.",
  image: ("../../../../../src/assets/image/toeic.png"),
},
{
  title: "IT English",
  teacher: "Tran Thi Khanh Uyen",
  desc: "IT English helps students improve communication in the IT field.",
  image: ("../../../../../src/assets/image/itEnglish.png"),
},
{
  title: "COMMUNICATE",
  teacher: "Nguyen Thi Thuy Trang",
  desc: "Communicate means to share information, ideas, or feelings with others.",
  image: ("../../../../../src/assets/image/communicate.png"),
},
{
  title: "TOEIC",
  teacher: "Le Nguyen Phuc Nhan",
  desc: "TOEIC measures English skills for the workplace, focusing on listening and reading.",
  image: ("../../../../../src/assets/image/toeic.png"),
}
];

const initialTasks = [
    { task: "Practice listening", course: "TOEIC", status: "In progress" },
    { task: "Review vocabulary", course: "IT English", status: "Completed" },
    { task: "Review vocabulary", course: "Speaking", status: "Cancel" },
    { task: "Practice listening", course: "TOEIC", status: "In progress" },
    { task: "Review vocabulary", course: "IT English", status: "Complete" },
    { task: "Review vocabulary", course: "Speaking", status: "Cancel" },
    { task: "Practice listening", course: "TOEIC", status: "In progress" },
  ];

export { sidebarItems, courses, initialTasks, sidebarItemsAdmin, sidebarItemsTeacher }