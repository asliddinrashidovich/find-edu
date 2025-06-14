import { IMajor } from "@/interfaces";
import { Checkbox, CheckboxChangeEvent, Modal } from "antd"
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io"

function FilterCenters({ centerMajor, centerLocations, handleRemoveBranch, handleRemoveLocation, handleAddLocation, handleAddBranch, branchList, centerlocationList }: { centerMajor: IMajor[]; centerLocations: IMajor[]; handleRemoveBranch: (item: string) => void; handleRemoveLocation: (item: string)  => void; handleAddLocation: (item: string)  => void; handleAddBranch: (item: string)  => void; branchList: string[]; centerlocationList: string[]}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeMajor = (e: CheckboxChangeEvent, name: string) => {
        if (e.target.checked ) {
            handleAddBranch(name);
        } else {
            handleRemoveBranch(name)
        }
    };
    const onChangeLocation = (e: CheckboxChangeEvent, name: string) => {
        if (e.target.checked) {
            handleAddLocation(name);
        } else {
            handleRemoveLocation(name)
        }
    };

  return (
    <div>
        <button onClick={showModal} className="text-[#fff] p-[10px] bg-[#451774] rounded-[10px] cursor-pointer flex items-center gap-[5px]">
            <span>Kurslar va Hududlar</span>
            <IoIosArrowDown />
        </button>
        <Modal
            title={''}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} 
            style={{width: '600px'}}
        >
            <div className="grid grid-cols-1  sm:grid-cols-2">
                <div>
                    <h3 className="text-[20px] mb-[10px]">Yo'nalishlarni tanlang</h3>
                    {centerMajor?.map((item) => (
                        <Checkbox checked={branchList.includes(item.name)} key={item.id} onChange={(e) => onChangeMajor(e, item.name)}>{item.name}</Checkbox>
                    ))}
                </div>
                <div>
                    <h3 className="text-[20px] mb-[10px]">Hududlarni tanlang</h3>
                    {centerLocations?.map((item) => (
                        <Checkbox checked={centerlocationList.includes(item.name)} key={item.id} onChange={(e) => onChangeLocation(e, item.name)}>{item.name}</Checkbox>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-between items-center mt-[30px]">
                <button onClick={handleOk} className="py-[7px] px-[20px] bg-[#451774] text-[#fff] rounded-[7px] cursor-pointer">Ok</button>
                <button onClick={handleCancel} className="py-[7px] px-[20px] bg-[#f61fae] text-[#fff] rounded-[7px] cursor-pointer">Bekor qilish</button>
            </div>
        </Modal>
    </div>
  )
}

export default FilterCenters