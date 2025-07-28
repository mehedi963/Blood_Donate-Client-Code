import Lottie from 'lottie-react';
import React from 'react';
import lottie from '../../assets/lotties/blood donner.json'

const HeroSection = () => {
    return (
        <section className="dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl">Blood 
                       Donation <span className="dark:text-violet-600"> Stop the drop</span>
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Blood levels can change quickly. Check the levels in your state and help keep Australia’s supply steady by booking a donation.
                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <button className='btn btn-secondary' type="button">Check The Level</button>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <Lottie animationData={lottie} loop={true}></Lottie>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;