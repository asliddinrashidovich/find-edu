import { useDispatch } from 'react-redux';
import { setLanguage } from '../../reducers/languageSlice';
import { Select } from 'antd';

function LanguageChanger() {
  const dispatch = useDispatch();

  const handleLanguageChange = (e: string) => {
    dispatch(setLanguage(e));
  };

  return (
    <div>
        <Select
            dropdownStyle={{
                background: 'white',
                boxShadow: 'none',
                borderRadius: 0,
            }}
            defaultValue="en"
            style={{ width: 60 }}
            onChange={handleLanguageChange}
            options={[
                { value: 'en', label: 'en' },
                { value: 'uz', label: 'uz' },
            ]}
        />
    </div>
  );
}

export default LanguageChanger;