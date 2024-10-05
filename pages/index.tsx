import dynamic from 'next/dynamic'
import Head from 'next/head'

const Maps = dynamic(() => import('~/src/features/location/Maps'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <section className='px-10 py-8'>
      <Head>
        <title>GIS App</title>
      </Head>

      <div className='mb-6'>
        <h1 className='text-5xl font-medium text-center'>GIS Rendering Application</h1>
      </div>

      <div>
        <Maps />
      </div>
    </section>
  )
}
