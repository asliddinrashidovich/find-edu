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
    // "user": {
    //     "id": 4,
    //     "firstName": "Farangiz",
    //     "lastName": "Khurramova",
    //     "email": "kh.farangiz2005@gmail.com",
    //     "phone": "998000000000",
    //     "role": "CEO",
    //     "image": "1745650309433.jpg",
    //     "isActive": true,
    //     "createdAt": "2025-03-14T19:14:32.000Z",
    //     "updatedAt": "2025-04-26T06:51:49.000Z"
    // },
    // "majors": [
    //     {
    //         "id": 18,
    //         "name": "Front-End Development",
    //         "image": "linke",
    //         "fieldId": 1,
    //         "subjectId": null,
    //         "majoritems": {
    //             "id": 274,
    //             "majorId": 18,
    //             "centerId": 151,
    //             "createdAt": "2025-04-25T18:42:00.000Z",
    //             "updatedAt": "2025-04-25T18:42:00.000Z"
    //         }
    //     }
    // ],
    // "region": {
    //     "id": 1,
    //     "name": "Toshkent"
    // },
    // "filials": [
    //     {
    //         "id": 85,
    //         "name": "ALBISON - Toshkent Main branch",
    //         "phone": "+998901122714",
    //         "regionId": 1,
    //         "centerId": 151,
    //         "address": "Amityda edi",
    //         "image": "1745606520328.png",
    //         "createdAt": "2025-04-25T18:42:01.000Z",
    //         "updatedAt": "2025-04-25T19:20:26.000Z",
    //         "region": {
    //             "id": 1,
    //             "name": "Toshkent"
    //         }
    //     }
    // ],
    // "comments": [
    //     {
    //         "id": 71,
    //         "text": "I studied at this learning center and gained frontend skills from qualified instructors. Now, I'm applying that knowledge in real projects. Hoping to put all the skills I’ve learned to good use someday… or at least remember of them when I need to 😅",
    //         "star": 5,
    //         "userId": 155,
    //         "centerId": 151,
    //         "createdAt": "2025-04-25T18:43:48.000Z",
    //         "updatedAt": "2025-04-26T13:58:43.000Z",
    //         "user": {
    //             "id": 155,
    //             "firstName": "Farangiz",
    //             "lastName": "Kh",
    //             "email": "aluwed.official@inbox.ru",
    //             "phone": "+998999966409",
    //             "role": "CEO",
    //             "image": "1745218917497.jpg",
    //             "isActive": true,
    //             "createdAt": "2025-04-21T07:01:57.000Z",
    //             "updatedAt": "2025-04-26T13:58:59.000Z"
    //         }
    //     },
    //     {
    //         "id": 72,
    //         "text": "The first step to the IT world began with this educational center and experienced teachers. After successfully completing the course, I chose IT not only as a field but as my future career. Thank you all for everything! 😊",
    //         "star": 5,
    //         "userId": 169,
    //         "centerId": 151,
    //         "createdAt": "2025-04-25T18:57:13.000Z",
    //         "updatedAt": "2025-04-25T18:57:13.000Z",
    //         "user": {
    //             "id": 169,
    //             "firstName": "Mashkura",
    //             "lastName": "Mirzayoqubova",
    //             "email": "jabete1390@f5url.com",
    //             "phone": "+998931404155",
    //             "role": "CEO",
    //             "image": "1745490050114.png",
    //             "isActive": true,
    //             "createdAt": "2025-04-24T10:20:50.000Z",
    //             "updatedAt": "2025-04-24T10:21:30.000Z"
    //         }
    //     },
    //     {
    //         "id": 73,
    //         "text": "its really cool place to study and do projects, as our deadline is missing all the time, unfortunately no more Amity lessons, but still we are big family. thanks to my teachers , i found my way in IT",
    //         "star": 5,
    //         "userId": 160,
    //         "centerId": 151,
    //         "createdAt": "2025-04-25T19:33:56.000Z",
    //         "updatedAt": "2025-04-25T19:33:56.000Z",
    //         "user": {
    //             "id": 160,
    //             "firstName": "Shokhsanam",
    //             "lastName": "Karimova",
    //             "email": "shokhsanam18@gmail.com",
    //             "phone": "+998997978899",
    //             "role": "CEO",
    //             "image": "1745252621915.jpg",
    //             "isActive": true,
    //             "createdAt": "2025-04-21T16:23:42.000Z",
    //             "updatedAt": "2025-04-21T16:24:01.000Z"
    //         }
    //     },
    //     {
    //         "id": 74,
    //         "text": "Glad to see the center here. We have all started learning front end and it was actually very good. Would suggest to register if you would like to learn frontend",
    //         "star": 5,
    //         "userId": 132,
    //         "centerId": 151,
    //         "createdAt": "2025-04-25T19:34:16.000Z",
    //         "updatedAt": "2025-04-25T19:48:21.000Z",
    //         "user": {
    //             "id": 132,
    //             "firstName": "Inobat",
    //             "lastName": "Mirakhmedova",
    //             "email": "operations@nobelhub.com",
    //             "phone": "+998998077874",
    //             "role": "USER",
    //             "image": "1744137908814.png",
    //             "isActive": true,
    //             "createdAt": "2025-04-08T18:45:09.000Z",
    //             "updatedAt": "2025-04-08T18:46:02.000Z"
    //         }
    //     }
    // ],
    // "likes": [
    //     {
    //         "id": 188,
    //         "userId": 132,
    //         "centerId": 151,
    //         "createdAt": "2025-04-25T19:36:00.000Z",
    //         "updatedAt": "2025-04-25T19:36:00.000Z"
    //     },
    //     {
    //         "id": 196,
    //         "userId": 176,
    //         "centerId": 151,
    //         "createdAt": "2025-04-29T11:27:20.000Z",
    //         "updatedAt": "2025-04-29T11:27:20.000Z"
    //     }
    // ],
    // "receptions": [
    //     {
    //         "id": 35,
    //         "userId": 172,
    //         "centerId": 151,
    //         "filialId": 85,
    //         "majorId": 18,
    //         "visitDate": "2025-04-30T18:00:00.000Z",
    //         "status": "PENDING",
    //         "createdAt": "2025-04-25T19:39:18.000Z",
    //         "updatedAt": "2025-04-25T19:39:18.000Z"
    //     },
    //     {
    //         "id": 41,
    //         "userId": 176,
    //         "centerId": 151,
    //         "filialId": 85,
    //         "majorId": 18,
    //         "visitDate": "2025-05-10T18:00:00.000Z",
    //         "status": "PENDING",
    //         "createdAt": "2025-04-29T11:29:11.000Z",
    //         "updatedAt": "2025-04-29T11:29:11.000Z"
    //     },
    //     {
    //         "id": 42,
    //         "userId": 4,
    //         "centerId": 151,
    //         "filialId": 85,
    //         "majorId": 18,
    //         "visitDate": "2025-05-01T12:00:00.000Z",
    //         "status": "PENDING",
    //         "createdAt": "2025-04-30T06:56:38.000Z",
    //         "updatedAt": "2025-04-30T06:56:38.000Z"
    //     }
    // ]
}

export interface ICategory {
    id: number
    name: string
    image: string
}

export interface UserType {
    firstName: string
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