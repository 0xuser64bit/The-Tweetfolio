import React, { useState } from "react";

const Error = () => {
    const [showSarcasticMessage, setShowSarcasticMessage] = useState(false);

    const handleContactSupport = () => {
        setShowSarcasticMessage(true);
        setTimeout(() => {
            setShowSarcasticMessage(false);
        }, 7000);
    };

    return (
        <div className="text-white h-screen flex items-center justify-center w-1/2 mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">
                    Uh-oh, looks like we have a problem!
                </h1>
                <p className="text-lg mb-4">
                    Well, well, well, if it isn't the universe conspiring
                    against you again. I'm shocked, I tell you,{" "}
                    <em>shocked!</em>
                </p>
                <p className="text-lg mb-4">
                    Have you tried turning it off and on again? Or maybe
                    offering a few candies to the coding gremlins hiding in your
                    computer? They do love a good sugar rush, you know.
                </p>
                <p className="text-lg mb-4">
                    If that doesn't work, feel free to reach out to our team of
                    website wizards. I'm sure they'll be <em>thrilled</em> to
                    take a look and see what's going on. After all, what could
                    be more exciting than troubleshooting your technical
                    difficulties?
                </p>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleContactSupport}
                >
                    Call in the Reinforcements
                </button>
                {showSarcasticMessage && (
                    <div className="mt-4 p-4 bg-red-500 rounded-lg animate-bounce">
                        <p className="font-bold">
                            Ah, so you've decided to summon the mighty website
                            wizards, have you? Well, buckle up, my friend,
                            because you're in for a wild ride.
                        </p>
                        <p>
                            I'm sure they'll <em>drop everything</em> to come to
                            your rescue. After all, what could possibly be more
                            important than your little technical hiccup? Go on,
                            hit that button again. I double-dare you.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Error;
