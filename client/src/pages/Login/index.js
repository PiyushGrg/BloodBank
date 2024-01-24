import { Button, Form, Input, Radio, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import {SetLoading} from "../../redux/loadersSlice";
import { getInputValidation } from "../../utils/helper";

function Login(){

    const [type,setType] = useState("donor");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) =>{
        try {
            dispatch(SetLoading(true));
            const response = await LoginUser({
                ...values,
                userType:type,
            });
            dispatch(SetLoading(false));
            if(response.success){
                message.success(response.message);
                localStorage.setItem("token",response.data);
                window.location.href="/";
            }
            else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-primary">
            <Form layout="vertical" className="bg-white rounded shadow grid p-5 gap-5 w-1/3"
                onFinish={onFinish}>
                <h1 className="uppercase text-2xl">
                    <span className="text-primary">{type} - Login</span>
                    <hr/>
                </h1>
                
                <Radio.Group 
                    onChange={(e) => setType(e.target.value)} value={type}>
                    <Radio value="donor">Donor</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>

            
                <Form.Item label="Email" name="email" rules={getInputValidation()}>
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={getInputValidation()}>
                    <Input type="password"/>
                </Form.Item>
                

                <Button type="primary" block htmlType="submit">
                    Login
                </Button>

                <Link to="/register" className="text-center text-gray-700 underline">
                    Don't have an account? Register
                </Link>
            </Form>
        </div>
    )
}

export default Login;