import dynamic from 'next/dynamic'
import Head from 'next/head'
import { TMapLayer } from '~/src/features'

const Fixtures = {
  MapLayers: [
    {
      id: 'jakarta',
      name: 'Jakarta',
      iconName: 'point',
      position: [-6.194883674005233, 106.8178317822333],
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMIbJMaN3PiGD_CXQS80T5FbAkrbD2GN7oEQxtO=w408-h306-k-no',
      description:
        "Jakarta, Indonesia's massive capital, sits on the northwest coast of the island of Java. A historic mix of cultures – Javanese, Malay, Chinese, Arab, Indian and European – has influenced its architecture, language and cuisine.",
    },
    {
      id: 'bandung',
      name: 'Bandung',
      iconName: 'point',
      position: [-6.915927060508159, 107.61815284726615],
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPWrXwQSyPZlSWG5PN02hX6sVkzrF4n6AYjaINq=w426-h240-k-no',
      description:
        'Bandung, capital of Indonesia’s West Java province, is a large city set amid volcanoes and tea plantations.',
    },
    {
      id: 'bali',
      name: 'Bali',
      iconName: 'point',
      position: [-8.404869639881086, 115.18724233574186],
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipNfIq8CczQOuMOO97vrvtUFeVEKD-MmiguaEykm=w408-h272-k-no',
      description:
        'Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller offshore islands, notably Nusa Penida, Nusa Lembongan, and Nusa Ceningan to the southeast.',
    },
    {
      id: 'east-kalimantan',
      name: 'East Kalimantan',
      iconName: 'point',
      position: [0.6266134143493987, 116.53067177408195],
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMDHy-NNLLvKKWj4njGfCsy1EreADMeukEx_gU8=w519-h240-k-no',
      description:
        'East Kalimantan is an Indonesian province in the east of the island of Borneo. It’s known for its indigenous Dayak culture and rainforest areas like Kutai National Park, home to orangutans.',
    },
    {
      id: 'monas',
      name: 'Monumen Nasional',
      iconName: 'monas',
      position: [-6.175269850833806, 106.82716833753804],
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipN0gblPqvGKJ5gmA4HfrW72Kzjbqz-R6tYUMAif=w408-h479-k-no',
      description:
        'The National Monument is a 132 m obelisk in the centre of Merdeka Square, Central Jakarta. It is the national monument of the Republic of Indonesia, built to commemorate the struggle for Indonesian independence.',
    },
    {
      id: 'ikn',
      name: 'Ibu Kota Nusantara',
      iconName: 'indonesia',
      position: [-0.960730614510819, 116.69818381299989],
      imageUrl: 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png',
      description:
        'Nusantara (Indonesian pronunciation: [nusanˈtara]), officially the Capital City of Nusantara (Indonesian: Ibu Kota Nusantara, abbreviated IKN), is the future capital of Indonesia, located between Kutai Kartanegara Regency and Penajam North Paser Regency, East Kalimantan, on the island of Borneo.',
    },
  ] as Array<TMapLayer>,
}

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
        <Maps layerList={Fixtures.MapLayers} />
      </div>
    </section>
  )
}
