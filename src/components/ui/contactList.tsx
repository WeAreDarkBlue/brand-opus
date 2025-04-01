export interface ContactListProps {
  contacts: {
    _key: string
    title?: string
    email?: string
  }[]
  title: string
  className: string
}

const ContactList = ({ contacts, title, className }: ContactListProps) => {
  return (
    <div className={className}>
      <span className='block mb-6 opacity-50 uppercase text-sm'>{title}</span>
      <ul className='flex flex-col'>
        {contacts.map((contact, i) => (
          <li key={contact?._key} className="mb-4 last:mb-2 text-lg">
            { contact?.title && <p className='!m-0'>{contact.title}</p> }
            { contact?.email && <a href={`mailto:${contact.email}`} className='!m-0 text-pink-300 hover:text-pink-700'>{contact.email}</a> }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactList;
