import Image from "next/image";
import { Bot } from "../home/chatbot/bot";
const About = () => {
    
    return(
        <>
            <section>
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative"
                />

                <div className="z-10 absolute top-40 left-10 ">
                    <p className="text-white text-lg">Casa de Luz Jireh</p>
                    <h1 className="text-white text-4xl font-bold">Donde conoces a Dios</h1>
                </div>
            </section>
        
            <article className="py-32 px-10 md:px-32 lg:px-52 2xl:px-72">
                <h3 className="text-primary text-lg">Sobre Nosotros</h3>
                <h2 className="text-2xl">¡Bienvenido a Casa
                de Luz Jireh!</h2>
                <p className="mt-4">Somos una comunidad vibrante y acogedora con sede principal en Cedral, Ciudad Quesada. En Casa de Luz Jireh, creemos en la transformación de vidas a través de la adoración y la conexión espiritual. Nuestra iglesia es un lugar donde las personas encuentran esperanza, propósito y amor.</p>

                <p className="mt-4">Somos una comunidad vibrante y acogedora con sede principal en Cedral, Ciudad Quesada. En Casa de Luz Jireh, creemos en la transformación de vidas a través de la adoración y la conexión espiritual. Nuestra iglesia es un lugar donde las personas encuentran esperanza, propósito y amor.</p>

                <p className="mt-4">Aspiramos a ser un refugio espiritual donde cada persona, sin importar su historia o situación, pueda experimentar el poder transformador de la gracia divina. Buscamos ser un testimonio vivo de la obra redentora de Jesucristo y ser agentes de cambio en nuestra sociedad.</p>
                
                <p className="mt-4">En Casa de Luz Jireh, ofrecemos una variedad de servicios y actividades diseñados para nutrir el crecimiento espiritual y fortalecer la comunidad. Desde apasionantes servicios de adoración hasta eventos y programas para todas las edades, hay algo para cada miembro de la familia.</p>

                <p className="mt-4">Estamos encantados de dar la bienvenida a nuevos miembros a nuestra familia espiritual. Si estás buscando un lugar donde puedas crecer espiritualmente, encontrar apoyo y hacer amigos duraderos, ¡Casa de Luz Jireh es el lugar para ti!</p>
                
                <section className="mt-20 flex flex-col-reverse md:flex-row gap-4 items-center">
                    <Image 
                        src="/pastor.webp"
                        alt="logo"
                        width={200}
                        height={200}
                    />
                    <article className="">
                        <h3 className="text-lg font-bold">Conozca a nuestro Pastor</h3>
                        <p className="mt-4">Nos sentimos privilegiados de contar con el liderazgo inspirador del Pastor Asdrubal Lazo en Casa de Luz Jireh. Con una profunda dedicación a su llamado espiritual y un corazón apasionado por el servicio, el Pastor Lazo ha desempeñado un papel fundamental en el crecimiento y la dirección de nuestra comunidad.</p>
                        <p className="mt-4">El Pastor Asdrubal Lazo trae consigo una visión clara y comprometida para Casa de Luz Jireh. Su enfoque centrado en Cristo se refleja en su enseñanza y liderazgo, guiando a nuestra congregación hacia una comprensión más profunda de la fe, el amor y la gracia divina.</p>
                    </article>
                </section>
            </article>
            <Bot />
        </>
    );
}

export default About;