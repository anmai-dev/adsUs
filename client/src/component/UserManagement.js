import React, { useEffect, useState } from 'react';
import "./UserManagement.scss";
import { getAllUser, upDateUser } from "../redux/apiRequest";
import { deleteUser } from "../redux/apiRequest"
import { useDispatch, useSelector } from 'react-redux';
import ModalUser from './ModalUser';

const UserManagement = () => {
    const token = useSelector((state) => state.auth.login?.currentUser);
    const user = useSelector((state) => state.user.getAllUser?.currentUser);
    const dispatch = useDispatch();
    const [isShowModal, setisShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})




    useEffect(() => {
        getAllUser(dispatch);
    }, [dispatch]);


    const handleDelete = async (id) => {
        try {
            await deleteUser(token?.accessToken, id, dispatch)
            await getAllUser(dispatch);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditUser = (user) => {
        setisShowModal(true)
        setDataModal(user)
    }
    const handleClose = () => {
        setisShowModal(false)
        setDataModal({})
    }
    const handleUpdateUser = async (updatedUser) => {
        try {
            await upDateUser(dataModal._id, token?.accessToken, updatedUser, dispatch)
            setisShowModal(false);
            setDataModal({});
            await getAllUser(dispatch);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='user'>
                <h1>Danh Sách Người Dùng</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Người Dùng</th>
                            <th>Thông Tin LH</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(user) && user.length > 0 ? (
                            user?.map((userItem, index) => (
                                <tr key={index}>
                                    <td>{userItem.username}</td>
                                    <td>{userItem.email}</td>
                                    <td>
                                        <div className='actions'>
                                            <i className="fa-solid fa-pen icons" onClick={() => handleEditUser(userItem)}></i>
                                            <i className="fa-solid fa-trash icons" onClick={() => handleDelete(userItem._id)}></i>                                    </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    Không có người dùng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalUser
                show={isShowModal}
                handleClose={handleClose}
                dataModal={dataModal}
                handleUpdateUser={handleUpdateUser}

            />
        </>
    );
};

export default UserManagement;

