import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  otp?: string;
};

const API = import.meta.env.VITE_API

const VerifyOtp: React.FC = () => {
    const navigate = useNavigate()
    const storedOtp = localStorage.getItem('otp-email');
    const emailOtp = storedOtp ? JSON.parse(storedOtp) : null;

    const onFinish:  FormProps<FieldType>['onFinish'] = async (values) => {
        const { otp} = values
        await axios.post(`${API}/api/users/verify-otp`, {otp, email: emailOtp}).then(() => {
            navigate("/login")
            toast.success('Email is verified')
        }).catch(() => {
            toast.error('Something went wrong')
        })
    };

    const resendOtp = async ()  => {
        await axios.post(`${API}/api/users/send-otp`, {email: emailOtp}).then(() => {
            toast.success('We send 5 digits verification code to your email')
        }).catch(() => {
            toast.error('Something went wrong')
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
                otp: ""
            }}
            className='text-center'
        >
            <h2 className='text-[36px] font-[700] leading-[100%] text-[#151515] text-center mb-[36px]'>Verify Email</h2>
            <p className='text-[16px] text-[#888] mb-[20px]'>Enter the 5-digit code sent to {}</p>
            <Form.Item
                name="otp"
                rules={[{ required: true }]}
                layout="vertical"
                className='h-[60px] w-[270px] sm:w-[374px] text-center username_label'
            >
                <Input.OTP length={5}/>
            </Form.Item>



            <Form.Item label={null}>
                <Button htmlType="submit" type="primary">
                    Verify otp
                </Button>
            </Form.Item>
        </Form>
        <div className='flex gap-[5px] items-center justify-center'>
            <p className='text-[14px] text-[#24272C] text-center leading-[120%] font-[300]'>Didn't receive code? </p>
            <button type='button'  onClick={resendOtp} className='text-[#1B28BC] cursor-pointer'>Resend OTP.</button>
        </div>
       </>
    )
}

export default VerifyOtp;