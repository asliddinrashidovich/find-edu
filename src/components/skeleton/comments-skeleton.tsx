import { Skeleton } from 'antd';

const CommentsSkeleton = () => {
    const dataArray = [0,1,2,3] 
    return (
       <div>
            {dataArray.map((item) => (
                <div key={item} className='w-full'>
                    <Skeleton paragraph={{rows: 1}} className='my-[20px]'/>
                </div>
            ))}
       </div>
    )
}
export default CommentsSkeleton;