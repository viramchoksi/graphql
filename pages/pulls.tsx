import React, { useEffect, Fragment, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'

import { useLazyQuery } from "@apollo/client"
import { GET_MERGE_REQUEST } from 'apollo/query/pull_request'
import { CREATE_PR_REQUEST, MERGE_REQUEST, REVERT_MERGE_REQUEST } from 'apollo/mutation/merge_request'

interface HomeProps {
  search: any
}

const FindPr = () => {

  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [pullData, setPullData] = useState<HomeProps>()
  const [counts, setcounts] = useState({
    opened: 0,
    closed: 0
  })

  const [values, setvalues] = useState({
    title: "",
    mergeInto: "",
    mergeFrom: ""
  })

  const [merge, { loading: merge_mutate }] = useMutation(MERGE_REQUEST)
  const [create, { loading: create_mutate }] = useMutation(CREATE_PR_REQUEST)

  const [revert] = useMutation(REVERT_MERGE_REQUEST)

  const { opened, closed } = counts

  const { loading, data, error, refetch } = useQuery(GET_MERGE_REQUEST, {
    variables: {
      query: "is:pr is:public archived:false author:viramchoksi"
    }
  })

  const submit = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let base = e.target.base.value
    let head = e.target.head.value
    create({
      variables: {
        input: {
          "title": title,
          "repositoryId": "R_kgDOJMWTFg",
          "headRefName": head,
          "baseRefName": base
        }
      },
      onCompleted: refetch
    })

  }

  useEffect(() => {
    if (!loading) {
      setIsLoading(false)
      setPullData(data)
      let open = 0
      let close = 0
      data?.search?.edges?.map((e, i) => {
        if (e.node.mergedAt || e.node.state === "CLOSED") {
          close = close + 1
        }
        else {
          open = open + 1
        }
      })
      setcounts({
        closed: close,
        opened: open
      })
    }

  }, [data])

  // console.log('data', pullData, counts)

  return (
    <div className="flex justify-between">

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <form onSubmit={submit}>
                    <div>
                      <div className="mt-3 sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          New pull request
                        </Dialog.Title>
                        <div className="mt-2">

                          <input placeholder="Enter title" className="mt-3z w-full h-[35px] border px-3" type="text" name="title" id="" />
                          <input placeholder="Enter base branch name" className="mt-5 w-full h-[35px] border px-3" type="text" name="base" id="" />
                          <input placeholder="Enter head branch name" className="mt-5 w-full h-[35px] border px-3" type="text" name="head" id="" />

                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          setOpen(false)
                        }}
                      >
                        Create pull request
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div>
        {isLoading ? "loading...." : <div>
          <div>
            {opened} open {closed} closed
          </div>
          {pullData?.search?.edges?.map((e, i) => {
            return (
              <div className='flex gap-x-5'>
                <div>{e?.node?.title}</div>
                {e?.node?.state === "OPEN" && <div className="cursor-pointer" onClick={() => merge({
                  variables: {
                    input: {
                      pullRequestId: e?.node?.id
                    }
                  },
                  onCompleted: refetch
                })}>Merge</div>}
                {e?.node?.state === "MERGED" && <div className="cursor-pointer" onClick={() => revert({
                  variables: {
                    input: {
                      pullRequestId: e?.node?.id
                    }
                  },
                  onCompleted: refetch
                })}>Revert</div>}
              </div>
            )
          })}
          <div>
          </div>
        </div>}
      </div>

      <div onClick={() => setOpen(true)} className="border h-fit px-3 py-2 cursor-pointer border-black">
        Create pull request
      </div>

    </div>
  )
}

export default FindPr