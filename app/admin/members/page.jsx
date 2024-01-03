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
import { Search } from "@/components/Search";

const page = () => {
    const [originalMembers, setOriginalMembers] = useState([]);
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
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getAllMembers({ page });
                setOriginalMembers((prevMembers) => [...prevMembers, ...data]);
                setMembers((prevMembers) => [...prevMembers, ...data]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
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
                        memberState._id === userSaved._id ? userSaved : memberState
                    );
                    setMembers(updatedMembers);
                    setOriginalMembers(updatedMembers);
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

    const handleSearch = (searchValue) => {

        if(searchValue === "") {
            setMembers(originalMembers);
            return;
        }

        const filteredMembers = originalMembers.filter(member =>
            member.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setMembers(filteredMembers);
    };

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Miembros</h1>

            <section className="flex gap-3 items-center">
                <AddButton
                    name="Agregar Miembro"
                    addElement={() => setShowModal(true)}
                />

                <Search 
                    placeholder="Buscar Miembro"
                    onChange={handleSearch}
                />
            </section>

            <section className="shadow-lg p-5 mt-5">
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

                {members?.map((member) => (
                    <Accordion
                        key={member._id}
                        member={member}
                        setMembers={setMembers}
                        handleEdit={handleEdit}
                    />
                ))}
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