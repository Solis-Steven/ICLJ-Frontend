import React from 'react'
import TemplateUser from './components/TemplateUser'

const UserList = ({activitie, users}) => {
  return (
    <section className="shadow-lg p-5">
        {
            users.length 
            ? (
                users.map(user => (
                    <TemplateUser 
                        key={user._id}
                        user={user}
                    />
                ))
            )
            : (
                activitie.assistance == false
                ? (
                    <p className="text-center">Para esta actividad se desactivo el registro online</p>
                )
                : (
                    <p className="text-center">A&uacute;n no hay usuarios registrados en esta actividad</p>
                )
            )
        }
    </section>
  )
}
export default UserList
