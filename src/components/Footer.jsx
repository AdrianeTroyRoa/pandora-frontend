import { A } from "@solidjs/router";

function Footer() {
    return (
        <footer className="bg-zinc-300 py-8 w-full relative">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex justify-between">
                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">PRODUCTS</div>
                        </li>
                        <li>
                            <A href="/contact us" className="hover:underline">Inquire Now</A>
                        </li>
                        <li>
                            <A href="/products" className="hover:underline">View Products</A>
                        </li>
                    </ul>

                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">OUR HISTORY</div>
                        </li>
                        <li>
                            <A href="/about us" className="hover:underline">Background</A>
                        </li>
                        <li>
                            <A href="/about us" className="hover:underline">Manufacturing</A>
                        </li>
                    </ul>
                    
                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">CUSTOMER SERVICE</div>
                        </li>
                        <li>
                            <A href="/contact us" className="hover:underline">Call Us</A>
                        </li>
                        <li>
                            <A href="/faqs" className="hover:underline">FAQs</A>
                        </li>
                    </ul>
                    
                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">TERMS OF USE</div>
                        </li>
                        <li>
                            <A href="/privacy-policy" className="hover:underline">Privacy Policy</A>
                        </li>
                        <li>
                            <A href="/cookie-policy" className="hover:underline">Cookie Policy</A>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full mt-8 text-center text-blue-950 text-sm">© 2024 Mindanao King 8 Plastics. All Rights Reserved.</div>
        </footer>
    );
}

export default Footer;
