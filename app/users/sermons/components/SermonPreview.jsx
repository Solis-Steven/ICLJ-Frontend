import {formatDate} from "@/utilities/formatDate"
import { useRouter } from "next/navigation";

export const SermonPreview = ({sermon}) => {
    const { dayOfWeek, dayOfMonth, month, year } = formatDate(sermon.date);

    const router = useRouter();

    return (
        <article 
            onClick={() => router.push(`/users/sermons/${sermon._id}`)}
            className="flex gap-3 mt-10 hover:bg-white hover:shadow-md p-4 hover:rounded-md cursor-pointer">
            <div className="flex items-center flex-col"> 
                <p className="text-primary">{dayOfWeek}</p>
                <div className="bg-primary rounded-full flex items-center justify-center text-white w-8 h-8">
                    <p className="text-center font-bold text-lg">{dayOfMonth}</p>
                </div>

            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg text-tertiary font-bold">{sermon.title}</h2>

                    <h3 className="text-sm text-gray-400">{month} / {year}</h3>
                </div>

                <div className="flex items-center">
                    <p className="text-tertiary mt-2 max-w-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nostrum ullam doloremque est quidem repellendus perspiciatis voluptatum ipsam ratione eos, inventore adipisci suscipit dolorum maxime corrupti sint fugiat! Optio, ut.
                    </p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                </div>
            </div>
        </article>
    );
};
