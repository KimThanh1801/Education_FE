import { useEffect, useState } from 'react';
import { ref, onChildAdded, get } from 'firebase/database';
import { api } from '../../utils/constants';
import './StudentForm.css';
import { database } from '../../firebase';
import { useAuth } from '../../services/providers/AuthContext';

const StudentForm = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { user } = useAuth();
    const studentId = user.user_id;

    useEffect(() => {
        const messagesRef = ref(database, `conversations/${studentId}/messages`);

        // Load initial messages
        get(messagesRef).then((snapshot) => {
            if (snapshot.exists()) {
                const messagesData = snapshot.val();
                const messagesArray = Object.entries(messagesData).map(([key, value]) => ({
                    key,
                    ...value,
                }));
                setMessages(messagesArray);
                console.log('Initial messages loaded:', messagesArray);
            } else {
                console.log('No messages found for student:', studentId);
            }
        }).catch((error) => {
            console.error('Error loading initial messages:', error);
        });

        // Listen for new messages
        console.log('Listening for messages for student:', studentId);
        const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
            const message = snapshot.val();
            const messageKey = snapshot.key;
            console.log('New message received:', { key: messageKey, ...message });

            setMessages((prevMessages) => {
                const isDuplicate = prevMessages.some((m) => m.key === messageKey);
                if (!isDuplicate) {
                    console.log('Adding new message to state:', message);
                    return [...prevMessages, { key: messageKey, ...message }];
                }
                return prevMessages;
            });
        }, (error) => {
            console.error('Error listening to messages:', error);
        });

        return () => unsubscribe();
    }, [studentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/v1/messages/send', { content });
            setContent('');
        } catch (error) {
            console.error('Gửi tin nhắn thất bại:', error);
        }
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <div className="student-chat-container">
            <button onClick={toggleChat} className="student-chat-toggle">
                <svg className="student-chat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            {isChatOpen && (
                <div className="student-chat-window">
                    <div className="student-chat-header">
                        <h2 className="student-chat-title">Message to admin</h2>
                        <button onClick={toggleChat} className="student-chat-close">
                            <svg className="student-chat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="student-chat-content">
                        <div className="student-chat-history">
                            {messages.length === 0 ? (
                                <p className="student-chat-empty">No any messages.</p>
                            ) : (
                                messages.map((message) => (
                                    <div key={message.key} className={`student-message-row ${message.sender === 'student' ? 'student-message' : 'admin-message'}`}>
                                        <div className={`student-message-bubble ${message.sender === 'student' ? 'student-bubble' : 'admin-bubble'}`}>
                                            <p>{message.content}</p>
                                            <span className="student-message-time">{message.created_at}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="student-chat-input">
                            <form onSubmit={handleSubmit} className="student-chat-form">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter your message..."
                                    className="student-input-textarea"
                                    rows="2"
                                    required
                                />
                                <button type="submit" className="student-send-button">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentForm;