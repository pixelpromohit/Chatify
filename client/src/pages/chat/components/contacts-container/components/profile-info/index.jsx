import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import { getColor } from "@/lib/utils";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { FiEdit2 } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoLogOut, IoPowerSharp } from 'react-icons/io5';
import { apiClient } from '@/lib/api-client';
import { LOGOUT_ROUTE } from '@/utils/constants';

const ProfileInfo = () => {
    const {userInfo, setUserInfo} = useAppStore()
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,
                {},
                {withCredentials:true},

            )

            if (response.status === 200) {
                navigate("/auth")
                setUserInfo(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] '>

            <div className="flex gap-3 items-center justify-center ">
                <div className='w-12 h-12 relative '>
                <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full"
              />
            ) : (
              <div
                className={`uppercase w-12 h-12 text-lg   border-[1px] ${getColor(
                  userInfo.color
                )} flex items-center justify-center rounded-full`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
                </div>
                <div>
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                    }
                </div>
            </div>
            <div className="flex gap-5 ">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2 className='text-purple-500 text-xl font-medium'
                        onClick={() => navigate('/profile')}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1c1b1e] border-none text-white '>
                        Edit Profile
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp className='text-red-500 text-xl font-medium'
                        onClick={logOut}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1c1b1e] border-none text-white '>
                        Logout
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo
