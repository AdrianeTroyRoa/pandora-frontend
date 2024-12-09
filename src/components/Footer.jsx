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
                            <a href="/contact us" className="hover:underline">Inquire Now</a>
                        </li>
                        <li>
                            <a href="/products" className="hover:underline">View Products</a>
                        </li>
                    </ul>

                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">OUR HISTORY</div>
                        </li>
                        <li>
                            <a href="/about us" className="hover:underline">Background</a>
                        </li>
                        <li>
                            <a href="/about us" className="hover:underline">Manufacturing</a>
                        </li>
                    </ul>
                    
                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">CUSTOMER SERVICE</div>
                        </li>
                        <li>
                            <a href="/contact us" className="hover:underline">Call Us</a>
                        </li>
                        <li>
                            <a href="/faqs" className="hover:underline">FaQs</a>
                        </li>
                    </ul>
                    
                    <ul className="flex flex-col justify-between text-center text-sm text-blue-950 h-24 w-48 sm:mb-4">
                        <li>
                            <div className="font-bold">TERMS OF USE</div>
                        </li>
                        <li>
                            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/cookie-policy" className="hover:underline">Cookie Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full mt-8 text-center text-blue-950 text-sm">© 2024 Mindanao King 8 Plastics. All Rights Reserved.</div>
        </footer>
    );
}

export default Footer;
