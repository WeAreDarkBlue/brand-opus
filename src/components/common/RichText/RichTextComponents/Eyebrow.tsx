interface EyebrowProps {
  children?: React.ReactNode
}

const Eyebrow = ({ children }: EyebrowProps) => {
  return (
    <span className="text-sm-m md:text-sm opacity-50 flex mb-2 mt-20">
      {children}
    </span>
  )
}

export default Eyebrow
