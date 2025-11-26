"use client"

import { FormEvent, useEffect, useState } from "react";
import { FaRegClipboard, FaScissors } from "react-icons/fa6";
import { shortURL } from "./services/api.service";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface ApiResponse {
  data: {
    _id: string,
    createdAt: string,
    link: string,
    short: string,
    updatedAt: string
  },
  shortedLink: string
}

export default function Home() {
  const [link, setLink] = useState("")
  const [list, setList] = useState<ApiResponse[]>([])
  const { storedValue, setValue } = useLocalStorage<ApiResponse[]>("shortenedLinks", [])

  const getShortUrl = async (e: FormEvent) => {
    e.preventDefault()

    const data = await shortURL(link)

    if (!list.some((item: ApiResponse) => item.shortedLink === data.shortedLink)) {
      setList([...list, data])
      setValue([...list, data])
    }

    setLink("")
  }

  useEffect(() => {
    setList(storedValue)
  }, [storedValue])

  return (
    <div className="flex items-center justify-items-center min-h-screen px-2 sm:px-5 gap-16 bg-dark min-w-[250px]">
      <main className="main mx-auto">
        <div>
          <h1 className="text-green text-2xl md:text-6xl! font-orbitron! font-semibold">URL Shortener</h1>
          <p className="text-white font-medium text-md md:text-2xl">Acorta tus <span className="text-green">enlaces</span> al instante</p>
          <form className="mt-8 flex gap-5 md:flex-row flex-col w-full" onSubmit={getShortUrl}>
            <input
              type="text"
              name="link"
              autoComplete="off"
              className="w-full md:min-w-xl text-white border-2 outline-none py-3 px-3 border-gray-600 rounded-md focus:border-green transition easy duration-200"
              placeholder="Pega aquí tu url..."
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
            <button type="submit" onClick={getShortUrl} className="w-full bg-green py-3 px-4 font-bold flex justify-center items-center gap-3 rounded-md cursor-pointer hover:bg-green-600 transition easy duration-200">
              <FaScissors /> Acortar URL
            </button>
          </form>
        </div>
        <div className="mt-5">
          {
            list.length > 0 ? (
              <table className="w-full table-auto border-2 border-gray-600 text-white">
                <thead>
                  <tr className="border-b-2 border-gray-600">
                    <th className="mx-auto py-1 px-3">Order</th>
                    <th className="mx-auto py-1 px-3 hidden md:table-cell">URL Original</th>
                    <th className="mx-auto py-1 px-3">URL Acortada</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map((item: ApiResponse, idx: number) => {
                      return (
                        <tr key={idx}>
                          <td className="p-2 text-center">{idx + 1}</td>
                          <td className="p-2 max-w-md truncate text-start hidden md:table-cell">{item.data.link}</td>
                          <td className="py-2 px-5 max-w-md text-green text-start flex items-center justify-between gap-2">{item.shortedLink} <FaRegClipboard onClick={() => navigator.clipboard.writeText(item.shortedLink)} className="cursor-pointer text-gray-400 hover:text-green transition easy duration-200" /> </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            ) : (
              <p className="text-white font-medium text-md md:text-xl">No se han acortado enlaces</p>
            )
          }
        </div>
      </main>
    </div>
  );
}
