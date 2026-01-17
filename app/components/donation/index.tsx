"use client"
import React, { useState } from 'react'

const Index = () => {
    const [customAmount, setCustomAmount] = useState("");
    const [email, setEmail] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY;

    const handlePaystack = (amount: number) => {
        // Validate public key
        if (!paystackPublicKey) {
            alert("Payment configuration error. Please contact the administrator.");
            console.error("Paystack public key is not configured");
            return;
        }

        // Validate amount
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        // Validate email
        if (!email || !email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        const handler = (window as any).PaystackPop.setup({
            key: paystackPublicKey,
            email: email,
            amount: amount * 100, // NGN to kobo conversion
            currency: "NGN",
            ref: `adenike-iftar-${Date.now()}`,
            onClose: () => {
                // User closed the payment modal
                console.log("Payment window closed");
            },
            callback: (response: any) => {
                // Payment successful
                setSuccessMessage(`Donation successful! May Allah accept your charity and multiply it. Reference: ${response.reference}`);
                setCustomAmount("");
                setShowCustomInput(false);

                // Hide success message after 10 seconds
                setTimeout(() => setSuccessMessage(""), 10000);
            },
        });

        handler.openIframe();
    };

    const donationOptions = [
        { amount: 500, label: "Feed 1 soul → ₦500" },
        { amount: 2500, label: "Feed 5 souls → ₦2,500" },
        { amount: 100000, label: "Sponsor an entire day → ₦100,000" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-4 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6">

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 leading-tight">
                    Feed a Fasting Person This Ramadan!🕌
                </h1>

                {/* Quran Verse */}
                <blockquote className="border-l-4 border-[#1D4ED9] bg-blue-50 pl-6 pr-4 py-3 mb-7 rounded-r-lg">
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                        Those who spend their wealth [in Allah's way] by night and by day, secretly and publicly - they will have their reward with their Lord. And no fear will there be concerning them, nor will they grieve.
                    </p>
                    <p className="text-sm text-gray-700 mt-2"><strong>→ Quran 2:274</strong></p>
                </blockquote>

                {/* Description */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 mb-8">
                    <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                        Your donation provides Iftar meals for fasting Muslims at Adenike Community Mosque throughout Ramadan.
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-green-800 text-center text-sm sm:text-base">
                            {successMessage}
                        </p>
                    </div>
                )}

                {/* Email Input */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="donor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                        required
                    />
                </div>

                {/* Instruction */}
                <p className="text-base text-gray-500 text-center mb-3">
                    Choose an option below to donate instantly:
                </p>

                {/* Donation Buttons */}
                <div className="space-y-4 mb-10">
                    {donationOptions.map(({ amount, label }) => (
                        <button
                            key={amount}
                            onClick={() => handlePaystack(amount)}
                            className="w-full bg-[#1D4ED8] hover:bg-[#1e40af] active:bg-[#1e3a8a] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-150 active:scale-[0.98]"
                        >
                            {label}
                        </button>
                    ))}

                    {/* Custom Amount Button */}
                    <button
                        onClick={() => setShowCustomInput(!showCustomInput)}
                        className="w-full bg-white border-2 border-[#1D4ED8] text-[#1D4ED8] hover:bg-blue-50 active:bg-[#1D4ED8] active:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-150 active:scale-[0.98]"
                    >
                        Donate any amount
                    </button>

                    {/* Custom Amount Input */}
                    {showCustomInput && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                            <input
                                type="number"
                                placeholder="Enter custom amount (₦)"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                                min="1"
                            />
                            <button
                                onClick={() => handlePaystack(Number(customAmount))}
                                className="w-full bg-[#1D4ED8] hover:bg-[#1e40af] active:bg-[#1e3a8a] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-150 active:scale-[0.98]"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    )}
                </div>

                {/* WhatsApp group button */}
                <div className="text-center mb-6">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-150 active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Join our WhatsApp group
                    </a>
                </div>
            </div>

            {/* Footer - Authority section */}
            <footer className="max-w-3xl mx-auto mt-3 py-2 px-4 border-t border-gray-200">
                <div className="text-center space-y-1">
                    <p className="text-xs text-gray-500 font-semibold">Under the authority of:</p>
                    <p className="text-xs text-gray-600">Imam Adenike,</p>
                    <p className="text-xs text-gray-600">Adenike Community Mosque,</p>
                    <p className="text-xs text-gray-600">Adenike Lautech, Ogbomoso, Oyo state.</p>
                </div>
            </footer>
        </div>
    )
}

export default Index