"use client"

import { useEffect, useState } from "react";
import { Accordion } from "./components/Accordion";
import { addMember, getAllMembers, updateMember } from "./services/member.services";
import { AddButton } from "@/components/AddButton";
import { AddMemberModal } from "./components/AddMemberModal";
import { notify } from "@/utilities/notify";
import { notifyError } from "@/utilities/notifyError";
import { compileRegisterTemplate, sendMail } from "@/lib/mail";
import { notifySuccess } from "@/utilities/notifySuccess";

const page = () => {
    const [members, setMembers] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        role: "",
        password: "",
    });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getAllMembers();
                setMembers(membersData);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);

    const handleInputChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleEdit = (member) => {
        const {
            _id, name, phone, email, address,
            role, password } = member;
        setMemberId(_id);
        setFormData({
            name,
            phone,
            email,
            address,
            role,
            password,
        });
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false);
        setMemberId("");
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            role: "",
            password: "",
        });
    }

    const send = async (user) => {
        const emailData = {
            to: user.email,
            name: user.name,
            subject: "Confirmación de tu cuenta",
            body: await compileRegisterTemplate(user.name, user.token)
        }

        await sendMail(emailData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (memberId !== "") {
            try {
                const data = await updateMember(memberId, formData);

                if (data) {
                    const { msg, userSaved } = data;

                    const updatedMembers = members?.map(memberState =>
                        memberState._id  === userSaved._id ? userSaved : memberState
                    );
                    setMembers(updatedMembers);
                    setShowModal(false);
                    setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        role: "",
                        password: "",
                    });
                    notifySuccess(msg);
                }
            } catch (error) {
                console.log({ error })
            }

            return
        }

        if ([formData.email, formData.password,
        formData.name, formData.address,
        formData.phone, formData.role].includes("")) {
            notifyError("Todos los campos son obligatorios");

            return;
        }

        try {
            const data = await addMember(formData);

            send(data.user)
            notify("Revisa tu correo para confirmar tu cuenta");
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
                role: "",
                password: "",
            });

        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Miembros</h1>
            <AddButton
                name="Agregar Miembro"
                addElement={() => setShowModal(true)}
            />

            <section className="shadow-lg p-5 mt-5">
                {
                    members?.map(member => (
                        <Accordion
                            key={member._id}
                            member={member}
                            setMembers={setMembers}
                            handleEdit={handleEdit}
                        />
                    ))
                }
            </section>

            <AddMemberModal
                memberId={memberId}
                showModal={showModal}
                closeModal={onClose}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                formData={formData}
            />
        </section>
    );
}

export default page;