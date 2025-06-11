import { Select } from "antd"

function LanguageChanger() {
  return (
    <Select
        dropdownStyle={{
            background: 'white',
            boxShadow: 'none',
            borderRadius: 0,
        }}
        defaultValue="en"
        style={{ width: 70 , background: "transparent"}}
        options={[
            { value: 'en', label: 'en' },
            { value: 'uz', label: 'uz' },
            { value: 'ru', label: 'ru' },
        ]}
    />
  )
}

export default LanguageChanger