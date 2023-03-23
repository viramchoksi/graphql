import React, { useEffect, useState } from 'react'
import { GET_USER } from 'apollo/query/get-user'
import { useLazyQuery, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface HomeProps {
  search: any
}

const Home = () => {

  const [userData, setUserData] = useState<HomeProps>()

  const [q, { data }] = useLazyQuery(GET_USER)
  const router = useRouter()

  // query GetGreeting($language: String!) {
  //   greeting(language: $language) {
  //     message
  //   }
  // }

  const search = (e) => {
    e.preventDefault()
    q({
      variables: {
        query: e.target.user.value
      }
    })

  }

  useEffect(() => {
    setUserData(data)
  }, [data])


  console.log('data', data)

  console.log('userData', userData)

  return (
    <div>

      <div>
        <div onClick={() => router.push('/pulls')} className="absolute border px-3 py-2 rounded-xl cursor-pointer right-5 top-2">
          Pull requests
        </div>
      </div>

      <form onSubmit={search}>
        <input
          type="text"
          name="user"
          placeholder="search user"
          className="border border-gray-500 py-1 rounded-lg px-2"
        />
        <button
          type="submit"
          className="cursor-pointer border mt-5 px-10 rounded-lg w-fit py-2"
        >
          search
        </button>
      </form>

      {userData && (
        <div className="grid grid-cols-4 gap-x-10 gap-y-10">
          {userData?.search?.nodes.map((e) => {
            { console.log('e?.node?.url', e.url) }
            return (
              <a target="_blank" href={e?.url}>
                <p>{e?.name}</p>
                <Image width={250} height={250} alt="profile-pic" src={e?.avatarUrl} />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home