
import Lottie from "react-lottie"
import animationData from "../assets/Animation.json";

const EmptyChatContainer = () =>{

    const animationDefaultOptions = {
        loop:true,
        autoplay: true,
        animationData,
    }
    return (
        <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
            <Lottie 
                isClickToPauseDisabled={true}
                height={250}
                width={250}
                options={animationDefaultOptions}
            />
            <div className="text-opacity-50 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration 300 text-center">
                <h3 className="poppins-medium">
                    Hi<span className="text-blue-500 animate-pulse">!</span> Welcome to 
                    <span className="text-blue-500 animate-pulse"> Momento </span>
                    Chat App<span className="text-blue-500 animate-pulse">.</span>
                </h3>
            </div>
        </div>
    )
}

export default EmptyChatContainer;