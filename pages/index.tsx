import dynamic from 'next/dynamic'

const Maps = dynamic(() => import('~/src/features/location/Maps'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <div>
      <Maps />
    </div>
  )
}
