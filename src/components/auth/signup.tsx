import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
  phone?: string;
  user?: string;
};


const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    
    const resendOtp = async ()  => {
        const storedOtp = localStorage.getItem('otp-email');
        const emailOtp = storedOtp ? JSON.parse(storedOtp) : null;
        await axios.post(`https://findcourse.net.uz/api/users/send-otp`, {email: emailOtp}).then(() => {
            toast.success('We send 5 digits verification code to your email')
        }).catch(() => {
            toast.error('Something went wrong')
        })
    }; 
    const onFinish:  FormProps<FieldType>['onFinish'] = async (values) => {
        const {name, surname, email, password, phone, user} = values
       
        await axios.post(`https://findcourse.net.uz/api/users/register`, {firstName: name, lastName: surname, password, email, phone, role: user, image: 'default.img'}).then(() => {
            navigate("/register/verify-otp")
            localStorage.setItem('otp-email', JSON.stringify(email))
            resendOtp()
        }).catch((err) => {
            if(err.status == 409) {
                toast.error('User already registered, please try another email')
            } else {
                console.log(err)
                toast.error(err.response.data.message)
            }
        })
    };

    return (
       <>
        <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            requiredMark={false}
            onFinish={(values) => onFinish(values)}
            initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
                phone: "",
                user: "",
                photo: "",
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
                label="Phone number"
                name="phone"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] username_label'
            >
                <Input placeholder='+998946092401' type='number'/>
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

            <Form.Item
                name="user"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[40px] w-[270px] sm:w-[374px] username_label'
            >
                <Select
                    dropdownStyle={{
                        background: 'white',
                        boxShadow: 'none',
                        borderRadius: 0,
                    }}
                    defaultValue="CEO"
                    style={{ width: 160 }}
                    // onChange={handleLanguageChange}
                    options={[
                        { value: 'CEO', label: 'CEO' },
                        { value: 'USER', label: 'USER' },
                    ]}
                />
            </Form.Item>
            
            <Form.Item
                name="photo"
                layout="vertical"
                className='h-[40px] w-[270px] sm:w-[374px] username_label'
            >
                <Input type="file" placeholder='Choose file' />
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
       </>
    )
}

export default RegisterForm;