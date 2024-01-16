import Image from "next/image";
export const InfoSection = () => {
  return (
<section className="flex flex-col gap-3 items-center justify-center w-full h-full bg-secondary">
  <Image 
    src="/ruta.png"
    alt="logo"
    width={200}
    height={200}
    className="max-w-full" // Ajusta el ancho máximo de la imagen para que sea responsive
  />
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-primary font-serif text-center">
    Qué es una casa 
  </h1>
  <h1 className="text-xl sm:text-2xl md:text-4xl text-center font-semibold text-tertiary uppercase font-serif">
    de Consolidación?
  </h1>
  <div className="mx-auto max-w-[1000px] mt-4 mb-8">
    <p className="text-tertiary text-center p-4 font-sans italic text-base md:text-xl lg:text-2xl xl:text-4xl">
      Una casa de consolidación representa un espacio urbano donde los nuevos
      miembros de la iglesia se reúnen periódicamente con el propósito de
      fortalecer sus fundamentos espirituales, compartir inquietudes, adquirir
      conocimientos acerca de la fe cristiana y avanzar en su desarrollo
      personal. Este entorno proporciona una experiencia marcada por la
      orientación pastoral, el apoyo mutuo y la construcción de relaciones
      sólidas, comparable a la dedicación experimentada en la iglesia local.
    </p>
  </div>
</section>


  );
};
