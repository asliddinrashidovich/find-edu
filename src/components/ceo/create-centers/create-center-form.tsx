import { useState } from "react";
import ImageUpload from "./upload-file"

function CreateCenterForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
      setSelectedFile(file);
      if (file) {
        console.log("Tanlangan fayl:", file.name, file.size);
      } else {
        console.log("Fayl o‘chirildi.");
      }
    };
    console.log(selectedFile)
  return (
    <section id="create_centers_mainsection" className="px-5 md:px-10 py-[80px]">
      <div className="max-w-[600px] lg:max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
        <div className="p-[20px] rounded-[15px] shadow-2xl">
          <h2 className="text-center text-[30px] font-[700] mb-[20px] text-[#451774]">O'quv Markaz Yaratish</h2>
          <form>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Markaz nomi</p>
              <input type="text" id="markaz" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px] focus:outline-[#38caff]" placeholder="Enter center name"/>
            </label>
            <label htmlFor="hudud" className="mb-[15px] inline-block w-full">
              <p>Hudud</p>
              <select id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="def">Select Region</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </label>
            <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
              <p>Manzil</p>
              <input id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="rasm" className="mb-[15px] inline-block w-full">
              <p className="mb-[10px]">Markaz rasmi <span className="text-[red]">*</span></p>
              <ImageUpload onFileSelect={handleFileSelect} />
            </label>
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input id="phone" type="text" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <p>Yo'nalishlar (kamida bittasini tanlang)</p>
            <label htmlFor="yonalishlar" className="mb-[15px] inline-block w-full">
              <input id="yonalishlar" type="checkbox" defaultValue={'+998'} className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
              <span>optional</span>
            </label>
            <button className="rounded-[7px] w-full p-[10px] bg-[#451774] text-[#fff] cursor-pointer">Markaz qo'shish</button>
          </form>
        </div>
        <div className="p-[20px] rounded-[15px] shadow-2xl">
          <h2 className="text-center text-[30px] font-[700] mb-[20px] text-[#451774]">Filial Yaratish</h2>
          <form>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Markazni tanlang</p>
              <select id="markaz" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="def">Select Region</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </label>
            <label htmlFor="markaz" className="mb-[15px] inline-block w-full">
              <p>Filial nomi</p>
              <input type="text" id="markaz" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[2px] focus:outline-[#38caff]" placeholder="Filial nomini kiriting"/>
            </label>
            <label htmlFor="qolda" className="mb-[15px] inline-block w-full gap-[5px]">
              <input id="qolda" type="checkbox" defaultValue={'+998'} className="border-[1px] rounded-[7px] py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
              <span>Filial nomini qo'lda kiritish</span>
            </label>
            <label htmlFor="phone" className="mb-[15px] inline-block w-full">
              <p>Telefon raqami</p>
              <input id="phone" type="text" defaultValue={'+998'} className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="hudud" className="mb-[15px] inline-block w-full">
              <p>Hudud</p>
              <select id="hudud" className="border-[1px] cursor-pointer rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" >
                <option value="def">Select Region</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </label>
            <label htmlFor="manzil" className="mb-[15px] inline-block w-full">
              <p>Manzil</p>
              <input id="manzil" type="text" className="border-[1px] rounded-[7px] w-full py-[10px] px-[15px] border-[#999] text-[#999] focus:outline-[1px] focus:outline-[#38caff]" placeholder="Manzilni kiriting"/>
            </label>
            <label htmlFor="rasm" className="mb-[15px] inline-block w-full">
              <p className="mb-[10px]">Markaz rasmi <span className="text-[red]">*</span></p>
              <ImageUpload onFileSelect={handleFileSelect} />
            </label>
            <button className="rounded-[7px] w-full p-[10px] bg-[#451774] text-[#fff] cursor-pointer">Markaz qo'shish</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateCenterForm