import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-green-600 text-white p-4">
        <img src='public/img_01.png' width={250} height={250}></img>
        <h2 className="text-3xl text-black font-bold mb-6"> <span>Senac Music Hall</span></h2>
        <nav>
          <ul className="list-none p-0 space-y-3">
            <li>
              <Link href="/admin/eventos">Usuarios</Link>
            </li>
            <li>
              <Link href="/admin/reservas">Eventos</Link>
            </li>
            <li>
              <Link href="/admin/usuarios">Setores</Link>
            </li>
            <li>
              <Link href="/admin/usuarios">Ingressos</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}