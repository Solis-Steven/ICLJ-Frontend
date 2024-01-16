import React, { useEffect, useState } from 'react'
import TemplateUser from './components/TemplateUser'

const UserList = ({activitie, users}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },220);
    }, []);

    const sortedUsers = [...users].sort((a, b) => {
        const aAssisted = a.assisted || false;
        const bAssisted = b.assisted || false;
        return bAssisted - aAssisted;
    });

    return (
        <div className="shadow-lg p-5 mt-10">
            {
                    isLoading && (
                        <div className="flex justify-center">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )
                }

                {
                    sortedUsers.length 
                    ? (
                        sortedUsers.map(user => (
                            <TemplateUser 
                                key={user._id}
                                user={user}
                                activitie={activitie}
                            />
                        ))
                    )
                    : !isLoading && (
                        activitie.assistance === false
                        ? (
                            <p className="text-center">Para esta actividad se desactivo el registro online</p>
                        )
                        : (
                            <p className="text-center">A&uacute;n no hay usuarios registrados en esta actividad</p>
                        )
                        )
                }
            </div>
    )
}
export default UserList
