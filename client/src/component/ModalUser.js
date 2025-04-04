// import "./Modal.scss"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import { useState } from 'react';

function ModalUser(props) {
    const [username, setUsername] = useState(props.dataModal.username || " "); // Lưu username
    const [email, setEmail] = useState(props.dataModal.email || ""); // Lưu email

    useEffect(() => {
        setUsername(props.dataModal.username || "");
        setEmail(props.dataModal.email || "");
    }, [props.dataModal]);

    const handleSave = () => {
        const updatedUser = {
            ...props.dataModal, // Giữ nguyên các trường khác
            username,
            email,
        };
        props.handleUpdateUser(updatedUser); // Gửi dữ liệu đã chỉnh sửa trở lại UserManagement
    };

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Người Dùng : {props.dataModal.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="formUsername">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalUser