interface LocalesType {
  title: string
  value: string
  title_short?: string
}

const locales: LocalesType[] = [
  { title: 'Global', value: 'global' },
  { title: 'UK', value: 'gb' },
  { title: 'US', value: 'us' },
  { title: 'Canada', value: 'ca' },
  { title: 'Germany', value: 'de' },
  {
    title: 'Nordics (Sweden, Finland, Norway, Denmark)',
    title_short: 'Nordics',
    value: 'nordics',
  },
  { title: 'Turkey', value: 'tr' },
  {
    title: 'APAC (inc Singapore & Australia)',
    title_short: 'APAC',
    value: 'apac',
  },
  { title: 'Spain', value: 'es' },
  { title: 'Italy', value: 'it' },
  { title: 'France', value: 'fr' },
]

export default locales
