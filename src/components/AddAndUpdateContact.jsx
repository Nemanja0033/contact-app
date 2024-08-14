import React from 'react';
import Modal from './Modal'; 
import { Formik, Field, Form } from 'formik';

const AddAndUpdateContact = ({ isOpen, onClose, onAddContact }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={{ name: '', number: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Name is required';
                    }
                    if (!values.number) {
                        errors.number = 'Number is required';
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    await onAddContact(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='flex flex-col gap-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-neutral-200' htmlFor="name">Name</label>
                            <Field className="h-8 border rounded-xl" name="name" />
                            {errors.name && touched.name ? (
                                <div className="text-red-500 text-sm">{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='text-neutral-200' htmlFor="number">Number</label>
                            <Field className="h-8 border rounded-xl" name="number" />
                            {errors.number && touched.number ? (
                                <div className="text-red-500 text-sm">{errors.number}</div>
                            ) : null}
                        </div>
                        <button className='bg-purple-600 px-3 h-8 mt-2 text-neutral-200' type="submit">Add Contact</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddAndUpdateContact;
