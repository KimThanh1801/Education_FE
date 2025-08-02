import { useEffect, useState } from 'react';
import TeacherNotificationList from '../../../components/teacher/TeacherNotificationList';

const TeacherNotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        setNotifications([
            {
                id: 1,
                studentName: 'Nguyen Van A',
                content: 'đã tag bạn trong một câu hỏi về bài tập 1',
                timestamp: '3 phút trước',
                link: '/student-question/1',
            },
            {
                id: 2,
                studentName: 'Tran Thi B',
                content: 'đã phản hồi nhận xét của bạn về bài tập 2',
                timestamp: '10 phút trước',
                link: '/feedback/2',
            },
        ]);
    }, []);

    return (
        <div className="p-6">
            <TeacherNotificationList notifications={notifications} />
        </div>
    );
};

export default TeacherNotificationPage;
