import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from 'lucide-react'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { ateendees } from '../data/attendee'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(ateendees.length / 10)

  function onSearchInputChenged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            value={search}
            placeholder="Buscar Participante..."
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            onChange={onSearchInputChenged}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="siz-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de Incrição</TableHeader>
            <TableHeader>Data do Check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {ateendees.slice((page - 1) * 10, page * 10).map((ateende) => {
            return (
              <TableRow
                key={ateende.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="siz-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>{ateende.id}</TableCell>
                <TableCell>
                  <div>
                    <span>{ateende.name}</span>
                    <span className="flex flex-col gap-1 font-semibold text-white">
                      {ateende.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(ateende.createdAt)}</TableCell>
                <TableCell>{dayjs().to(ateende.checkInAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
              Mostrando 10 de {ateendees.length} items
            </TableCell>
            <TableCell
              colSpan={3}
              className="py-3 px-4 text-sm text-zinc-300 text-right"
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton
                    onClick={goToFirstPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToPreviousPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
