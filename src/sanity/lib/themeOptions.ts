// This is the master file that controls theme-wide options for blocks and pages.
// It is used in the blockOptions and pageOptions objects in the schemas directory.

interface BackgroundOption {
  title: string
  value: string
}

interface PaddingOption {
  title: string
  top: `${string} lg:${string}` | ''
  bottom: `${string} lg:${string}` | ''
}

export const colorOptions: BackgroundOption[] = [
  { title: 'White', value: 'white' },
  { title: 'Primary', value: 'primary' },
]

export const paddingOptions: PaddingOption[] = [
  { title: 'None', top: '', bottom: '' },
  { title: 'XSmall', top: 'pt-2 lg:pt-4', bottom: 'pb-2 lg:pb-4' },
  { title: 'Small', top: 'pt-6 lg:pt-12', bottom: 'pb-6 lg:pb-12' },
  { title: 'Medium', top: 'pt-8 lg:pt-15', bottom: 'pb-8 lg:pb-15' },
  { title: 'Large', top: 'pt-16 lg:pt-30', bottom: 'pb-16 lg:pb-30' },
  { title: 'XL', top: 'pt-28 lg:pt-36', bottom: 'pb-28 lg:pb-36' },
  { title: 'XXL', top: 'pt-40 lg:pt-52', bottom: 'pb-40 lg:pb-52' },
]
