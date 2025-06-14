import { CenterType, UserType } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import {Image, Modal, Rate } from "antd";
import axios, { AxiosError } from "axios";
import { FaPhone, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoArrowBack, IoLocationOutline } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCalendar } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { GrHomeOption } from "react-icons/gr";
import { format } from 'date-fns';
import CommentsSkeleton from "../skeleton/comments-skeleton";
import toast from "react-hot-toast";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";
import RegisterToClass from "./register-to-class";

const API = import.meta.env.VITE_API

function CenterDetailsSection() {
    const navigate = useNavigate()
    const [commentText, setCommentText] = useState('')
    const [editcommentText, setEditCommentText] = useState('')
    const [star, setStar] = useState<number>(5)
    const [star2, setStar2] = useState<number>(5)
    const [refresh, setRefresh] = useState(false)
    const [loadingComment, setLoadingComment] = useState(false);
    const {id} = useParams()
    const token = localStorage.getItem('token')
    const userDataRaw = localStorage.getItem('user');
    const user: UserType | null = userDataRaw ? JSON.parse(userDataRaw) : null;
    const [openModalId, setOpenModalId] = useState<number | null>(null);
    const [openEditCommentId, setOpenEditCommentId] = useState<number | null>(null);

    // get center details
    const fetchStudyCenterDetails = async () => {
        const res = await axios.get(`${API}/api/centers/${id}`);
        return res.data
    };
    const { data: coursesDetailsData, isLoading: loading} = useQuery<CenterType>({
        queryKey: ["coursesDetailsQuery", refresh],
        queryFn: fetchStudyCenterDetails,
    });

    function handleChangeEditData(id: number, text: string, starsCount: number) {
        setOpenEditCommentId(id)
        setStar2(starsCount)
        setEditCommentText(text)
    }

    // add a comment
    async function addCommit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoadingComment(true)
        try {
            await axios.post(`${API}/api/comments`, {text: commentText, star, centerId: id}, {headers: { Authorization: `Bearer ${token}` } })
            setRefresh(prev => prev ? false : true)
            setCommentText('')
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoadingComment(false)
        }
    }

    // edit a comment
    async function EditComent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.patch(`${API}/api/comments/${openEditCommentId}`, {text: editcommentText, star: star2}, {headers: { Authorization: `Bearer ${token}` } })
            setRefresh(prev => prev ? false : true)
            toast.success('The comment is updated')
            setOpenEditCommentId(null)
        }
        catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoadingComment(false)
        }
    }
    
    // handle Delete
    async function handleDelete(commentId: number) {
        try {
            await axios.delete(`${API}/api/comments/${commentId}`, {headers: {Authorization: `Bearer ${token}`}})
            setRefresh(prev => prev ? false : true)
            toast.success('The Comment Deleted')
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleClickBranches = (prevId: number) => {
        navigate(`/branches/${prevId}`)
        localStorage.setItem('prevCenter', JSON.stringify(prevId))
    }
    const handleRateChange = (value: number) => {setStar(value)};
    const handleRateChange2 = (value: number) => {setStar2(value)};

  return (
    <section className="px-5 md:px-10 pb-[70px] pt-[100px]">
        <button onClick={() => navigate('/')} className="flex gap-[7px]  items-center hover:text-[#451774] transition-all duration-200 cursor-pointer mb-[30px]">
            <IoArrowBack className="text-[25px]"/>
            <span className="text-[20px]">Markazlarga qaytish</span>
        </button>
        <div className="flex flex-col lg:flex-row gap-[40px] items-start">
            <div className="w-full lg:w-[60%]">
                <div className="w-full bg-[#f3f3f3] h-[500px] rounded-[20px] overflow-hidden mb-[30px]">
                    <Image width={'100%'} height={'100%'} className="w-full object-cover h-full" src={`https://findcourse.net.uz/api/image/${coursesDetailsData?.data?.image}`} alt="center image" />
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                    <h3 className="text-[30px] font-[700]">{coursesDetailsData?.data.name}</h3>
                    <div className="rounded-[30px] flex bg-[#F3E8FF] py-[3px] px-[10px] cursor-pointer gap-[3px] items-center">
                        <FaStar className="text-[20px] text-[#eab308]"/>
                        <span className="text-[18px] leading-[100%]">{coursesDetailsData?.data?.comments.length ? (coursesDetailsData?.data?.comments.reduce((star1, star2) => star1 + star2.star, 0) / coursesDetailsData?.data?.comments.length).toFixed(1) : '0.0'}</span>
                    </div>
                </div>
                <div className="flex items-center text-[#444] justify-start gap-[10px] mb-[20px]">
                    <IoLocationOutline className="text-[22px]"/>
                    <span className="text-[16px]">{coursesDetailsData?.data.address}</span>
                </div>
                <h4>Phone</h4>
                <button>
                    <a href={`tel:${coursesDetailsData?.data.phone}`} className="flex   items-center text-[#111] justify-start gap-[10px] mb-[30px]">
                        <FaPhone  className="text-[22px]"/>
                        <span className="text-[20px]">{coursesDetailsData?.data.phone}</span>
                    </a>
                </button>
                <div className="flex items-center text-[#111] justify-start gap-[10px] mb-[10px]">
                    <FaRegMessage  className="text-[22px]"/>
                    <span className="text-[20px]">Sharhlar ({coursesDetailsData?.data?.comments.length})</span>
                </div>
                <form onSubmit={addCommit} className="mb-[30px]">
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Bu markaz haqida fikringizni bildiring" name="comment" className="border-[1px] border-[#888] w-full rounded-[10px] outline-[#451774] p-[10px] mb-[10px]"  id="comment"></textarea>
                    <div className="flex items-center gap-[20px]">
                        {!loadingComment && <button disabled={commentText.length == 0 ? true : false} className={` p-[10px] w-[130px] rounded-[10px] text-[#fff] ${commentText.length != 0 ? 'bg-[#451774] cursor-pointer' : 'bg-[#b981ff] cursor-not-allowed'}`}>
                            Sharh qodirish
                        </button>}
                        {loadingComment && <button  className="bg-[#451774] p-[10px] w-[130px] cursor-pointer rounded-[10px] text-[#fff]">
                            <ClipLoader size={20} color="#fff" className="text-[#fff]" />
                        </button>}
                        <div className="flex items-center gap-[4px]">
                            <span className="text-[17px]">Reyting:</span>
                            <Rate defaultValue={5} onChange={handleRateChange} value={star}/>
                        </div>
                    </div>
                </form>
                {coursesDetailsData?.data?.comments.slice().reverse().map((item) => (
                    <div className="bg-[#ebf5ff] rounded-[10px] mb-[10px] p-[10px]" key={item.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[20px]">
                                <div className="w-[20px] h-[20px] rounded-[50%]">
                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s'} alt="user logo" />
                                </div>
                                <h3 className="font-[600]">{item.user.firstName} {item.user.lastName}</h3>
                                <Rate defaultValue={item.star} style={{ fontSize: 14 }} disabled/>
                            </div>
                            <div className="flex text-[#444] items-center gap-[10px]">
                                <IoIosCalendar />
                                <span>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</span>
                            </div>
                        </div>
                        {openEditCommentId != item.id && <div className="flex justify-between items-center">
                            <p className="mt-[5px] text-[#444]">{item.text}</p>
                            {user?.id == item.userId && <div className="flex gap-[8px] items-center justify-end">
                                <button onClick={() => handleChangeEditData(item.id, item.text, item.star)} className="cursor-pointer">
                                    <CiEdit className="text-[#008cff]"/>
                                </button>
                                <button onClick={() => setOpenModalId(item.id)} className="cursor-pointer">
                                    <FaRegTrashAlt  className="text-[#ff3737]"/>
                                </button>
                            </div>}
                        </div>}
                        {openEditCommentId == item.id && <form onSubmit={EditComent} className="w-full">
                            <textarea value={editcommentText} onChange={(e) => setEditCommentText(e.target.value)} className="border-[1px] rounded-[5px] mt-[10px] border-[#777] p-[4px] w-[100%]"></textarea>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[4px]">
                                    <span className="text-[17px]">Reyting:</span>
                                    <Rate defaultValue={item.star} onChange={handleRateChange2}  value={star2}/>
                                </div>
                                <div className="flex gap-[5px] items-center ">
                                    <button onClick={()=> setOpenEditCommentId(null)} type="button" className="bg-[#ff6f00] rounded-[6px] py-[2px] cursor-pointer text-[#fff] px-[10px]">Cancel</button>
                                    <button type="submit" className="bg-[#451774] rounded-[6px] py-[2px] cursor-pointer text-[#fff] px-[10px]">Save</button>
                                </div>
                            </div>
                        </form>}
                        <Modal
                            title="Commentni o‘chirish"
                            open={openModalId === item.id}
                            onOk={() => handleDelete(item.id)}
                            onCancel={() => setOpenModalId(null)}
                        >
                            <p>Haqiqatdan ham shu comment ni o'chirishni istaysizmi</p>
                        </Modal>
                    </div>
                ))}
                {loading && (
                    <div>
                        <CommentsSkeleton/>
                    </div>
                )}
            </div>
            <hr className="border-[1px] border-[#777] lg:hidden  w-full"/>
            <div className="w-full lg:w-[40%] mb-[80px]">
                <h3 className="text-[25px] text-[#111] font-[600] mb-[10px]">Bizning filiallar</h3>
                {coursesDetailsData?.data.filials.map((item) => (
                    <div onClick={() => handleClickBranches(item.id)} className="bg-[#f3e8ff] border-[1px] cursor-pointer border-[#e2c8fe] rounded-[10px] py-[20px] px-[10px]" key={item.id}> 
                        <h5 className="mb-[2px]">{item.name}</h5>
                        <p className="text-[#555] text-[15px]">{item.address}</p>
                    </div>
                ))}
                <div className="flex items-center text-[25px] text-[#111] font-[600] justify-start gap-[10px] mb-[20px] mt-[30px]">
                    <PiStudentBold className="text-[25px]"/>
                    <span className="text-[25px] text-[#111] font-[600]">Mavjud kurslar</span>
                </div>
                {coursesDetailsData?.data.majors.map((item) => (
                    <button key={item.id} className="border-[2px] cursor-pointer border-[#451774] rounded-[10px] p-[7px] flex items-center gap-[7px] mb-[20px]">
                        <div className="w-[30px] h-[30px] rounded-[4px] bg-[#f3e8ff] flex items-center justify-center">
                            <GrHomeOption/>
                        </div>
                        <p>{item.name}</p>
                    </button>
                ))}
                <RegisterToClass filials={coursesDetailsData?.data?.filials} majors={coursesDetailsData?.data.majors}/>
            </div>
        </div>
    </section>
  )
}

export default CenterDetailsSection