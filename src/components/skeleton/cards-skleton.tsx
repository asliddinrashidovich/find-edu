import { Skeleton } from 'antd';

const CentersCardSkeleton = () => {
    const dataArray = [0,1,2,3,4,5] 
    return (
       <div className='max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-[50px]'>
            {dataArray.map((item) => (
                <div key={item} className='w-full'>
                    <Skeleton.Image active className='skeleton-img '/>
                    <Skeleton paragraph={{rows: 2}} className='my-[20px]'/>
                </div>
            ))}
       </div>
    )
}
export default CentersCardSkeleton;