import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
};


const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    const onFinish:  FormProps<FieldType>['onFinish'] = async (values) => {
        const {name, surname, email, password} = values
        await axios.post(`https://green-shop-backend.onrender.com/api/user/sign-up?access_token=6506e8bd6ec24be5de357927`, {name, surname, password, email}).then((res) => {
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
                name: "",
                surname: "",
                email: "",
                password: ""
            }}
        >
            <h2 className='text-[36px] font-[700] leading-[100%] text-[#151515] text-center mb-[36px]'>Sign up</h2>
            <Form.Item
                label="First Name"
                name="name"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] username_label'
            >
                <Input placeholder='Enter your name' />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="surname"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] username_label'
            >
                <Input placeholder='Enter your last name' />
            </Form.Item>
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
                <Button 
                    htmlType="submit"
                    type="primary"
                >
                    Sign up
                </Button>
            </Form.Item>
            <h2 className='text-[14px] text-[#24272C] text-center leading-[120%] font-[300]'>Already have an account? <Link to={'/login'} className='text-[#1B28BC]'>Go to sign in.</Link></h2>
        </Form>
    )
}

export default RegisterForm;