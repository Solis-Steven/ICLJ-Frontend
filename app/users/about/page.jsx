import Image from "next/image";

const About = () => {
    
    return(
        <article className="py-32 px-10 md:px-32 lg:px-52 2xl:px-72">
            <h3 className="text-primary text-lg">Sobre Nosotros</h3>
            <h2 className="text-2xl">¡Bienvenido a Casa
            de Luz Jireh!</h2>
            <p className="mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore recusandae asperiores sint voluptatem commodi dolores esse impedit voluptatibus debitis, perferendis, magni, cumque totam nihil eveniet inventore! Delectus debitis aliquam fugiat.</p>

            <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum doloremque iusto ipsum autem eveniet culpa facilis, officia adipisci veniam non. Molestias officia dolor, aspernatur sint unde quis quibusdam quae.</p>

            <p className="mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore alias similique ab nostrum saepe vitae animi optio consectetur architecto ipsum iusto, quos eligendi sint accusantium nesciunt, quam corrupti ea delectus?</p>

            <section className="mt-20 flex flex-col md:flex-row gap-4 items-center">
                <Image 
                    src="/pastor.webp"
                    alt="logo"
                    width={200}
                    height={200}
                />
                <article className="">
                    <h3 className="text-lg font-bold">Conozca a nuestro Pastor</h3>
                    <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta nobis minus, amet laborum illo veritatis totam expedita delectus rem necessitatibus saepe! Nulla, sed officiis accusamus nihil eligendi ea dolorum.</p>
                    <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta nobis minus, amet laborum illo veritatis totam expedita delectus rem necessitatibus saepe! Nulla, sed officiis accusamus nihil eligendi ea dolorum.</p>
                </article>
            </section>
        </article>
    );
}

export default About;