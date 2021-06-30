import React,{useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import {doGet} from '../Services';
import SelectUser from '../SelectUser';
import { useForm} from 'react-hook-form'

export default function PostModal({ isOpen, toggleModal, save, changeUser, loading}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggleModal} >
                <ModalHeader>
                    Add post
                </ModalHeader>
                <ModalBody>
                    <form id="post-form" onSubmit={handleSubmit(save)}>
                        <input {...register('title', { required: true })} name="title" className="form-control my-2" placeholder="title" type="text"/>

                            <SelectUser  onChange={changeUser}  name={'user'}  />
                        <textarea {...register('body', { required: true })} className="form-control my-2" placeholder="body" name="body" />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type={'submit'} disabled={loading} form="post-form" className="btn btn-success">Save</button>
                    <button className="btn btn-warning" onClick={toggleModal}>Close</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
