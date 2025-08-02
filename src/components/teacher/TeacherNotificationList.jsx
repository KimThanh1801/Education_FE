import { useNavigate } from 'react-router-dom';

const TeacherNotificationList = ({ notifications }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 shadow-md rounded-xl h-full">
            <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
            <ul className="space-y-4">
                {notifications.map((notif) => (
                    <li
                        key={notif.id}
                        onClick={() => navigate(notif.link)}
                        className="cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-700">{notif.studentName}</span>
                            <span className="text-sm text-gray-500">{notif.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{notif.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherNotificationList;
