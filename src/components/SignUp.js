import React from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiPostUserSignUp } from '../api/index';
import { Link, useNavigate } from "react-router-dom";
import SignInUpSide from "./SignInUpSide";

const MySwal = withReactContent(Swal);

function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const fnOnSubmit = data => {
        const { email, nickname, password } = data;
        const signUpInfo = {
            user: {
                email,
                nickname,
                password,
            }
        }
        callApiPostUserSignUp(signUpInfo);
    }

    async function callApiPostUserSignUp(data) {
        try {
            const res = await apiPostUserSignUp(data);
            MySwal.fire(
                {
                    titleText: res.data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    text: '立即前往登入'
                }
            ).then(() => {
                navigate('/sign-in');
            })
        } catch (err) {
            let listHtml = '';
            err.response.data.error.forEach((item) => {
                listHtml += `<li>${item}</li>`;
            });
            MySwal.fire(
                {
                    titleText: err.response.data.message,
                    icon: 'error',
                    showConfirmButton: false,
                    html: `<ul style="color: red;">${listHtml}</ul>`
                }
            ).then(() => {
                reset({
                    email: "",
                    nickname: "",
                    password: "",
                    confirm_password: "",
                })
            })
        }
    }

    return (
        <div className="bg-yellow">
            <div className="container signUpPage vhContainer">
                <SignInUpSide />
                <div>
                    <form className="formControls" onSubmit={handleSubmit(fnOnSubmit)}>
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">電子信箱</label>
                        <input
                            type="text"
                            id="email"
                            className="formControls_input"
                            placeholder="請輸入 email"
                            {...register('email', {
                                    required: {
                                        value: true,
                                        message: "電子信箱 欄位必填"
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
                                    value: 6,
                                    message: "密碼長度至少 6 碼"
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
                        <Link to="/sign-in" className="formControls_btnLink">登入</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
