import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { utils } from '../../helper/utils';
import { errorSchema } from '../../helper/errorSchema';
import { InputField } from '../common/InputField';
import { Link, useNavigate } from 'react-router-dom';

const formObj = {
    userName: '',
    email_id: '',
    password: '',
    confirm_password: '',
}

export default function Register() {

    const [formValue, setFormValue] = useState(formObj);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnChange = async (name, value) => {
        const stateObj = { ...formValue, [name]: value };
        setFormValue(stateObj);
        if (!utils.isObjectKeyEmpty(formError)) {
            const validationResult = await utils.checkFormError(stateObj, errorSchema.registerSchema);
            if (validationResult === true) {
                setFormError("");
            } else {
                setFormError(validationResult);
            }
        }
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const validationResult = await utils?.checkFormError(formValue, errorSchema.registerSchema);

        if (utils?.isObjectKeyEmpty(validationResult)) {
            setLoading(true);
            try {
                localStorage.setItem("user", JSON.stringify(formValue));
                setFormValue('');
                setLoading(false);
                toast.success('Register Successfully');
                navigate("/login");
            } catch (error) {
                console.log("errr", error);
            }
            setFormError("");
        } else {
            setFormError(validationResult);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block img_ajn p-5">
                        <img
                            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                            className="img-fluid"
                            style={{ minHeight: "100%" }}
                        />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <div className='flexBet_cls'>
                            <h3 className="pb-3">Register</h3>
                            <Link to='/home'><span className="pb-3">Back</span></Link>
                        </div>
                        <div className="form-style mt-5">
                            <form>
                                <div className="form-group pb-3">
                                    <InputField
                                        label="User Name *"
                                        placeholder="User Name"
                                        name='userName'
                                        type='text'
                                        value={formValue?.userName}
                                        focus={!!(typeof formError === "object" && formError?.userName)}
                                        error={!!(typeof formError === "object") ? formError?.userName : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        label="Email id *"
                                        placeholder="Email id"
                                        name='email_id'
                                        type='text'
                                        value={formValue?.email_id}
                                        focus={!!(typeof formError === "object" && formError?.email_id)}
                                        error={!!(typeof formError === "object") ? formError?.email_id : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        placeholder="Password"
                                        label="Password *"
                                        name='password'
                                        type='Password'
                                        value={formValue?.password}
                                        focus={!!(typeof formError === "object" && formError?.password)}
                                        error={!!(typeof formError === "object") ? formError?.password : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        placeholder="Confirm Password"
                                        label="Confirm Password *"
                                        name='confirm_password'
                                        type='Password'
                                        value={formValue?.confirm_password}
                                        focus={!!(typeof formError === "object" && formError?.confirm_password)}
                                        error={!!(typeof formError === "object") ? formError?.confirm_password : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>

                                <div className="pb-2 mt-4">
                                    <button
                                        onClick={handleSubmitClick}
                                        type="submit"
                                        className="btn btn-primary w-100 font-weight-bold mt-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
