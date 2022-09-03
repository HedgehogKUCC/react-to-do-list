import React from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const fnOnSubmit = data => {
        console.log('fnOnSubmit: ', data);
        const { email, nickname, password } = data;
        const signUpInfo = {
            user: {
                email,
                nickname,
                password,
            }
        }
        console.log('signUpInfo: ', signUpInfo);
    }

    // console.log(watch("email")); // watch input value by passing the name of it

    const callSignUpApi = (e) => {
        console.log(e);
        MySwal.fire({
            title: <p>Hello World</p>,
            didOpen: () => {
                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                MySwal.showLoading()
            },
        }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
        })
    }

    return (
        <div className="bg-yellow">
            <div className="container signUpPage vhContainer">
                <div className="side">
                    <a href="#">
                        <img
                            className="logoImg"
                            src="https://upload.cc/i1/2022/03/23/rhefZ3.png"
                            alt=""
                        />
                    </a>
                    <img
                        className="d-m-n"
                        src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"
                    />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(fnOnSubmit)}>
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="formControls_input"
                            placeholder="請輸入 email"
                            {...register('email', {
                                    required: {
                                        value: true,
                                        message: "Email 欄位必填"
                                    },
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: "不符合 email 規則"
                                    }
                                })
                            }
                        />
                        <span style={{ margin: 0, color: 'red' }}>{errors.email?.message}</span>
                        <label className="formControls_label" htmlFor="name">您的暱稱</label>
                        <input
                            type="text"
                            id="name"
                            className="formControls_input"
                            placeholder="請輸入您的暱稱"
                            {...register('nickname', {
                                required: {
                                    value: true,
                                    message: "暱稱 欄位必填"
                                }
                            })}
                        />
                        <span style={{ margin: 0, color: 'red' }}>{errors.nickname?.message}</span>
                        <label className="formControls_label" htmlFor="password">密碼</label>
                        <input
                            type="password"
                            id="password"
                            className="formControls_input"
                            placeholder="請輸入密碼"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: "密碼 欄位必填"
                                },
                                minLength: {
                                    value: 8,
                                    message: "密碼長度至少 8 碼"
                                }
                            })}
                        />
                        <span style={{ margin: 0, color: 'red' }}>{errors.password?.message}</span>
                        <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
                        <input
                            type="password"
                            id="pwd"
                            className="formControls_input"
                            placeholder="請再次輸入密碼"
                            {...register('confirm_password', {
                                required: {
                                    value: true,
                                    message: '請再次輸入密碼'
                                },
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return "密碼不一致";
                                    }
                                }
                            })}
                        />
                        <span style={{ margin: 0, color: 'red' }}>{errors.confirm_password?.message}</span>
                        <input
                            type="submit"
                            className="formControls_btnSubmit"
                            value="註冊帳號"
                        />
                        <a className="formControls_btnLink" href="#">登入</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
