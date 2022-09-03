import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const fnOnSubmit = (data) => console.log(data);

    return (
        <div className="bg-yellow">
            <div className="container loginPage vhContainer ">
                <div className="side">
                    <a href="#">
                        <img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" />
                    </a>
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(fnOnSubmit)}>
                        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
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
                        <input
                            type="submit"
                            className="formControls_btnSubmit"
                            value="登入"
                        />
                        <Link to="/sign-up" className="formControls_btnLink">註冊帳號</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
