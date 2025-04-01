interface HtmlEmbedProps {
  value: {
    html: string
  }
}

const HtmlEmbed = ({ value }: HtmlEmbedProps) => {
  return <div dangerouslySetInnerHTML={{ __html: value.html }} />
}

export default HtmlEmbed
