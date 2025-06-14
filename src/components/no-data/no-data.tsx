import { ReactNode } from "react"

function NoData({children}: {children: ReactNode}) {
  return (
    <div className="flex w-full justify-center mt-[60px]">
        <div className="text-center max-w-[300px]">
            <img src="/no-data.jpg" alt="no data" />
            <h5 className="text-[25px] font-[700]">{children}</h5>
        </div>
    </div>
  )
}

export default NoData
