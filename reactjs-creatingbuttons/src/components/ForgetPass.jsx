import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSendEmail = async () => {
        if (!email || !email.includes('@')) {
            toast.error(`Please enter a valid email address`);
            return;
        }
        try {
            setLoading(true); // Show loading indicator
            const response = await fetch('http://localhost:4000/users/forget-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsOtpSent(true);
                toast.success('OTP sent to your email');
            } else {
                toast.error(data.message || 'Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error sending email:' + error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    const handleVerifyOtp = async () => {
        if (!code) {
            toast.error(`Please enter the OTP`);
            return;
        }

        try {
            console.log('Request Body:', { email, code });

            const response = await fetch('http://localhost:4000/users/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();
            console.log('Response Data:', data); // Log the full response

            if (response.ok) {
                setIsOtpVerified(true);
                setShowModal(true);
            } else {
                toast.error(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Error verifying OTP:' + error);
            console.error('Error verifying OTP:', error);
        }
    };

    const handleChangePassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            toast.error(`Password must be at least 6 characters long`);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/users/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Password changed successfully!');
                setShowModal(false);
                setIsOtpSent(false);
                setIsOtpVerified(false);
                setEmail('');
                setCode('');
                setNewPassword('');
            } else {
                toast.error(data.message || `Failed to change password`);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(`An error occurred. Please try again.`);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Password Reset</h2>

            {/* Input for email */}
            <Form.Group className="mb-3">
                <Form.Label style={styles.label}>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
            </Form.Group>

            {/* Send Email Button */}
            <Button 
                variant="primary" 
                onClick={handleSendEmail} 
                disabled={!email || isOtpSent || loading}
                style={styles.submitButton}
            >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : (isOtpSent ? 'Email Sent' : 'Send Email')}
            </Button>

            <hr style={styles.hr} />

            {/* Input for OTP */}
            {isOtpSent && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.label}>Enter Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the OTP"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Group>

                    {/* Verify OTP Button */}
                    <Button variant="success" onClick={handleVerifyOtp} disabled={isOtpVerified || loading} style={styles.submitButton}>
                        {isOtpVerified ? 'OTP Verified' : 'Verify OTP'}
                    </Button>
                </>
            )}

            {/* Modal for changing password */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.label}>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} style={styles.cancelButton}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChangePassword} style={styles.submitButton}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        color: '#555',
    },
    input: {
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginTop: '15px',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: '#fff',
    },
    cancelButton: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginTop: '10px',
        borderRadius: '8px',
        backgroundColor: '#f44336',
        color: '#fff',
    },
    hr: {
        margin: '20px 0',
        border: '0',
        borderTop: '1px solid #ccc',
    },
};

export default ForgetPass;
