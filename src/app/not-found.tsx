import Logo from "@/components/common/Logo"
import SanityLink from "@/components/common/SanityLink"
import { Button } from "@/components/ui/button"

function NotFoundPage() {
	return (
    <div className="w-full min-h-screen flex flex-col items-center text-center justify-center bg-black text-white">
      <Logo variant="secondary" className="w-20 h-10" />
      <div className="my-16">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="">Page not found</p>
      </div>
      <Button asChild>
        <SanityLink link="/">Back to home</SanityLink>
      </Button>
    </div>
  )
}

export default NotFoundPage
