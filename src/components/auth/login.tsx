import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
  password?: string;
};


const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const onFinish:  FormProps<FieldType>['onFinish'] = async (values) => {
        const {email, password} = values
        await axios.post(`https://green-shop-backend.onrender.com/api/user/sign-in?access_token=6506e8bd6ec24be5de357927`, {password, email}).then((res) => {
            navigate("/dashboard")
            localStorage.setItem('token', res.data.data.token)
        }).catch((err) => {
            if(err.status == 409) {
                toast.error('User Not found, please Try again')
            } else {
                toast.error('Something went wrong')
            }
        })
    };
    return (
        <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            requiredMark={false}
            onFinish={(values) => onFinish(values)}
            initialValues={{
                email: "",
                password: ""
            }}
        >
            <h2 className='text-[36px] font-[700] leading-[100%] text-[#151515] text-center mb-[36px]'>Sign in</h2>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] username_label'
            >
                <Input placeholder='Enter your email' type='email'/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] password_label'
            >
                <Input placeholder='Enter your password'/>
            </Form.Item>


            <Form.Item label={null}>
                <Button htmlType="submit" type="primary">
                    Sign in
                </Button>
            </Form.Item>
            <h2 className='text-[14px] text-[#24272C] text-center leading-[120%] font-[300]'>Don't have an acoount? <Link to={'/register'} className='text-[#1B28BC]'>Go to sign up.</Link></h2>
        </Form>
    )
}

export default LoginForm;