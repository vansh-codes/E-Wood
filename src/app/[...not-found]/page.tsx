import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/404.svg" alt="404" width={500} height={500} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        <Link href='/'>Go Back</Link>
      </button>
    </div>
  )
}
