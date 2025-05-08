import { Navbar } from "@/components/core/Navbar";

function Header() {
	return (
		<header className="sticky top-0 h-0 inset-0 z-50 md:z-500">
			<Navbar />
		</header>
	);
}

export default Header;
