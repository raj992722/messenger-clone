'use client'

// import { User } from "@prisma/client";
import ReactSelect from  'react-select'

interface SelectProps{
    disabled?:boolean,
    label:string,
    options:Record<string,any>[],
    value?:Record<string,any>,
    onChange:(value:Record<string,any>)=>void
}
const Select:React.FC<SelectProps> = ({
    disabled,
    label,
    options,
    value,
    onChange
})=>{

return (
    <div className="z-[100]">
        <label htmlFor={label} className="block text-sm font-medium text-gray-900  ">{label}</label>
        <div className="mt-2">
            <ReactSelect 
                isDisabled={disabled}
                value={value}
                onChange={onChange}
                isMulti
                options={options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal:(base)=>({
                        ...base,
                        zIndex:9999
                    })
                }}
                classNames={{
                    control:() => 'text-sm'
                }}
            />

        </div>
    </div>
)
}

export default Select;