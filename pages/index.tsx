import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface HomeProps {
  search: any
}

const Home = () => {

  const router = useRouter()

  const [userData, setUserData] = useState<HomeProps>()
  const [text, setText] = useState('')

  // const { loading, error, data, refetch } = useQuery(GET_USER, {
  //   variables: { query: text },
  // })

  // const search = () => {
  //   refetch({
  //     query: text,
  //   })
  //   setUserData(data)
  // }

  console.log('userData', userData)

  return (
    <div className="relative">
      <div onClick={() => router.push('/pulls')} className="absolute border px-3 py-2 rounded-xl cursor-pointer right-5 top-2">
        Pull requests
      </div>



    </div>
  )
}

export default Home