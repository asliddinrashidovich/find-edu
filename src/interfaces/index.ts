export interface Iproduct {
    id: number
    name: string
    phone: string
    regionId: number
    address: string
    seoId: number
    image: string
    createdAt: string
    updatedAt: string
    filials: filalType[]
    comments: IComment[]
    likes: likedProductType[]
    majors: IMajor[]
}

export interface likedProductType {
    centerId: number
    createdAt: string
    id: number
    updatedAt: string
    userId: number
}

export interface reseption {
    center: Iproduct
    centerId: number
    createdAt: string
    filial: filalType
    filialId: number
    id: number
    major: IMajor
    majorId: number
    status: string
    updatedAt: string
    userId: number
    visitDate: string
}

export interface ICategory {
    id: number
    name: string
    image: string
}

export interface UserType {
    createdAt: string
    email: string
    firstName: string
    id: number
    image: string
    isActive: boolean
    likes: likedProductType[]
    receptions: reseption[]
    lastName: string
    phone: string
    role: string
    updatedAt: string
}


export interface IResources {
    id: number
    name: string
    image: string
    categoryId: number
    description: string
    updatedAt: string
    user: UserType
}
export interface IMydata {
    createdAt: string
    email: string
    firstName: string
    id: number
    image: string
    isActive: boolean
    lastName: string
    password: string
    phone: string
    role: string
}
export interface CenterType {
    data: Iproduct
}

export interface MydataType {
    myData: IMydata
}

export interface filalType {
    address: string
    centerId: number
    createdAt: string
    id: number
    image: string
    name: string
    phone: string
    region: {
        id: number
        name: string
    }
    regionId: number
    updatedAt: string
}

export interface IComment {
    centerId: number
    createdAt: string
    id: number
    star: number
    text: string
    updatedAt: string
    user: UserType
    userId: number
}

export interface IMajor {
    centers: Iproduct[]
    id: number
    image: string
    name: string
    subjectId: number
}